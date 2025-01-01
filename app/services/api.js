// services/api.js
const BASE_URL = 'https://workwise-backend-production.up.railway.app/routes/api';

export const fetchSeats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/seats`);
    const data = await response.json();    
    return data;
  } catch (error) {
    console.error('Error fetching seats:', error);
    throw error;
  }
};

export const bookSeats = async (numberOfSeats, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        numberOfSeats,
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error booking seats:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};

export const resetSeats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/reset`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting seats:', error);
    throw error;
  }
};
