import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      openFile: () => Promise<string>
      saveFile: (text: string) => Promise<string>
      pasteText: () => Promise<string>
      copyText: (text: string) => Promise<string>
      sendToOpenAI: (config: {
        link?: string
        key: string
        model?: string
        prompt: string
        content: string
        timeout?: number
        proxy?: string
      }) => any
      prompt: {
        zh: Record<string, string>
        en: Record<string, string>
      }
    }
  }
}
