export const fetchHello = async () => {
    const response = await fetch('http://13.48.59.185:5000/hello');
    const text = await response.text();
    return text;
  };
  