import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { openai } from './openai'
import prompt from './prompt'
// Custom APIs for renderer
const api = {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  saveFile: (text: string) => ipcRenderer.invoke('dialog:saveFile', text),
  pasteText: () => ipcRenderer.invoke('clipboard:pasteText'),
  copyText: (text: string) => ipcRenderer.invoke('clipboard:copyText', text),
  sendToOpenAI: openai,
  prompt: prompt
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
