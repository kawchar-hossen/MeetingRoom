import AuthLayout from '@/Layouts/AuthLayout';
import { Button } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import React from 'react';

const index = ({bookings}:{bookings:any}) => {
    console.log(bookings)
    return (
        <AuthLayout>

            <Link  href={route('booking.create')} className={'btn btn-success text-white'}>Create bookings</Link>

        </AuthLayout>
    );
};

export default index;
