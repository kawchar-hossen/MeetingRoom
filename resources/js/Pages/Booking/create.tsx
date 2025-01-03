import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import { TRoom } from "@/types";

const slots = [
    { id: 1, label: "Slot 1", start_time: "09:00", end_time: "10:30" },
    { id: 2, label: "Slot 2", start_time: "10:40", end_time: "12:10" },
    { id: 3, label: "Slot 3", start_time: "12:20", end_time: "13:50" },
    { id: 4, label: "Slot 4", start_time: "14:00", end_time: "15:30" },
    { id: 5, label: "Slot 5", start_time: "15:40", end_time: "17:10" },
    { id: 6, label: "Slot 6", start_time: "17:20", end_time: "18:50" },
];

const CreateBooking = ({
    rooms,
    bookedSlots,
}: {
    rooms: TRoom[];
    bookedSlots: {
        room_id: number;
        date: string;
        start_time: string;
        end_time: string;
    }[];
}) => {
    const { data, setData, post, errors, processing } = useForm({
        room_id: "",
        date: "",
        start_time: "",
        end_time: "",
        slots: [],
    });

    const [selectedRoom, setSelectedRoom] = useState<TRoom | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
    const [disabledSlots, setDisabledSlots] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (selectedRoom && selectedDate) {
            const bookedForRoomAndDate = bookedSlots.filter(
                (booking) =>
                    booking.room_id === selectedRoom.id &&
                    booking.date === selectedDate
            );

            const bookedSlotIds = new Set(
                bookedForRoomAndDate.flatMap((booking) =>
                    booking.slots.map((slotId) => slotId)
                )
            );

            setDisabledSlots(bookedSlotIds);
        }
    }, [selectedRoom, selectedDate, bookedSlots]);

    const handleRoomChange = (roomId: string) => {
        const room = rooms.find((room) => room.id.toString() === roomId);
        setSelectedRoom(room || null);
        setData("room_id", roomId);
    };

    const handleDateChange = (date: string) => {
        setSelectedDate(date);
        setData("date", date);
    };

    const handleSlotChange = (slotId: number) => {
        const updatedSlots = selectedSlots.includes(slotId)
            ? selectedSlots.filter((id) => id !== slotId)
            : [...selectedSlots, slotId].sort((a, b) => a - b);

        setSelectedSlots(updatedSlots);

        if (updatedSlots.length > 0) {
            const startTime = slots[updatedSlots[0] - 1]?.start_time || "";
            const endTime =
                slots[updatedSlots[updatedSlots.length - 1] - 1]?.end_time ||
                "";
            setData("start_time", startTime);
            setData("end_time", endTime);
            setData("slots", updatedSlots); 
        } else {
            setData("start_time", "");
            setData("end_time", "");
            setData("slots", []);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.start_time || !data.end_time || selectedSlots.length === 0) {
            alert("Please select at least one valid slot.");
            return;
        }

        setData("slots", selectedSlots);
        post(route("booking.store"));
    };

    return (
        <AuthLayout>
            <div className="max-w-3xl mx-auto my-8 p-8 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-xl rounded-lg">
                <h1 className="text-4xl font-bold text-white text-center mb-6">
                    Create Your Booking
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Room Selection */}
                    <div className="form-control">
                        <label className="label text-white text-lg font-medium">
                            Select Room
                        </label>
                        <select
                            className="select select-bordered w-full bg-white text-gray-700 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg"
                            value={data.room_id}
                            onChange={(e) => handleRoomChange(e.target.value)}
                        >
                            <option value="">-- Select a Room --</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.name}
                                </option>
                            ))}
                        </select>
                        {errors.room_id && (
                            <p className="text-sm text-red-500 mt-1">
                                * {errors.room_id}
                            </p>
                        )}
                    </div>

                    {/* Date Selection */}
                    <div className="form-control">
                        <label className="label text-white text-lg font-medium">
                            Select Date
                        </label>
                        <input
                            type="date"
                            className="input input-bordered w-full bg-white text-gray-700 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 rounded-lg"
                            value={data.date}
                            onChange={(e) => handleDateChange(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                        />
                        {errors.date && (
                            <p className="text-sm text-red-500 mt-1">
                                * {errors.date}
                            </p>
                        )}
                    </div>

                    {/* Slot Selection */}
                    <div className="form-control">
                        <label className="label text-white text-lg font-medium">
                            Select Slots
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    type="button"
                                    disabled={disabledSlots.has(slot.id)}
                                    onClick={() => handleSlotChange(slot.id)}
                                    className={`${
                                        disabledSlots.has(slot.id)
                                            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                            : selectedSlots.includes(slot.id)
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white text-indigo-600 border-2 border-indigo-500"
                                    } rounded-lg py-2 px-4 text-center font-medium transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300`}
                                >
                                    {slot.label} ({slot.start_time} - {slot.end_time})
                                </button>
                            ))}
                        </div>
                        {errors.slots && (
                            <p className="text-sm text-red-500 mt-1">
                                * {errors.slots}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="form-control">
                        <button
                            type="submit"
                            className="btn btn-primary w-full py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={processing}
                        >
                            {processing ? "Processing..." : "Create Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default CreateBooking;
