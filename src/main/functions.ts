import { dialog, clipboard } from 'electron'
import { readFileSync, writeFileSync } from 'fs'

export const handleFileOpen = async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {
        name: 'Text',
        extensions: ['txt']
      }
    ]
  })
  if (filePaths.length) {
    return readFileSync(filePaths[0], 'utf-8')
  }
  return ''
}

export const handleFileSave = async (_event, text: string) => {
  const { filePath } = await dialog.showSaveDialog({
    filters: [
      {
        name: 'Text',
        extensions: ['txt']
      }
    ]
  })
  if (filePath?.length) {
    writeFileSync(filePath, text)
    return filePath
  }
  return ''
}

export const handlePasteText = async () => {
  return clipboard.readText()
}

export const handleCopyText = async (_event, text: string) => {
  return clipboard.writeText(text)
}
