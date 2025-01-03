import AuthLayout from "@/Layouts/AuthLayout";
import { Link } from "@inertiajs/react";
import React from "react";

const index = () => {
    return (
        <AuthLayout>
            <Link href={route("room.create")} className="btn btn-success">
                Create Room
            </Link>
        </AuthLayout>
    );
};

export default index;
