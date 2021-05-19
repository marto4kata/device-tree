const express = require('express');
const cors = require('cors');
const { getDeviceTree, getHubs, getDevices } = require('./device');
const app = express();
const port = 4200;

app.use(cors());

app.get('/tree', async (req, res) => {
  const tree = await getDeviceTree();
  res.json(tree);
});

app.get('/hubs', async (req, res) => {
  const hubs = await getHubs();
  res.json(hubs);
});

app.get('/devices', async (req, res) => {
  const devices = await getDevices();
  res.json(devices);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
