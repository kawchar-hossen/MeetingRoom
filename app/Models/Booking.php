<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    // Allow mass assignment for these attributes
    protected $fillable = [
        'user_id',
        'room_id',
        'date',
        'start_time',
        'end_time',
        'slots', // Ensure slots is fillable
    ];

    // Cast slots as an array
    protected $casts = [
        'slots' => 'array',
    ];

    /**
     * Relationship with the Room model.
     */
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with Host model (optional, if needed).
     */
    public function hosts()
    {
        return $this->hasMany(Host::class);
    }
}
