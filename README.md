# Daxin HomePage

一个基于 Vue 3 + TypeScript + Vite 构建的个人主页项目，展示个人介绍、技能栈、项目作品等信息。

## 功能简介

这是一个现代化的个人主页，包含以下核心模块：

- **首页 Hero**：个人介绍、职业标签轮播、社交链接
- **作品展示**：横向滑动展示项目作品
- **个人详情**：
  - 工作地点地图展示
  - 个人经历与理念
  - 教育背景
  - 开源项目介绍
  - 技术栈技能云

## 技术栈

- **前端框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **样式方案**：UnoCSS
- **动画效果**：GSAP + AOS + @vueuse/motion
- **地图组件**：高德地图 JS API
- **图标**：Simple Icons + Iconify

## 安装步骤

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 快速开始

```bash
# 克隆项目
git clone <repository-url>
cd HomePage

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 基本使用方法

### 开发模式

```bash
pnpm dev
```

服务默认运行在 `http://localhost:5173`

### 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录

### 本地预览生产版本

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 主要特性

- 响应式设计（仅支持桌面端访问）
- 流畅的滚动动画效果
- 3D 技能云展示
- 无缝轮播图展示
- 视差滚动效果
- 文字分割动画

## 项目结构

```
HomePage/
├── src/
│   ├── components/     # 页面组件
│   │   ├── Header/     # 首页 Hero 区域
│   │   ├── Swiper/     # 作品轮播
│   │   ├── Info/       # 个人详情
│   │   ├── Work/       # 项目展示
│   │   └── Map/        # 地图组件
│   ├── bits/           # 动画效果组件
│   │   ├── LightRays/  # 光线效果
│   │   ├── SplitText/  # 文字分割动画
│   │   └── RotatingText/ # 轮播文字
│   ├── ui/             # UI 组件
│   │   └── IconCloud/  # 技能云
│   ├── utils/          # 工具函数
│   ├── styles/         # 全局样式
│   └── App.vue         # 根组件
├── public/             # 静态资源
├── index.html
├── package.json
├── vite.config.ts      # Vite 配置
├── uno.config.ts       # UnoCSS 配置
└── tsconfig.json       # TypeScript 配置
```

## 必要的配置说明

### 地图配置

项目使用高德地图，需要在 `src/components/Map/index.vue` 中配置你的高德地图 Key：

```typescript
const staticMapUrl = 'https://apis.map.qq.com/ws/staticmap/v2/?center=121.56,29.86&zoom=11&size=800*400&maptype=roadmap&markers=type:large|color:0x539dfd|121.56,29.86|浙江宁波&key=YOUR_KEY'
```

### 个人信息配置

修改 `src/components/Header/index.vue` 中的个人信息：

- 姓名、职业标签
- 个人博客链接
- GitHub 链接
- 头像地址

### 作品数据配置

修改 `src/components/Swiper/index.vue` 中的 `swiperItems` 数组来更新展示的项目：

```typescript
const swiperItems = ref<SwiperItem[]>([
  {
    id: 1,
    src: '项目截图URL',
    title: '项目名称',
    url: '项目链接',
  },
  // ...
])
```

### 技能图标配置

修改 `src/components/Info/index.vue` 中的 `techIcons` 数组来更新技能云展示的图标：

```typescript
const techIcons = [
  'vue', 'typescript', 'javascript',
  // ...更多图标
]
```

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

**注意**：本项目仅支持桌面端访问，移动端会显示提示信息。

## 开源协议

[MIT](LICENSE)
