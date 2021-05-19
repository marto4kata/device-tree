import React, { useEffect, useState } from 'react';
import { DeviceTable } from '../components/DeviceTable';
import { API_URL } from "../constants";

export const Hubs = () => {
  const [hubs, setHubs] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/hubs`)
      .then((res) => res.json())
      .then((fetchedHubs) => setHubs(fetchedHubs));
  }, []);

  return <DeviceTable devices={hubs}/>;
}
