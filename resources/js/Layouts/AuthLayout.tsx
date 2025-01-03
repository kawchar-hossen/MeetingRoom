import Navbar from "@/Components/Navbar";
import { usePage } from "@inertiajs/react";
import React, { PropsWithChildren, ReactNode, useState } from "react";

const AuthLayout = ({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) => {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar user={user}></Navbar>

            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
};

export default AuthLayout;
