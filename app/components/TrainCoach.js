import React, { useState, useEffect } from "react";
import { fetchSeats, bookSeats, cancelBooking, resetSeats } from "../services/api";

export default function TrainCoach() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [seatCount, setSeatCount] = useState(1);  // New state for seat count

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
      setError("Failed to load seats",err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (selectedSeats.length === 0 || selectedSeats.length !== seatCount) {
      setError(`Please select exactly ${seatCount} seat${seatCount > 1 ? 's' : ''}`);
      return;
    }

    try {
      const userId = 5; // Replace with actual user ID from your auth system
      const result = await bookSeats(seatCount, userId);
      setBookingId(result.id);
      setSelectedSeats([]);
      loadSeats(); // Refresh seats after booking
      setError(null);
    } catch (err) {
      setError("Failed to book seats",err);
    }
  };

  const handleCancel = async () => {
    if (!bookingId) return;

    try {
      await cancelBooking(bookingId);
      setBookingId(null);
      loadSeats(); // Refresh seats after cancellation
      setError(null);
    } catch (err) {
      setError("Failed to cancel booking",err);
    }
  };

  const handleReset = async () => {
    try {
      await resetSeats();
      loadSeats(); // Refresh seats after reset
      setBookingId(null);
      setSelectedSeats([]);
      setError(null);
    } catch (err) {
      setError("Failed to reset seats",err);
    }
  };

  const handleSeatClick = (seatId) => {
    if (seats.find(seat => seat.id === seatId)?.isBooked) {
      return; // Don't allow selecting booked seats
    }

    // Update the selectedSeats to match the chosen seat count
    if (selectedSeats.length < seatCount) {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const handleSeatCountChange = (event) => {
    setSeatCount(Number(event.target.value));
    setSelectedSeats([]); // Reset selected seats when seat count changes
  };

  if (loading) {
    return <div className="text-center p-4 text-gray-800">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Seat Count Selection */}
      <div className="mb-6 text-center">
        <label htmlFor="seatCount" className="mr-2 text-lg font-semibold text-gray-800">Select Number of Seats (1-7):</label>
        <select
          id="seatCount"
          value={seatCount}
          onChange={handleSeatCountChange}
          className="p-2 border-2 border-gray-400 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[...Array(7)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Seat Selection */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-7 gap-2">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat.id)}
              className={`
                p-4 rounded-lg font-bold text-white
                ${seat.isBooked 
                  ? 'bg-gray-500 cursor-not-allowed'
                  : selectedSeats.includes(seat.id)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-green-600 hover:bg-green-700'
                }
              `}
            >
              {seat.seatNumber}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={handleBooking}
            disabled={selectedSeats.length !== seatCount}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Book {seatCount} Seat{seatCount > 1 ? 's' : ''}
          </button>

          {bookingId && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700"
            >
              Cancel Booking
            </button>
          )}

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
          >
            Reset All Seats
          </button>
        </div>

        {/* Selected Seats Display */}
        <div className="mt-6 text-center text-lg font-semibold text-gray-800">
          {selectedSeats.length > 0 
            ? `Selected seats: ${selectedSeats.join(", ")}`
            : "Selected seats: None"}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 text-center text-red-600 text-lg font-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
