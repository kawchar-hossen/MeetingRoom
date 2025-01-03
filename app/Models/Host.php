<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Host extends Model
{

    protected $fillable=['user_id','booking_id'];
    public function bookings()
    {

    return $this->belongsTo(Booking::class) ;
    }
    public function user()
    {

    return $this->belongsTo(User::class) ;
    }
}
