<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $currentUser = Auth::user();
        $data = null;
        if ($currentUser->role === 'admin') {
            // Admin: Fetch all bookings
            $data = Booking::latest()->paginate();
        } elseif ($currentUser->role === 'user') {
            // User: Fetch only their bookings
            $data = Booking::where('user_id', $currentUser->id)->latest()->paginate();
        }

        return Inertia::render('Booking/index', [
            'bookings' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $rooms = Room::with('bookings')->get();

        // Format booked slots data for the frontend
        $bookedSlots = Booking::select('room_id', 'date', 'start_time', 'end_time','slots')->get();

        return Inertia::render('Booking/create', [
            'rooms' => $rooms,
            'bookedSlots' => $bookedSlots,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'room_id' => 'required|integer|exists:rooms,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'slots' => 'required|array', // Validate slots as an array
            'slots.*' => 'integer', // Validate each slot as an integer
        ]);

        // Attach the user ID to the validated data
        $validatedData['user_id'] = Auth::id(); // Use Auth::id() for a cleaner approach

        // Create the booking with validated data
        $booking = Booking::create($validatedData);

        // Redirect or return a response
        return redirect()->back()->with('success', 'Booking created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return Inertia::render('Booking/show', [
            'booking' => $booking
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        return Inertia::render('Booking/edit', [
            'booking' => $booking
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        if ($booking->user_id !== Auth::user()->id) {
            return redirect()->back()->withErrors(['error' => 'you are not authorized for update this bookings']);
        };
        $validateData = $request->validate([
            'room_id' => 'integer|exists:rooms,id',
            'start_time' => 'date_format:H:i',
            'end_time' => 'date_format:H:i|after:start_time',
            'date' => 'date|after_or_equal:today',
        ]);
        $booking->update($validateData);
        return redirect()->route('index')->with('success', 'successfully update the booking');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $authUser = Auth::user();
        if ($authUser->hasRole('admin') || $booking->user_id == $authUser->id && $booking->delete()) {
            return redirect()->route('bookings.index')->with('success', 'Booking deleted successfully!');
        }
    }
}
