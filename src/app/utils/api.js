export const fetchHello = async () => {
    const response = await fetch('http://workwise.chickenkiller.com/hello');
    const text = await response.text();
    return text;
  };
  