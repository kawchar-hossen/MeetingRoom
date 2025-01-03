import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type TBooking={
    id: number; // Primary key
    user_id: number; // Foreign key referencing users
    room_id: number; // Foreign key referencing rooms
    start_time: string; // Start time (HH:MM:SS format)
    end_time: string; // End time (HH:MM:SS format)
    date: string; // Booking date (YYYY-MM-DD format)
    created_at: string;

}

export type TRoom={
    id: number; // Primary key
    name: string; // Room name
    capacity: number; // Capacity of the room
    features: string[]; // Array of features (stored as JSON in the database)
    location: string; // Room location
    created_at?: string; // Timestamp of creation (optional)
    updated_at?: string; // Timestamp of last update (optional)
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
