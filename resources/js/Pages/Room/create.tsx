import React from 'react';
import { useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

interface RoomFormData {
    name: string;
    capacity: string;
    features: string[]; // Features as an array of strings
    location: string;
}

const CreateRoom = () => {
    const { data, setData, post, errors } = useForm<RoomFormData>({
        name: '',
        capacity: '',
        features: [], // Initialize as an empty array
        location: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ensure that at least one feature is entered and not an empty string
        if (data.features.length === 0 || data.features.some(feature => feature.trim() === '')) {
            alert('Please enter at least one valid feature.');
            return;
        }

        // Submit the form data
        post(route('room.store'));
    };

    return (
        <AuthLayout>
            <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-6">Create New Room</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Room Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Room Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter room name"
                            className="input input-bordered w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Capacity */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Capacity</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Enter room capacity"
                            className="input input-bordered w-full"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                        />
                        {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
                    </div>

                    {/* Features */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Features</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter features separated by commas"
                            className="input input-bordered w-full"
                            value={data.features.join(', ')} // Convert array to string for display
                            onChange={(e) =>
                                setData(
                                    'features',
                                    e.target.value.split(',').map((feature) => feature.trim()) // Convert string to array
                                )
                            }
                        />
                        {errors.features && <p className="text-red-500 text-sm">{errors.features}</p>}
                    </div>

                    {/* Location */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Location</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter location"
                            className="input input-bordered w-full"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control w-full">
                        <button type="submit" className="btn btn-primary w-full">
                            Create Room
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default CreateRoom;
