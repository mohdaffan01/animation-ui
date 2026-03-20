const { app, BrowserWindow, screen, Tray, Menu, nativeImage } = require('electron');

let win;
let tray;
function createWindow() {
  const displays = screen.getAllDisplays();
  let minX = 0, minY = 0, maxX = 0, maxY = 0;
  for (const display of displays) {
    minX = Math.min(minX, display.bounds.x);
    minY = Math.min(minY, display.bounds.y);
    maxX = Math.max(maxX, display.bounds.x + display.bounds.width);
    maxY = Math.max(maxY, display.bounds.y + display.bounds.height);
  }

  const width = maxX - minX;
  const height = maxY - minY;

  win = new BrowserWindow({
    x: minX,
    y: minY,
    width: width,
    height: height,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    focusable: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Makes the window click-through
  win.setIgnoreMouseEvents(true);
  win.setAlwaysOnTop(true, 'screen-saver', 1);

  win.loadFile('index.html');

  // Track global cursor point at 60fps and send to renderer
  setInterval(() => {
    const point = screen.getCursorScreenPoint();
    if (win && !win.isDestroyed()) {
      // Need to adjust global coordinates relative to our window position
      const relX = point.x - minX;
      const relY = point.y - minY;
      win.webContents.send('mouse-move', { x: relX, y: relY });
    }
  }, 1000 / 60);
}

app.whenReady().then(() => {
  createWindow();

  // Create an invisible/small placeholder icon if an icon isn't supplied
  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA7SURBVDhPY8AGHBwciP+RMAwzEI2BBlBs0P///3Hgjo6OSBimAWiQEQ0DBlCMYkQ1DGgAaBgjA1yAAQBl2R7yV8t6YQAAAABJRU5ErkJggg==');
  tray = new Tray(icon);
  tray.setToolTip('Cursor Tail Animation');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Quit', click: () => { app.quit(); } }
  ]));

  // Auto-run on startup configuration
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
