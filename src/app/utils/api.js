export const fetchHello = async () => {
    const response = await fetch('http://localhost:3001/hello');
    const text = await response.text();
    return text;
  };
  