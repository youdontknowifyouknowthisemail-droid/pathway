/* Pathway — Electron desktop wrapper.
   Loads the built web app (copied into ./app) in a normal desktop window. */
const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

let win = null
function createWindow() {
  win = new BrowserWindow({
    width: 1180,
    height: 820,
    minWidth: 380,
    minHeight: 560,
    title: 'Pathway',
    backgroundColor: '#0b1120',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })
  if (win.removeMenu) win.removeMenu()
  win.loadFile(path.join(__dirname, 'app', 'index.html'))
  // open external links (GitHub, deploy links) in the system browser
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' } })
  win.on('closed', () => (win = null))
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
