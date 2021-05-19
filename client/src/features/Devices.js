import React, { useEffect, useState } from 'react';
import { DeviceTable } from '../components/DeviceTable';
import { API_URL } from "../constants";

export const Devices = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/devices`)
      .then((res) => res.json())
      .then((fetchedHubs) => setDevices(fetchedHubs));
  }, []);

  return <DeviceTable devices={devices}/>;
}
