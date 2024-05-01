import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Desk } from '@shared/types/Desk'

// Custom APIs for renderer
const api = {
  desk: {
    getHistory: () => ipcRenderer.invoke('getHistory'),
    updateHistory: (updatedDesk: Desk) => ipcRenderer.invoke('updateHistory', updatedDesk),
    removeFromHistory: (removeDesk: Desk) => ipcRenderer.invoke('removeFromHistory', removeDesk),
    getDesks: () => ipcRenderer.invoke('getDesks'),
    createDesk: (newDesk: Desk) => ipcRenderer.invoke('createDesk', newDesk),
    updateDesk: (updatedDesk: string) => ipcRenderer.invoke('updateDesk', updatedDesk),
    removeDesk: (removedDesk: Desk) => ipcRenderer.invoke('removeDesk', removedDesk)
  },
  product: {
    getProducts: () => ipcRenderer.invoke('getProducts')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
