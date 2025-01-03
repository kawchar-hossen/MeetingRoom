<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
   /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $data=Room::latest()->paginate();
      return Inertia::render('Room/index',[
        'rooms'=>$data,
      ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Room/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
// dd($request);
        $validateData=$request->validate([
            'name'=>'required|string',
            'capacity'=>'required|integer',
            'features'=>'nullable|array',
            'features.*'=>'string',
            'location'=>'string|required',

        ]);

        Room::create($validateData);
        return to_route('room.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room)
    {
        return Inertia::render('Room/show',[
            'room'=>$room
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Room $room)
    {
        return Inertia::render('Room/edit',[
            'room'=>$room
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        $validateData=$request->validate([
            'name'=>'string',
            'capacity'=>'integer',
            'features'=>'nullable|array',
            'features.*'=>'string',
            'location'=>'string',

        ]);
        $room->updateOrCreate($validateData);
        return to_route('booking.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return to_route('booking.index');
    }
}
