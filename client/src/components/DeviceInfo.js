import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

export const DeviceInfo = ({ info }) => {
  const { deviceName, type, vendorId, productId, manufacturer } = info;
  return deviceName && (
    <Card elevation={8}>
      <CardContent>
        <Typography>
          Name: {deviceName}
        </Typography>
        <Typography>
          Type: {type}
        </Typography>
        <Typography>
          Vendor Id: {vendorId}
        </Typography>
        <Typography>
          Product Id: {productId}
        </Typography>
        <Typography>
          Manufacturer: {manufacturer}
        </Typography>
      </CardContent>
    </Card>
  )
}
