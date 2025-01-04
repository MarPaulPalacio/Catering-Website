const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // Example: Add APIs here if needed
});
