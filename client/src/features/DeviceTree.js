import React, { useEffect, useState } from "react";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import DevicesIcon from '@material-ui/icons/Devices';
import { API_URL } from "../constants";
import { DeviceInfo } from "../components/DeviceInfo";
import { Tree } from "../components/Tree";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

export const DeviceTree = () => {
  const infoInitialState = {
    deviceName: '',
    type: '',
    vendorId: null,
    productId: null,
    deviceAddress: null,
    manufacturer: ''
  };

  const [info, setInfo] = useState(infoInitialState);
  const onInfoClick = (e, item) => {
    e.preventDefault();
    setInfo(info.deviceAddress === item.deviceAddress ? infoInitialState : item);
  }
  const getLabelIcon = (item) => item.type === 'hub' ? DeviceHubIcon : DevicesIcon;

  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/tree`)
      .then((res) => res.json())
      .then((fetchedDevices) => setDevices(fetchedDevices))
      .catch((error) => console.error('Error fetching devices:', error));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card elevation={8}>
          <CardContent>
            <Tree
              treeItems={devices}
              onInfoClick={onInfoClick}
              getLabelIcon={getLabelIcon}
              keyProperty="deviceAddress"
              labelProperty="deviceName"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <DeviceInfo info={info}/>
      </Grid>
    </Grid>
  );
}
