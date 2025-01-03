<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = 'admin';
    case User = 'user';
    public static function labels()
    {
        return [
            self::Admin->value => 'admin',
            self::User->value => 'user'

        ];
    }
    public function label()
    {

        return match ($this) {
            self::Admin => 'admin',
            self::User => 'user',
        };
    }
}
