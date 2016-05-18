// This is the entry point of the application and this will run in the main process which will control all the renderer processes
"use strict";

// First we will pull in the electron module which exports certain useful classes which would help us build the application
const Electron = require("electron");

// We now need the "App" object to start building our application
const {app} = Electron;

// We need "BrowserWindow" object to create our child renderer processes which will create instances of views for our application
const {BrowserWindow} = Electron;

// We need to keep a reference to all the windows(views) of our application so that they are not garbage collected when we close them
// we want them to remain in the memory so that we do not have create the views(s) each time the use navigates to it
let mainWindow = null;

// Function which creates the main window
let createMainWindow = () => {
    
    //initialize the main window
    mainWindow= new BrowserWindow({
        fullscreen: true
    });
    
    //Load the required html file that needs to be associated with the main window or view of application
    mainWindow.loadURL("file://" + __dirname + "/index.html");
    
    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

   // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
  
};

// When app gets bootstrapped and is ready, we go ahead with the creation of the main window
app.on("ready", createMainWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
    app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
    createMainWindow();
    }
});
 
 