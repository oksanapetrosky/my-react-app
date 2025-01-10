import { useEffect, useState } from "react";


export const useDate = () => {
    const local = 'en';
    const [today, setDate] = useState(new Date());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 60 * 1000);
  
      return () => clearInterval(timer);
    }, []);

    const day = today.toLocaleDateString(local, { weekday: 'long' }); // e.g., Thursday
  const month = today.toLocaleDateString(local, { month: 'long' }); // e.g., January
  const date = `${day}, ${today.getDate()} ${month}`; // e.g., Thursday, 9 January
  const time = today.toLocaleTimeString(local, { hour: 'numeric', minute: 'numeric', hour12: true }); // e.g., 4:30 PM
  
    return { date, time };
  };
