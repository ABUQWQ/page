# 个人主页项目

这是一个使用React和Material UI构建的现代化个人主页项目。项目采用了Material Design设计规范，并集成了流畅的动画效果和响应式布局。

## 特性

- 🎨 Material UI组件库
- 🎵 背景音乐控制
- 🖼️ Gravatar个人资料卡片集成
- 📱 完全响应式设计
- ✨ 流畅的动画效果
- 🌐 适配高对比度和减少动画模式

## 开发环境要求

- Node.js >= 18.17.0
- npm >= 9.6.7

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/ABUQWQ/page.git
cd page
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm start
```

4. 在浏览器中访问 `http://localhost:3000`

## 构建部署

1. 构建生产版本
```bash
npm run build
```

2. 部署到Netlify
- 将代码推送到GitHub仓库
- 在Netlify中连接GitHub仓库
- Netlify会自动检测到`netlify.toml`配置文件并进行相应的构建和部署

## 自定义配置

### 主题定制

可以在`src/index.js`中修改Material UI主题配置：

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#0F6CBD',
      // 更多颜色配置...
    },
  },
  // 更多主题配置...
});
```

### 背景音乐

在`src/App.js`中修改音乐文件地址：

```javascript
const [audio] = useState(new Audio('你的音乐文件地址'));
```

## 技术栈

- React 18
- Material UI 5
- Emotion (CSS-in-JS)
- React Scripts

## 许可证

MIT
