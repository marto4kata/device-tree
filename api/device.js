const usbDetect = require('usb-detection');
usbDetect.startMonitoring();
// Detect add/insert
usbDetect.on('add', function(device) { console.log('add', device); });

// Detect remove
usbDetect.on('remove', function(device) { console.log('remove', device); });

// Detect add or remove (change)
usbDetect.on('change', function(device) { console.log('change', device); });

function getDeviceTree() {
  // Uncomment this for real devices
  // return usbDetect.find()
  return Promise.resolve([
    {
      productId: 1,
      deviceName: 'Hub1',
      type: 'hub',
      deviceAddress: 1,
      vendorId: 5453,
      stringDescriptor: 'usdgfisffse',
      children: [
        {
          deviceName: 'gdfgfd',
          vendorId: 35824,
          productId: 2,
          type: 'hub',
          stringDescriptor: 'usdgfis',
          deviceAddress: 2,
          children: [
            {
              deviceName: 'gdfgfd',
              vendorId: 582443,
              deviceAddress: 3,
              productId: 3,
              type: 'hub',
              stringDescriptor: 'usdgfis',
              children: [
                {
                  deviceName: 'gdffd',
                  vendorId: 58244,
                  productId: 4,
                  deviceAddress: 4,
                  type: 'device',
                  stringDescriptor: 'usdgfis',
                }
              ]
            },{
              deviceName: 'gdffd',
              vendorId: 58244,
              productId: 7,
              deviceAddress: 5,
              type: 'device',
              stringDescriptor: 'usdgfis',
            }
          ]
        }
      ],
    }
  ]);
}

async function getDevices() {
  const res = [];
  const tree = await getDeviceTree();

  tree.forEach((root) => getDeviceByType(root, 'device', res));

  return res;
}

async function getHubs() {
  const res = [];
  const tree = await getDeviceTree();

  tree.forEach((root) => getDeviceByType(root, 'hub', res));

  return res;
}

function getDeviceByType(root, type, arr) {
  if (!root) return;

  const { children, ...device } = root;

  if (device.type === type) {
    arr.push(device);
  }

  if (!children) return;

  for (const child of children) {
    getDeviceByType(child, type, arr);
  }
}

module.exports = {
  getDeviceTree,
  getDevices,
  getHubs,
};
