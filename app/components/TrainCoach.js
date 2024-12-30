"use client"
import React, { useState } from "react";

const TrainCoach = () => {
  const totalSeats = 80;
  const seatsPerRow = 7;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatNumbers = () => {
    let seats = [];
    for (let i = 1; i <= rows; i++) {
      if (i === rows) {
        seats.push(Array.from({ length: 3 }, (_, j) => (i - 1) * 7 + j + 1));
      } else {
        seats.push(Array.from({ length: seatsPerRow }, (_, j) => (i - 1) * 7 + j + 1));
      }
    }
    return seats;
  };

  const seatNumbers = getSeatNumbers();

  const handleSeatClick = (seat) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat) // Deselect the seat
        : [...prevSelected, seat] // Select the seat
    );
  };

  return (
    <div style={styles.coach}>
      {seatNumbers.map((row, rowIndex) => (
        <div key={rowIndex} style={styles.row}>
          {row.map((seat) => (
            <div
              key={seat}
              style={{
                ...styles.seat,
                backgroundColor: selectedSeats.includes(seat) ? "#eba434" : "#4caf50",
                borderColor: selectedSeats.includes(seat) ? "#fbc02d" : "#388e3c",
              }}
              onClick={() => handleSeatClick(seat)}
            >
              {seat}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const styles = {
  coach: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    gap: "5px",
    flexWrap: "wrap", // Wrap rows for small screens
  },
  seat: {
    width: "clamp(40px, 10vw, 60px)", // Adjusts size based on screen width
    height: "clamp(40px, 10vw, 60px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4caf50",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    cursor: "pointer",
    border: "1px solid #388e3c",
  },
};

export default TrainCoach;
