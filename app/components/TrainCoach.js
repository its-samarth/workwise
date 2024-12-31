import React, { useState, useEffect } from "react";
import {
  fetchSeats,
  bookSeats,
  cancelBooking,
  resetSeats,
} from "../services/api";
import { Ticket } from "lucide-react";
import { useSession } from "next-auth/react";

export default function TrainCoach() {
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]); // Array to store multiple booking IDs
  const [seatCount, setSeatCount] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    loadSeats();
  }, []);

  const loadSeats = async () => {
    try {
      setLoading(true);
      const data = await fetchSeats();
      setSeats(data);
      setError(null);
    } catch (err) {
      setError("Failed to load seats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    try {
      const userId = session?.user?.id;
      const numericUserId = Number(userId);
      const result = await bookSeats(seatCount, numericUserId);
      setBookings(prev => [...prev, { 
        id: result.id, 
        seatCount: seatCount,
        timestamp: new Date().toLocaleString()
      }]);
      loadSeats();
      setError(null);
    } catch (err) {
      setError("Failed to book seats", err);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      loadSeats();
      setError(null);
    } catch (err) {
      setError("Failed to cancel booking", err);
    }
  };

  const handleReset = async () => {
    try {
      await resetSeats();
      loadSeats();
      setBookings([]);
      setError(null);
    } catch (err) {
      setError("Failed to reset seats", err);
    }
  };

  const handleSeatCountChange = (event) => {
    setSeatCount(Number(event.target.value));
  };

  if (loading) {
    return <div className="text-center p-4 text-gray-800">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-xl">
      {/* Header with User ID */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="flex items-center justify-center gap-3">
          <Ticket className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Book Your Tickets 🎫
          </h1>
        </div>
        {session?.user?.id && (
          <div className="text-lg text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            User ID: {session.user.id}
          </div>
        )}
      </div>

      {/* Seat Count Selection */}
      <div className="mb-8">
        <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-md">
          <label
            htmlFor="seatCount"
            className="block mb-3 text-lg font-semibold text-gray-800"
          >
            Number of Seats to Book:
          </label>
          <select
            id="seatCount"
            value={seatCount}
            onChange={handleSeatCountChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg shadow-sm 
                     text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500
                     bg-white text-lg"
          >
            {[...Array(7)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1} {index === 0 ? "Seat" : "Seats"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Seat Display */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-2">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`
                p-4 rounded-lg font-bold text-white text-center
                ${seat.isBooked ? "bg-red-500" : "bg-green-600"}
              `}
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={handleBooking}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                     hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Book {seatCount} {seatCount === 1 ? "Seat" : "Seats"}
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg 
                     hover:bg-gray-700 transition-colors duration-200 shadow-md"
          >
            Reset All Seats
          </button>
        </div>

        {/* Bookings List */}
        {bookings.length > 0 && (
          <div className="mt-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Bookings</h2>
            <div className="space-y-3">
              {bookings.map((booking, index) => (
                <div 
                  key={booking.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">Booking #{index + 1}</span>
                    <span className="text-sm text-gray-600">{booking.seatCount} {booking.seatCount === 1 ? 'Seat' : 'Seats'}</span>
                    <span className="text-xs text-gray-500">{booking.timestamp}</span>
                  </div>
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg 
                             hover:bg-red-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-6 text-center text-red-600 text-lg font-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}