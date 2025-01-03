<?php

namespace App\Enum;

enum PermissionEnum: string
{
    case UserManagement = 'userManagement';
    case RoomManagement = "roomManagement";
    case BookingManagement = 'bookingManagement';
}
