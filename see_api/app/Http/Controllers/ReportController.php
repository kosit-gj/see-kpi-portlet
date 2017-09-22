<?php

namespace App\Http\Controllers;

use App\SystemConfiguration;


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

class ReportController extends Controller
{

	public function __construct()
	{
		$this->middleware('jwt.auth');
	}
	
	public function usage_log(Request $request) 
	{

		// Get the current page from the url if it's not set default to 1
		empty($request->page) ? $page = 1 : $page = $request->page;
		
		// Number of items per page
		empty($request->rpp) ? $perPage = 10 : $perPage = $request->rpp;

		// Start displaying items from this number;
		$offset = ($page * $perPage) - $perPage; // Start displaying items from this number		
			
		$limit = " limit " . $perPage . " offset " . $offset;
		
		$query ="			
			select SQL_CALC_FOUND_ROWS a.created_dttm, b.emp_code, b.emp_name, d.org_name, e.appraisal_level_name, c.friendlyURL url
			from usage_log a, employee b, lportal.layout c, org d, appraisal_level e
			where a.emp_code = b.emp_code
			and a.plid = c.plid
			and b.org_id = d.org_id
			and b.level_id = e.level_id
		";			
			
		$qfooter = " order by e.appraisal_level_name asc, a.created_dttm desc, a.emp_code asc, url asc " . $limit;		
		$qinput = array();
		
		// empty($request->branch_code) ?: ($query .= " and b.branch_code = ? " AND $qinput[] =  $request->branch_code);
		// empty($request->personnel_name) ?: ($query .= " and b.thai_full_name like ? " AND  $qinput[] = '%' . $request->personnel_name . '%');
		// if (!empty($request->usage_start_date) and empty($request->usage_end_date)) {
			// $query .= " and cast(a.usage_dttm as date) >= cast(? as date) ";
			// $qinput[] = $request->usage_start_date;		
		// } elseif (empty($request->usage_start_date) and empty($request->usage_end_date)) {
		// } else {
			// $query .= " and cast(a.usage_dttm as date) between cast(? as date) and cast(? as date) ";
			// $qinput[] = $request->usage_start_date;
			// $qinput[] = $request->usage_end_date;				
		// }
	
		$items = DB::select($query . $qfooter, $qinput);
		$count = DB::select("select found_rows() as total_count");

	
		$groups = array();
		foreach ($items as $item) {
			$key = $item->appraisal_level_name;
			if (!isset($groups[$key])) {
				$groups[$key] = array(
					'items' => array($item),
					'count' => 1,
				);
			} else {
				$groups[$key]['items'][] = $item;
				$groups[$key]['count'] += 1;
			}
		}		
		
		empty($items) ? $totalPage = 0 : $totalPage = $count[0]->total_count;
		
		$result = [
			"total" => $totalPage, 
			"current_page" => $page,
			"last_page" => ceil($totalPage / $perPage),
			"data" => $groups
		];
		
		return response()->json($result);	
	}
}
