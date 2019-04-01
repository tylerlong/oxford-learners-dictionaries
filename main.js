import { app, BrowserWindow, session, shell, Tray, nativeImage, globalShortcut } from 'electron'
import { autoUpdater } from 'electron-updater'
import electronLog from 'electron-log'
import path from 'path'

import trayIcon from './tray@2x.png'
import { setApplicationMenu } from './menu'

// check for updates
electronLog.transports.file.level = 'info'
autoUpdater.logger = electronLog
autoUpdater.checkForUpdatesAndNotify()
setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify()
}, 3600000) // check for updates every hour

let mainWindow
let loadingWindow
const activate = () => {
  mainWindow.show()
  mainWindow.webContents.executeJavaScript('document.getElementById("q").focus()')
}
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  })
  mainWindow.loadURL('https://www.oxfordlearnersdictionaries.com')

  loadingWindow = new BrowserWindow({
    width: 128,
    height: 128,
    webPreferences: {
      nodeIntegration: false
    },
    frame: false,
    opacity: 0.5,
    alwaysOnTop: true
  })
  loadingWindow.loadURL(path.join('file://', __dirname, '..', 'index.html'))

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.webContents.executeJavaScript('document.getElementById("q").focus()')
  })

  mainWindow.webContents.on('will-navigate', () => {
    loadingWindow.show()
  })
  mainWindow.webContents.on('did-finish-load', () => {
    loadingWindow.hide()
  })

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('close', function (event) {
    if (mainWindow.forceClose) {
      return
    }
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    shell.openExternal(url) // open new window in external browser
  })
}

let tray
function createTray () {
  const iconImage = nativeImage.createEmpty()
  iconImage.addRepresentation({ scaleFactor: 2.0, dataURL: trayIcon })
  tray = new Tray(iconImage)
  tray.on('click', () => {
    activate()
  })
}

app.on('ready', () => {
  setApplicationMenu()
  createWindow()
  createTray()

  // Ref: https://electronjs.org/docs/tutorial/security#6-define-a-content-security-policy
  session.defaultSession.webRequest.onHeadersReceived((details, handle) => {
    handle({
      ...details,
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ["script-src 'self' 'unsafe-inline'"]
      }
    })
  })

  globalShortcut.register('Alt+Shift+D', () => {
    activate()
  })
})

app.on('activate', function () {
  activate()
})

app.on('before-quit', () => {
  mainWindow.forceClose = true
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
