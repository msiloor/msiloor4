// electron/main.js

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, Tray, BrowserWindow, Menu } = require('electron')
const path = require('path')
const NODE_ENV = process.env.NODE_ENV

const isMac = process.platform === 'darwin'

const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ label: `关于 ${app.name}`, role: 'about' }, { type: 'separator' }, { label: '服务', role: 'services' }, { type: 'separator' }, { label: `隐藏 ${app.name}`, role: 'hide' }, { label: `隐藏其他`, role: 'hideOthers' }, { label: `显示全部`, role: 'unhide' }, { type: 'separator' }, { label: `退出 ${app.name}`, role: 'quit' }],
        },
      ]
    : []),
  // { role: 'viewMenu' }
  {
    label: '开发',
    submenu: [{ label: `刷新`, role: 'reload' }, { type: 'separator' }, { label: `刷新(忽略缓存)`, role: 'forceReload' }, { label: `开发者工具`, role: 'toggleDevTools' }, { type: 'separator' }, { label: `还原页面`, role: 'resetZoom' }, { label: `放大`, role: 'zoomIn' }, { label: `缩小`, role: 'zoomOut' }],
  },
  // { role: 'windowMenu' }
  {
    label: '窗口',
    submenu: [{ label: '最小化', role: 'minimize' }, { label: '缩放窗口', role: 'zoom' }, { type: 'separator' }, { label: `全屏`, role: 'togglefullscreen' }, { type: 'separator' }, { label: '关闭', role: 'close' }],
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: `查看 ${app.name} 帮助`,
        click: async () => {
          const { shell } = require('electron')
          await shell.openExternal('https://electronjs.org')
        },
      },
    ],
  },
]

const menu = Menu.buildFromTemplate(template)

function createWindow() {
  Menu.setApplicationMenu(menu)
  app.dock.bounce()

  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      scrollBounce: true,
    },
    webPreferences: {
      webSecurity: false,
    },
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 10 },
  })

  // 加载 index.html
  // mainWindow.loadFile('dist/index.html') 将该行改为下面这一行，加载url
  mainWindow.loadURL(NODE_ENV === 'development' ? 'http://localhost:3000' : `file://${path.join(__dirname, '../dist/index.html')}`)

  // 打开开发工具
  if (NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
}
function createMenu() {
  const { app, Menu } = require('electron')

  const template = [
    // 这里是菜单模版
  ]
}
// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 在这个文件中，你可以包含应用程序剩余的所有部分的代码，
// 也可以拆分成几个文件，然后用 require 导入。
