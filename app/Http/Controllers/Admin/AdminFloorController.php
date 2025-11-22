<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Floor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AdminFloorController extends Controller
{
    public function floors()
    {
        $floors = Floor::orderByDesc('created_at')->limit(10)->get();
        $total = DB::table('floors')->count();
        $withDescription = DB::table('floors')->whereNotNull('description')->where('description', '!=', '')->count();
        $counts = [
            'total' => $total,
            'with_description' => $withDescription,
        ];
        $activities = ActivityLog::with('user')
            ->where('subject_type', 'floor')
            ->orderByDesc('created_at')
            ->take(10)
            ->get();

        return Inertia::render('Admin/AdminFloor/AdminFloor', [
            'floors' => $floors,
            'activities' => $activities,
            'counts' => $counts,
        ]);
    }

    public function floorsList(Request $request)
    {
        $query = Floor::orderByDesc('created_at');
        $perPageRaw = $request->query('per_page', 10);
        if ($perPageRaw === 'all') {
            $items = $query->get();

            return response()->json([
                'data' => $items,
                'meta' => [
                    'total' => $items->count(),
                    'per_page' => 'all',
                ],
            ]);
        }
        $perPage = (int) $perPageRaw;
        if ($perPage <= 0) {
            $perPage = 10;
        }
        if ($perPage > 1000) {
            $perPage = 1000;
        }
        $paginator = $query->paginate($perPage);

        return response()->json($paginator);
    }

    public function floorShow(Floor $floor)
    {
        return response()->json($floor);
    }

    public function floorStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $floor = Floor::create($validator->validated());

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'created';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor created';
        $activity->changes = $validator->validated();
        $activity->save();

        return redirect()->back()->with('success', 'Floor created successfully');
    }

    public function floorUpdate(Request $request, Floor $floor)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);
        if ($validator->fails()) {
            throw ValidationException::withMessages($validator->errors()->toArray());
        }

        $original = $floor->getOriginal();
        $floor->update($validator->validated());
        $changes = $floor->getChanges();
        $diff = ['before' => [], 'after' => []];
        foreach ($changes as $key => $value) {
            $diff['before'][$key] = $original[$key] ?? null;
            $diff['after'][$key] = $value;
        }

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'updated';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor updated';
        $activity->changes = $diff;
        $activity->save();

        return redirect()->back()->with('success', 'Floor updated successfully');
    }

    public function floorDestroy(Floor $floor)
    {
        $floor->delete();

        $activity = new ActivityLog;
        $activity->user_id = auth()->user()->id;
        $activity->action = 'deleted';
        $activity->subject_type = 'floor';
        $activity->subject_id = $floor->id;
        $activity->description = 'Floor deleted';
        $activity->changes = $floor;
        $activity->save();

        return redirect()->back()->with('success', 'Floor deleted successfully');
    }
}
