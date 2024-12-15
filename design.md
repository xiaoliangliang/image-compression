# 项目结构与技术规格

## 项目概述
这是一个使用 `create-next-app` 初始化的 Next.js 15.1.0 项目，支持 TypeScript，采用 App Router 架构，并使用 TailwindCSS 进行样式设计。

## 目录结构
├── app/
│ ├── layout.tsx # 根布局组件，包含字体配置
│ ├── page.tsx # 首页组件
│ └── globals.css # 全局样式和 Tailwind 导入
├── public/ # 静态资源目录
├── components/ # 共享组件目录（预留）
├── node_modules/
└── 配置文件

## 技术栈
- **框架**: Next.js 15.1.0
- **开发语言**: TypeScript
- **样式方案**: 
  - TailwindCSS 3.4.1
  - CSS 变量实现主题色
  - Geist 字体家族（Sans & Mono）

## 核心特性与配置

### 1. TypeScript 配置
- 启用严格模式
- 配置路径别名 (`@/*`)
- 模块解析方式: "bundler"
- 目标版本: ES2017

### 2. 样式系统
- 使用 TailwindCSS 配合自定义颜色变量
- 支持暗色模式（通过媒体查询）
- 自定义颜色令牌：
  - `--background`（背景色）
  - `--foreground`（前景色）

### 3. 开发工具
- ESLint（��成 Next.js 配置）
- PostCSS（用于处理 TailwindCSS）
- 开发环境启用 Turbopack

### 4. 依赖包
- **核心依赖**:
  - React 19
  - Next.js 15.1.0
- **其他依赖**:
  - react-dropzone: 14.3.5（文件拖放）
  - sharp: 0.33.5（图片处理）

### 5. 性能优化
- 使用 `next/font` 优化字体加载
- 使用 `next/image` 优化图片加载
- 首屏内容自动优先加载

### 6. 开发环境
- 支持热重载的开发服务器
- TypeScript 增量构建
- 环境变量支持

## 备注
- 项目预设了图片压缩功能（根据包名和依赖推测）
- 内置暗色模式支持
- 采用组件化架构
- 使用现代 React 特性和模式

## 新增功能：图片压缩

### 功能需求
1. 图片上传与压缩
   - 支持格式：PNG、JPG/JPEG
   - 支持拖拽上传和点击上传
   - 可配置压缩比例
   - 使用 sharp 库进行图片压缩处理

2. 图片预览
   - 原图预览
   - 压缩后预览
   - 显示图片尺寸信息
   - 显示文件大小信息

3. 结果处理
   - 下载压缩后的图片
   - 支持重新调整压缩参数

### 界面设计
- 采用苹果设计风格
  - 简洁的白色/深色主题
  - 磨砂玻璃效果
  - 柔和阴影
  - 平滑过渡动画
  - 精致的交互反馈

### 技术方案
1. 前端组件
   - ImageUploader: 处理图片上传
   - ImagePreview: 图片预览展示
   - CompressionControls: 压缩参数控制
   - DownloadButton: 处理下载功能

2. API 路由
   - /api/compress: 处理图片压缩请求

3. 工具函数
   - 图片格式验证
   - 文件大小计算
   - 压缩参数处理
