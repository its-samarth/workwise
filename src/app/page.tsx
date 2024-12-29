"use client"
import { useEffect, useState } from 'react';
import { fetchHello } from '../app/utils/api';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getMessage = async () => {
      const backendMessage = await fetchHello();
      setMessage(backendMessage);
    };
    getMessage();
  }, []);

  return (
    <div>
      <h1>Frontend</h1>
      <p>Message from Backend: {message}</p>
    </div>
  );
}
