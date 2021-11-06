const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: process.platform === 'win32' ? path.join(__dirname, 'icon.ico') : path.join(__dirname, 'icon.png')
  });

  if (process.platform === "darwin") {
    const image = electron.nativeImage.createFromPath(
      app.getAppPath() + "/src/icon.png"
    );
    app.dock.setIcon(image);
  }

  mainWindow.loadURL(`https://panel.notafree.host/`);
  mainWindow.setTitle('NAFH Not.A.Free.Host');
  mainWindow.setMenu(null);
  mainWindow.webContents.on('will-navigate', function(e, url) {
	// this is for easier debugging
	// console.log(url)
  });

  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
