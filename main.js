// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow, globalShortcut} = require('electron')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
   // Create the browser window and size it according to the width of the screen.
   const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
   mainWindow = new BrowserWindow({width: Math.ceil(width * 0.8), height: Math.ceil(height * 0.8), frame: false})

   // and load the index.html of the app.
   mainWindow.loadFile('./app/index.html')

   // Open the DevTools.
   // mainWindow.webContents.openDevTools()

   // Emitted when the window is closed.
   mainWindow.on('closed', function () {
     // Dereference the window object, usually you would store windows
     // in an array if your app supports multi windows, this is the time
     // when you should delete the corresponding element.
     mainWindow = null
   })

   // Use esc as a quit shortcut
   globalShortcut.register('Escape', () => {
    app.quit()
   })

})


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
