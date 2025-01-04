import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Example: Add APIs here if needed
});
