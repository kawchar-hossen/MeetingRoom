<?php

namespace Database\Seeders;

use App\Enum\PermissionEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole=Role::create(['name'=>RolesEnum::User->value]) ;
        $adminRole=Role::create(['name'=>RolesEnum::Admin->value]) ;

        $userManagementPermission=Permission::create(['name'=>PermissionEnum::UserManagement->value]);

        $bookingManagementPermission=Permission::create(['name'=>PermissionEnum::BookingManagement->value]);
        $roomManagementPermission=Permission::create(['name'=>PermissionEnum::RoomManagement->value]);

        $userRole->syncPermissions([$bookingManagementPermission]);
        $adminRole->syncPermissions([$bookingManagementPermission,$roomManagementPermission,$userManagementPermission]);

        User::factory()->create([
            'name' => ' User',
            'email' => 'user@example.com',
        ])->assignRole($userRole);
        User::factory()->create([
            'name' => ' Admin',
            'email' => 'admin@example.com',
        ])->assignRole($adminRole);
    }
}
