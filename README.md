# Device

Note: Current setup uses hardcoded devices so I can demonstrate rendering of tree structure. If you want to see real devices uncomment this line https://github.com/marto4kata/device-tree/blob/7c6aa8b052de402a187c3c64e375aedadedbf279/api/device.js#L20.
I didn't manage to get the tree structure for real devices as I am unable to detect which device is connected to which hub, so I can get only flat data.

## Start the project

To start the project start api and frontend server simultaneously.

### Run the api
```
cd api
npm install
npm start
```

### Run the frontend
```
cd client
npm install
npm start
```

## Solution

### Frontend

For frontend I used Reactjs with hooks. For UI I used MaterialUI - https://material-ui.com/. Makes https calls to the api via fetch API.
Challenges: Rendering tree data using recursion with MaterialUI, but at the end able to do it.

### API

For api I made simple node.js server. Implemented endpoint using express. For usb detection I used https://www.npmjs.com/package/usb-detection.  Communicates with client via http. Would be easy to add socket connection, I was planning to use library like https://socket.io/.
Challenges: Getting which devices are connected to which hubs.

