const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  fetchContributions: (username) =>
    ipcRenderer.invoke("fetch-contributions", username),
  getUsername: () => ipcRenderer.invoke("get-username"),
});
