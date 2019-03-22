import { app, BrowserWindow, session, shell, Tray, nativeImage } from 'electron'
import { autoUpdater } from 'electron-updater'
import electronLog from 'electron-log'
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
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://www.oxfordlearnersdictionaries.com')

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.webContents.executeJavaScript('document.getElementById("q").focus()')
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
  tray = new Tray(nativeImage.createFromDataURL(trayIcon))
  tray.on('click', () => {
    mainWindow.show()
    mainWindow.webContents.executeJavaScript('document.getElementById("q").focus()')
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
})

app.on('activate', function () {
  mainWindow.show()
  mainWindow.webContents.executeJavaScript('document.getElementById("q").focus()')
})

app.on('before-quit', () => {
  mainWindow.forceClose = true
})
