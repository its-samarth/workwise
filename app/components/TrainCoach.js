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
  const [bookings, setBookings] = useState([]);
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
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:px-4 sm:py-6">
      {/* Header with User ID */}
      <div className="flex flex-col items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2">
          <Ticket className="w-5 h-5 sm:w-8 sm:h-8 text-blue-600" />
          <h1 className="text-lg sm:text-3xl font-bold text-gray-800">
            Book Your Tickets 🎫
          </h1>
        </div>
        {session?.user?.id && (
          <div className="text-xs sm:text-lg text-gray-600 bg-white px-2 py-1 sm:px-4 sm:py-2 rounded-full shadow-sm">
            User ID: {session.user.id}
          </div>
        )}
      </div>

      {/* Seat Count Selection */}
      <div className="mb-3 sm:mb-6">
        <div className="bg-white p-2 sm:p-4 rounded-lg shadow-sm mx-auto max-w-sm">
          <label
            htmlFor="seatCount"
            className="block mb-1 sm:mb-2 text-sm sm:text-lg font-semibold text-gray-800"
          >
            Number of Seats to Book:
          </label>
          <select
            id="seatCount"
            value={seatCount}
            onChange={handleSeatCountChange}
            className="w-full p-1.5 sm:p-2 border-2 border-gray-300 rounded-lg 
                     text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500
                     bg-white text-xs sm:text-base"
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
      <div className="overflow-x-auto pb-2">
        <div className="max-w-screen-sm mx-auto">
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2 mb-3 sm:mb-6">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`
                  aspect-square flex items-center justify-center
                  rounded sm:rounded-lg font-medium text-white text-[10px] sm:text-base
                  min-w-[28px] sm:min-w-[40px]
                  ${seat.isBooked ? "bg-red-500" : "bg-green-600"}
                `}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-3 sm:mb-6">
        <button
          onClick={handleBooking}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white font-semibold rounded-lg 
                   hover:bg-blue-700 transition-colors duration-200 shadow-sm
                   text-xs sm:text-base"
        >
          Book {seatCount} {seatCount === 1 ? "Seat" : "Seats"}
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-600 text-white font-semibold rounded-lg 
                   hover:bg-gray-700 transition-colors duration-200 shadow-sm
                   text-xs sm:text-base"
        >
          Reset All Seats
        </button>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 && (
        <div className="max-w-sm mx-auto">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Your Bookings</h2>
          <div className="space-y-1.5 sm:space-y-2">
            {bookings.map((booking, index) => (
              <div 
                key={booking.id}
                className="flex flex-col sm:flex-row items-start sm:items-center 
                         justify-between bg-white p-2 sm:p-3 rounded-lg shadow-sm gap-1.5 sm:gap-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-xs sm:text-base">Booking #{index + 1}</span>
                  <span className="text-[10px] sm:text-sm text-gray-600">{booking.seatCount} {booking.seatCount === 1 ? 'Seat' : 'Seats'}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{booking.timestamp}</span>
                </div>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1 bg-red-600 text-white text-[10px] sm:text-sm
                           font-semibold rounded hover:bg-red-700 transition-colors duration-200"
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
        <div className="mt-3 sm:mt-4 text-center text-red-600 text-xs sm:text-base font-semibold">
          {error}
        </div>
      )}
    </div>
  );
}