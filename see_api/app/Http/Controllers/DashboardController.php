<?php

namespace App\Http\Controllers;

use App\Org;
use App\AppraisalItem;
use App\Perspective;

use Auth;
use DB;
use File;
use Validator;
use Excel;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class DashboardController extends Controller
{

	public function __construct()
	{

	//   $this->middleware('jwt.auth');
	}



	public function year_list()
	{
		$items = DB::select("
			SELECT appraisal_year FROM appraisal_period
			GROUP BY appraisal_year ORDER BY appraisal_year
		");
		return response()->json($items);
	}

	public function period_list(Request $request){
		$items = DB::select("
			SELECT period_id, appraisal_period_desc
			FROM appraisal_period
			WHERE appraisal_year = ?
		", array($request->appraisal_year));
		return response()->json($items);
	}

	public function appraisal_level(){
		$items = DB::select("
			SELECT level_id, appraisal_level_name FROM appraisal_level ORDER BY level_id
		");
		return response()->json($items);
	}

	public function org_list(Request $request){
		$items = DB::select("
			SELECT org_id, org_name
			FROM org
			WHERE is_active = 1
			AND level_id = ?
			ORDER BY org_id
		", array($request->appraisal_level));
		return response()->json($items);
	}

	public function kpi_list(Request $request){
		$items = DB::select("
			SELECT item_id, MAX(item_name) item_name
			FROM appraisal_item_result
			WHERE level_id = ?
			AND org_id = ?
			GROUP BY item_id
			ORDER BY item_id
		", array($request->appraisal_level, $request->org_id));
		return response()->json($items);
	}

	public function dashboard_content(Request $request){
		$RespData = [];

		// Get accordion data //
		$groupQry = DB::select("
			SELECT air.org_id,
				org.org_name,
				p.perspective_name,
				ai.item_name,
				air.target_value,
				air.forecast_value,
				air.actual_value,
				air.item_result_id
			FROM appraisal_item_result air
			INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
			INNER JOIN org ON org.org_id = air.org_id
			INNER JOIN appraisal_item ai ON ai.item_id = air.item_id
			INNER JOIN perspective p ON p.perspective_id = ai.perspective_id
			WHERE ap.appraisal_year = ?
			AND air.period_id = ?
			AND air.level_id = ?
			AND air.org_id = ?
			AND air.item_id = ?
			UNION ALL
			SELECT air.org_id,
				org.org_name,
				p.perspective_name,
				ai.item_name,
				air.target_value,
				air.forecast_value,
				air.actual_value,
				air.item_result_id
			FROM appraisal_item_result air
			INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
			INNER JOIN org ON org.org_id = air.org_id
			INNER JOIN appraisal_item ai ON ai.item_id = air.item_id
			INNER JOIN perspective p ON p.perspective_id = ai.perspective_id
			WHERE ap.appraisal_year = ?
			AND air.period_id = ?
			AND org.parent_org_code = (
				SELECT org_code FROM org WHERE org_id = ?
			)
			AND air.item_id = ?
		", array($request->year_id, $request->period_id, $request->level_id, $request->org_id, $request->item_id,
			$request->year_id, $request->period_id, $request->org_id, $request->item_id));
		$loopCnt = 1;
		foreach ($groupQry as $groupObj) {
			$responseArr["group".$loopCnt] = array(
				"org_id" => $groupObj->org_id,
				"org_name" => $groupObj->org_name,
				"perspective_name" => $groupObj->perspective_name,
				"item_name" => $groupObj->item_name
			);

			// Dual chart data builder //
			$responseArr["group".$loopCnt]["dual_chart"]["data"] = array(
				"target" => $groupObj->target_value,
				"forecast" => $groupObj->forecast_value,
				"actual_value" => $groupObj->actual_value
			);

			// Dual chart color range builder //
			$dualColorQry = DB::select("
				SELECT begin_threshold, end_threshold, color_code, result_type
				FROM result_threshold
				WHERE result_threshold_group_id = (
					SELECT MAX(er.result_threshold_group_id) result_threshold_group_id
					FROM appraisal_item_result air
					INNER JOIN emp_result er ON er.emp_result_id = air.emp_result_id
					INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
					WHERE air.item_result_id = ?
				)
				ORDER BY begin_threshold
			", array($groupObj->item_result_id));
			if ($dualColorQry == []) {
				$responseArr["group".$loopCnt]["dual_chart"]["color_range"] = array();
			} else {
				foreach ($dualColorQry as $dualColorObj) {
					$responseArr["group".$loopCnt]["dual_chart"]["color_range"][] = array(
						"min_val" => $dualColorObj->begin_threshold,
						"max_val" => $dualColorObj->end_threshold,
						"color" => $dualColorObj->color_code
					);
				};
			}

			// Bar chart target data builder //
			$valueBarQry = DB::select("
				SELECT q1.appraisal_month_no,
					q1.appraisal_month_name,
					q1.actual_value,
					SUM(q2.actual_value) actual_value_ytd
				FROM monthly_appraisal_item_result q1
				INNER JOIN monthly_appraisal_item_result q2
					ON q1.year = q2.year
					AND q1.period_id = q2.period_id
					AND q1.level_id = q2.level_id
					AND q1.org_id = q2.org_id
					AND q1.item_id = q2.item_id
				WHERE q1.appraisal_month_no >= q2.appraisal_month_no
				AND q1.year = ?
				AND q1.period_id = ?
				AND q1.level_id = ?
				AND q1.org_id = ?
				AND q1.item_id = ?
				GROUP BY q1.appraisal_month_no, q1.appraisal_month_name, q1.actual_value
				ORDER BY q1.appraisal_month_no
			", array($request->year_id, $request->period_id, $request->level_id, $request->org_id, $request->item_id));
			if ($valueBarQry == []) {
				$responseArr["group".$loopCnt]["bar_chart"]["data"]["actual"] = array();
			} else {
				foreach ($valueBarQry as $valueBarObj) {
					$responseArr["group".$loopCnt]["bar_chart"]["data"]["actual"][] = array(
						"month" => $valueBarObj->appraisal_month_name,
						"value" => $valueBarObj->actual_value_ytd
					);
				};
			}

			$responseArr["group".$loopCnt]["bar_chart"]["data"]["target"] = $groupObj->target_value;

			$responseArr["group".$loopCnt]["bar_chart"]["data"]["forecast"] = $groupObj->forecast_value;

			$RespData = $RespData+$responseArr; //array_push($RespData, $responseArr);
			$loopCnt++;
		};

		return response()->json($RespData);
	}


	public function all_dashboard_content(Request $request){
		$RespData = [];
		$org = Org::find($request->org_id);
		$chartQry = DB::select("
			#SELECT DISTINCT p.perspective_id, p.perspective_name, air.item_id, air.item_name, u.uom_name
			SELECT p.perspective_id, p.perspective_name, air.item_id, air.item_name, u.uom_name, max(air.item_result_id) item_result_id
			FROM appraisal_item_result air
			INNER JOIN appraisal_item ai ON ai.item_id = air.item_id
			INNER JOIN perspective p ON p.perspective_id = ai.perspective_id
			INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
			LEFT OUTER JOIN uom u ON u.uom_id = ai.uom_id
			LEFT OUTER JOIN org o ON o.org_id = air.org_id
			LEFT OUTER JOIN org ON org.org_id = air.org_id
			WHERE ap.appraisal_year = ?
			AND air.period_id = ?
			AND (org.parent_org_code = ? or org.org_code = ?)
			GROUP BY p.perspective_id, air.item_id
			ORDER BY p.perspective_name, air.item_name, air.item_result_id
		", array($request->year_id, $request->period_id, $org->org_code, $org->org_code));

		$OrgListQry = DB::select("
			SELECT DISTINCT air.org_id
			FROM appraisal_item_result air
			INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
			LEFT OUTER JOIN org ON org.org_id = air.org_id
			WHERE ap.appraisal_year = ?
			AND air.period_id = ?
			AND (org.parent_org_code = ? or org.org_code = ?)
			ORDER BY org.org_code
		", array($request->year_id, $request->period_id, $org->org_code, $org->org_code));


		$loopCnt = 0;
		foreach ($chartQry as $chartObj) {
			if ($loopCnt == 0) {
				$previousItem = 0;
				$previousPerspec = 0;
			}
			$RespData[$loopCnt] = array(
				"perspective"=> $chartObj->perspective_name,
				"item"=> $chartObj->item_name,
				"uom"=> $chartObj->uom_name,
				"item_id" => $chartObj->item_id
			);

			// chart color range builder //
			$colors = array();
			$valueRanges = array();
			$ColorRangeQry = DB::select("
				SELECT begin_threshold, end_threshold, color_code, result_type
				FROM result_threshold
				WHERE result_threshold_group_id = (
					SELECT MAX(er.result_threshold_group_id) result_threshold_group_id
					FROM appraisal_item_result air
					INNER JOIN emp_result er ON er.emp_result_id = air.emp_result_id
					INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
					WHERE air.item_result_id = ?
				)
				ORDER BY begin_threshold DESC
			", array($chartObj->item_result_id));
			/*if ($ColorRangeQry == []) {
				$RespData[$loopCnt]["color"] = array();
			} else {
				foreach ($ColorRangeQry as $colorRangeObj) {
					$colorCode = $retVal = (strpos($colorRangeObj->color_code, '#') == true) ? $colorRangeObj->color_code : "#".$colorRangeObj->color_code ;
					$RespData[$loopCnt]["color"][] = array(
						"minValue" => $colorRangeObj->begin_threshold,
						"maxValue" => $colorRangeObj->end_threshold,
						"code" => $colorCode
					);
				};
			}*/
			if ($ColorRangeQry == []) {
				$RespData[$loopCnt]["color"] = array();
			} else {
				foreach ($ColorRangeQry as $colorRangeObj) {
					$colorCode = $retVal = (strpos($colorRangeObj->color_code, '#') == true) ? $colorRangeObj->color_code : "#".$colorRangeObj->color_code ;
					array_push($colors, $colorCode);
					array_push($valueRanges, $colorRangeObj->end_threshold);
				}
				$RespData[$loopCnt]["rangeColor"] = $colors;
			}

			// push all org //
			foreach ($OrgListQry as $OrgListObj) {
				$RespData[$loopCnt]["org"]["id_".$OrgListObj->org_id] = array();
			}

			// push data to org //
			$dataListQry = DB::select("
				SELECT air.item_result_id, p.perspective_id, p.perspective_name, air.item_id, air.item_name, u.uom_name, air.org_id, org.org_code, o.org_name,
					air.target_value, air.forecast_value, ifnull(air.actual_value, 0) actual_value,
					ifnull(if(air.target_value = 0, 0, (air.actual_value/air.target_value)*100), 0) percent_target,
					ifnull(if(air.forecast_value = 0, 0, (air.actual_value/air.forecast_value)*100), 0) percent_forecast
				FROM appraisal_item_result air
				INNER JOIN appraisal_item ai ON ai.item_id = air.item_id
				INNER JOIN perspective p ON p.perspective_id = ai.perspective_id
				INNER JOIN appraisal_period ap ON ap.period_id = air.period_id
				LEFT OUTER JOIN uom u ON u.uom_id = ai.uom_id
				LEFT OUTER JOIN org o ON o.org_id = air.org_id
				LEFT OUTER JOIN org ON org.org_id = air.org_id
				WHERE ap.appraisal_year = ?
				AND air.period_id = ?
				AND (org.parent_org_code = ? or org.org_code = ?)
				AND air.item_id = ?
				GROUP BY p.perspective_id, air.item_id, air.org_id
				ORDER BY p.perspective_name, air.item_name, air.item_result_id, org.org_code
			", array($request->year_id, $request->period_id, $org->org_code, $org->org_code, $chartObj->item_id));

			foreach ($dataListQry as $dataListObj) {
				$orgDetail = array(
					"org" => $dataListObj->org_name,
					"org_code" => $dataListObj->org_code,
					"target"=> $dataListObj->target_value,
					"forecast" => $dataListObj->forecast_value,
					"actual" => $dataListObj->actual_value,
					"percent_target" => $dataListObj->percent_target,
					"percent_forecast" => $dataListObj->percent_forecast,

					// For Spackline JS //
					"percent_target_str" => "100".",".$dataListObj->percent_target.",".implode($valueRanges, ","),
					"percent_forecast_str" => "100".",".$dataListObj->percent_forecast.",".implode($valueRanges, ",")
				);

				$RespData[$loopCnt]["org"]["id_".$dataListObj->org_id] = $orgDetail;
			}


			// Set loop index //
			$loopCnt++;
		}

		return response()->json($RespData);
	}
	
	public function kpi_overall_pie(Request $request)
	{
		$qinput = [];
		$query = "
			select a.emp_result_id, if(a.appraisal_type_id=1,b.emp_name,c.org_name) name, a.result_score,
			(
				select rt.color_code
				from result_threshold rt
				where rt.result_threshold_group_id = a.result_threshold_group_id
				and a.result_score between begin_threshold and end_threshold
			) color_code
			from emp_result a
			left outer join employee b
			on a.emp_id = b.emp_id
			left outer join org c
			on a.org_id = c.org_id
			where a.appraisal_type_id = ?
			and a.level_id = ?
			and a.org_id = ?
			and a.period_id = ?			
		";
		$qinput[] = $request->appraisal_type_id;
		$qinput[] = $request->level_id;
		$qinput[] = $request->org_id;
		$qinput[] = $request->period_id;

		empty($request->emp_id) ?: ($query .= " and c.emp_id = ? " AND $qinput[] = $request->emp_id);
		empty($request->position_id) ?: ($query .= " and c.position_id = ? " AND $qinput[] = $request->position_id);
		
		$qfooter = " order by color_code ";

		$emp_result = DB::select($query.$qfooter,$qinput);	
		
		$category = [];
		$cat1 = [];
		$header = '';
		foreach ($emp_result as $e) {
			
			$perspective = DB::select("
				select b.perspective_id, c.perspective_name, c.color_code, a.structure_weight_percent, sum(a.weigh_score) total_score
				from appraisal_item_result a
				left outer join appraisal_item b
				on a.item_id = b.item_id
				left outer join perspective c
				on b.perspective_id = c.perspective_id
				where emp_result_id = ?
				group by b.perspective_id, c.perspective_name, c.color_code, a.structure_weight_percent			
			",array($e->emp_result_id));
			
			$cat2 = [];
			foreach ($perspective as $p) {
				$cat2[] = ['label' => $p->perspective_name.'('.$p->structure_weight_percent.'%)', 'color' => $p->color_code, 'value' => $p->total_score, 'perspective_id' => $p->perspective_id];
			}
			$cat1[] = ['label' => $e->name, 'color' => $e->color_code, 'value' => $e->result_score, 'category' => $cat2];
			$header = $e->name;
		}
		
		$category['category'] = $cat1;
		$category['header'] = $e->name . " Performance by Perspective" ;
		
		return response()->json($category);
	}
	
	public function kpi_overall_bubble(Request $request)
	{	
		$qinput = [];
		$query = "
			select c.org_id, if(c.appraisal_type_id=1,e.emp_name,d.org_name) name, a.item_id, b.item_name, ifnull(a.target_value,0) target_value, ifnull(a.actual_value,0) actual_value, a.weight_percent,
			if(ifnull(a.target_value,0) = 0,0,(ifnull(a.actual_value,0)/a.target_value)*100) achievement,
			100 - if(ifnull(a.target_value,0) = 0,0,(ifnull(a.actual_value,0)/a.target_value)*100) urgency,
			(
			select rt.color_code
			from result_threshold rt
			where rt.result_threshold_group_id = c.result_threshold_group_id
			and if(ifnull(a.target_value,0) = 0,0,ifnull(a.actual_value,0) / a.target_value) * 100 between begin_threshold and end_threshold
			) color_code
			from appraisal_item_result a
			left outer join appraisal_item b
			on a.item_id = b.item_id
			left outer join emp_result c
			on a.emp_result_id = c.emp_result_id
			left outer join org d
			on c.org_id = d.org_id
			left outer join employee e
			on c.emp_id = e.emp_id
			where c.appraisal_type_id = ?
			and c.level_id = ?
			and c.org_id = ?
			and c.period_id = ?
		";
		//$qinput[] = $request->item_id;
		$qinput[] = $request->appraisal_type_id;
		$qinput[] = $request->level_id;
		$qinput[] = $request->org_id;
		$qinput[] = $request->period_id;
		
		empty($request->perspective_id) ?: ($query .= " and b.perspective_id = ? " AND $qinput[] = $request->perspective_id);
		empty($request->emp_id) ?: ($query .= " and c.emp_id = ? " AND $qinput[] = $request->emp_id);
		empty($request->position_id) ?: ($query .= " and c.position_id = ? " AND $qinput[] = $request->position_id);
		
		$qfooter = " order by color_code ";

		$items = DB::select($query.$qfooter,$qinput);
		
		$dataset = [];
		$set = [];
		$color = '';
		$data = [];
		$groups = array();
		foreach ($items as $i) {
			$key = $i->color_code;
			if (!isset($groups[$key])) {
				$groups[$key] = array(
					'items' => array('color' => $key, 'data' => array(['x' => $i->urgency, 'y' => $i->weight_percent, 'z' => $i->achievement, 'name' => $i->item_name, 'item_id' => $i->item_id]))
				);
			} else {
				$groups[$key]['items']['data'][] = ['x' => $i->urgency, 'y' => $i->weight_percent, 'z' => $i->achievement, 'name' => $i->item_name, 'item_id' => $i->item_id];
			}

		}
		
		foreach ($groups as $g) {
			$dataset[] = $g['items'];
		}
		
		$cat = [
			'category' => [
				['label' => 'น้อย', 'x' => 30, 'showverticalline' => 1],
				['label' => 'กลาง', 'x' => 60, 'showverticalline' => 1],
				['label' => 'มาก', 'x' => 90, 'showverticalline' => 1]
			]
		];
		
		$trendlines = [
			'line' => [
				['startValue' => 30, 'displayvalue' => 'น้อย', 'dashed' => 1, 'dashLen' => 1, 'dashGap' => 1],
				['startValue' => 60, 'displayvalue' => 'กลาง', 'dashed' => 1, 'dashLen' => 1, 'dashGap' => 1],
				['startValue' => 90, 'displayvalue' => 'มาก', 'dashed' => 1, 'dashLen' => 1, 'dashGap' => 1],
			]
		];
		

		$perspective = Perspective::find($request->perspective_id);
		$org = Org::find($request->org_id);
		empty($perspective) ? $header =  $org->org_name : $header = $perspective->perspective_name;
		return response()->json(['dataset' => $dataset, 'header' => $header, 'categories' => array($cat), 'trendlines' => array($trendlines)]);	
	}
	
	public function kpi_overall(Request $request)
	{
		$apitem = AppraisalItem::find($request->item_id);
		$perspective = Perspective::find($apitem->perspective_id);
		$header = $perspective->perspective_name . ' - ' . $apitem->item_name;
		
		$qinput = [];
		$query = "
			select c.org_id, if(c.appraisal_type_id=1,e.emp_name,d.org_name) name, a.item_id, b.item_name, ifnull(a.target_value,0) target_value, ifnull(a.actual_value,0) actual_value,
			if(ifnull(a.target_value,0) = 0,0,ifnull(a.actual_value,0) / a.target_value) * 100 pct,
			(
			select rt.color_code
			from result_threshold rt
			where rt.result_threshold_group_id = c.result_threshold_group_id
			and if(ifnull(a.target_value,0) = 0,0,ifnull(a.actual_value,0) / a.target_value) * 100 between begin_threshold and end_threshold
			) color_code
			from appraisal_item_result a
			left outer join appraisal_item b
			on a.item_id = b.item_id
			left outer join emp_result c
			on a.emp_result_id = c.emp_result_id
			left outer join org d
			on c.org_id = d.org_id
			left outer join employee e
			on c.emp_id = e.emp_id
			where a.item_id = ?
			and c.appraisal_type_id = ?
			and c.level_id = ?
			and c.org_id = ?
			and c.period_id = ?
		";
		$qinput[] = $request->item_id;
		$qinput[] = $request->appraisal_type_id;
		$qinput[] = $request->level_id;
		$qinput[] = $request->org_id;
		$qinput[] = $request->period_id;
		
		empty($request->emp_id) ?: ($query .= " and c.emp_id = ? " AND $qinput[] = $request->emp_id);
		empty($request->position_id) ?: ($query .= " and c.position_id = ? " AND $qinput[] = $request->position_id);
		
		$qfooter = " order by color_code ";

		$items = DB::select($query.$qfooter,$qinput);
		
		$dataset = [];
		$set = [];
		$color = '';
		$data = [];
		$groups = array();
		foreach ($items as $i) {
			$key = $i->color_code;
			if (!isset($groups[$key])) {
				$groups[$key] = array(
					'items' => array('color' => $key, 'data' => array(['x' => $i->target_value, 'y' => $i->actual_value, 'z' => $i->pct, 'name' => $i->name]))
				);
			} else {
				$groups[$key]['items']['data'][] = ['x' => $i->target_value, 'y' => $i->actual_value, 'z' => $i->pct, 'name' => $i->name];
			}

		}
		
		foreach ($groups as $g) {
			$dataset[] = $g['items'];
		}
		

		
		return response()->json(['dataset' => $dataset, 'header' => $header]);
	}








/*
	public function year_list()
	{
		$items = DB::select("
			SELECT appraisal_year FROM appraisal_period GROUP BY appraisal_year ORDER BY appraisal_year
		");
		return response()->json($items);
	}

	public function month_list(Request $request)
	{
		$items = DB::select("
			select period_id, substr(monthname(start_date),1,3) as monthname
                from appraisal_period
                where appraisal_year = ?
	        and appraisal_frequency_id = 1
                order by period_id desc
		", array($request->appraisal_year));
		return response()->json($items);

	}

	public function balance_scorecard(Request $request)
	{
		$items = DB::select("
			select p.perspective_name, r.appraisal_item_id, i.appraisal_item_name, r.target_value, r.actual_value
				from appraisal_item_result r, employee e, appraisal_item i, perspective p, appraisal_structure s, form_type f
				where r.emp_code = e.emp_code
				and r.appraisal_item_id = i.appraisal_item_id
				and i.perspective_id = p.perspective_id
				and i.structure_id = s.structure_id
				and s.form_id = f.form_id
				and f.form_name = 'Quantity'
				and e.is_coporate_kpi = 1
				and r.period_id = ?
				order by r.appraisal_item_id
		", array($request->period_id));
		return response()->json($items);

	}

	public function monthly_variance(Request $request)
	{
		$items = DB::select("
			select p.period_no, substr(monthname(p.start_date),1,3), r.target_value, r.actual_value, r.target_value - r.actual_value as variance_value
from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
where r.emp_code = e.emp_code
and r.appraisal_item_id = i.appraisal_item_id
and i.structure_id = s.structure_id
and s.form_id = f.form_id
and r.period_id = p.period_id
and f.form_name = 'Quantity'
and e.is_coporate_kpi = 1
and p.appraisal_frequency_id = 1
and p.appraisal_year = ?
and r.appraisal_item_id = ?
order by p.period_no
		", array($request->appraisal_year,$request->appraisal_item_id));
		return response()->json($items);

	}

	public function monthly_growth(Request $request)
	{
		$items = DB::select("
			select period_no, period_desc, sum(previous_year) as pyear, sum(current_year) as cyear,
((sum(current_year) - sum(previous_year))/sum(previous_year)) * 100 as growth_percent
from
(select p.period_no, substr(monthname(p.start_date),1,3) as period_desc, r.actual_value as previous_year, 0 as current_year
from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
where r.emp_code = e.emp_code
and r.appraisal_item_id = i.appraisal_item_id
and i.structure_id = s.structure_id
and s.form_id = f.form_id
and r.period_id = p.period_id
and f.form_name = 'Quantity'
and e.is_coporate_kpi = 1
and p.appraisal_frequency_id = 1
and p.appraisal_year = ? - 1
and r.appraisal_item_id = ?
union
select p.period_no, substr(monthname(p.start_date),1,3) as period_desc, 0 as previous_year, r.actual_value as current_year
from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
where r.emp_code = e.emp_code
and r.appraisal_item_id = i.appraisal_item_id
and i.structure_id = s.structure_id
and s.form_id = f.form_id
and r.period_id = p.period_id
and f.form_name = 'Quantity'
and e.is_coporate_kpi = 1
and p.appraisal_year = ?
and r.appraisal_item_id = ?) as growth
group by period_no, period_desc
order by period_no
		", array($request->appraisal_year,$request->appraisal_item_id,$request->appraisal_year,$request->appraisal_item_id));
		return response()->json($items);

	}

	public function ytd_monthly_variance(Request $request)
	{
		$items = DB::select("
			select a.period_no as a
,month_name
,(select sum(target_value)
 from(
   select p.period_no
    , r.target_value
   from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
   where r.emp_code = e.emp_code
   and r.appraisal_item_id = i.appraisal_item_id
   and i.structure_id = s.structure_id
   and s.form_id = f.form_id
   and r.period_id = p.period_id
   and f.form_name = 'Quantity'
   and e.is_coporate_kpi = 1
   and p.appraisal_frequency_id = 1
   and p.appraisal_year = ?
   and r.appraisal_item_id = ?
 )b
 where period_no <= a
) as target_value
,(select sum(actual_value)
 from(
   select p.period_no
   , r.actual_value
   from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
   where r.emp_code = e.emp_code
   and r.appraisal_item_id = i.appraisal_item_id
   and i.structure_id = s.structure_id
   and s.form_id = f.form_id
   and r.period_id = p.period_id
   and f.form_name = 'Quantity'
   and e.is_coporate_kpi = 1
   and p.appraisal_frequency_id = 1
   and p.appraisal_year = ?
   and r.appraisal_item_id = ?
 )b
 where period_no <= a
) as actual_value
,(select sum(variance_value)
 from(
   select p.period_no
   , r.target_value - r.actual_value as variance_value
   from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
   where r.emp_code = e.emp_code
   and r.appraisal_item_id = i.appraisal_item_id
   and i.structure_id = s.structure_id
   and s.form_id = f.form_id
   and r.period_id = p.period_id
   and f.form_name = 'Quantity'
   and e.is_coporate_kpi = 1
   and p.appraisal_frequency_id = 1
   and p.appraisal_year = ?
   and r.appraisal_item_id = ?
 )b
 where period_no <= a
) as variance_value
from(
  select p.period_no
   , substr(monthname(p.start_date),1,3) as month_name
  from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
  where r.emp_code = e.emp_code
  and r.appraisal_item_id = i.appraisal_item_id
  and i.structure_id = s.structure_id
  and s.form_id = f.form_id
  and r.period_id = p.period_id
  and f.form_name = 'Quantity'
  and e.is_coporate_kpi = 1
  and p.appraisal_frequency_id = 1
  and p.appraisal_year = ?
  and r.appraisal_item_id = ?
)a
order by a.period_no
		", array($request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id));
		return response()->json($items);

	}


	public function ytd_monthly_growth(Request $request)
	{
		$items = DB::select("



SELECT period_no
,period_desc
, sum(previous_year) as pyear
, sum(current_year) as cyear
, ((sum(current_year) - sum(previous_year))/sum(previous_year)) * 100 as growth_percent
from(
select main_previous_year.period_no as period_no
,period_desc
,(select sum(previous_year)
 from(
	select p.period_no
	, r.actual_value as previous_year
	from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
	where r.emp_code = e.emp_code
	and r.appraisal_item_id = i.appraisal_item_id
	and i.structure_id = s.structure_id
	and s.form_id = f.form_id
	and r.period_id = p.period_id
	and f.form_name = 'Quantity'
	and e.is_coporate_kpi = 1
	and p.appraisal_frequency_id = 1
	and p.appraisal_year = ? - 1
	and r.appraisal_item_id = ?
 )sub
 where sub.period_no <= main_previous_year.period_no
) as previous_year
, 0 as current_year
from(
select p.period_no
, substr(monthname(p.start_date),1,3) as period_desc
from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
where r.emp_code = e.emp_code
and r.appraisal_item_id = i.appraisal_item_id
and i.structure_id = s.structure_id
and s.form_id = f.form_id
and r.period_id = p.period_id
and f.form_name = 'Quantity'
and e.is_coporate_kpi = 1
and p.appraisal_frequency_id = 1
and p.appraisal_year = ? - 1
and r.appraisal_item_id = ?
)main_previous_year

union

select main_current_year.period_no as period_no
,period_desc
,0 as previous_year
,(select sum(current_year)
 from(
		select p.period_no
		, r.actual_value as current_year
		from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
		where r.emp_code = e.emp_code
		and r.appraisal_item_id = i.appraisal_item_id
		and i.structure_id = s.structure_id
		and s.form_id = f.form_id
		and r.period_id = p.period_id
		and f.form_name = 'Quantity'
		and e.is_coporate_kpi = 1
		and p.appraisal_year = ?
		and r.appraisal_item_id = ?
 )sub
 where sub.period_no <= main_current_year.period_no
) as current_year
from(
select p.period_no
, substr(monthname(p.start_date),1,3) as period_desc
from appraisal_item_result r, employee e, appraisal_item i, appraisal_structure s, form_type f, appraisal_period p
where r.emp_code = e.emp_code
and r.appraisal_item_id = i.appraisal_item_id
and i.structure_id = s.structure_id
and s.form_id = f.form_id
and r.period_id = p.period_id
and f.form_name = 'Quantity'
and e.is_coporate_kpi = 1
and p.appraisal_year = ?
and r.appraisal_item_id = ?
)main_current_year

) as growth
group by period_no
,period_desc


		", array($request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id,
			$request->appraisal_year,$request->appraisal_item_id));
		return response()->json($items);

	}
	*/
}
