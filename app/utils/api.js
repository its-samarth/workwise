export const fetchHello = async () => {
    const response = await fetch('https://samarthprojecttrial.online/hello');
    const text = await response.text();
    return text;
  };
  