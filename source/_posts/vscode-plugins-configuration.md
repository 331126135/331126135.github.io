---
title: VS Code 插件推荐与配置
date: 2023-12-29 10:15:00
categories:
  - 工具
  - IDE
tags:
  - VS Code
  - 编辑器
  - 开发工具
  - 插件推荐
  - 开发环境
cover: https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# VS Code 插件推荐与配置

VS Code 是目前最受欢迎的开发编辑器之一，合理的插件配置可以大大提升开发效率。

## 必备插件

### 语言支持

- **JavaScript (ES6) code snippets** - JavaScript 代码片段
- **TypeScript Importer** - TypeScript 自动导入
- **Python** - Python 语言支持
- **Go** - Go 语言支持
- **Rust** - Rust 语言支持

### 前端开发

- **Auto Rename Tag** - 自动重命名标签
- **Bracket Pair Colorizer** - 括号配对着色
- **CSS Peek** - CSS 类名跳转
- **HTML CSS Support** - HTML 中 CSS 智能提示
- **Live Server** - 本地服务器

### 代码质量

- **ESLint** - JavaScript 代码检查
- **Prettier** - 代码格式化
- **SonarLint** - 代码质量检查
- **Code Spell Checker** - 拼写检查

## 配置优化

### settings.json

```json
{
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "workbench.colorTheme": "One Dark Pro",
  "terminal.integrated.fontSize": 14
}
```

### 快捷键配置

```json
{
  "key": "ctrl+shift+p",
  "command": "workbench.action.showCommands"
},
{
  "key": "ctrl+`",
  "command": "workbench.action.terminal.toggleTerminal"
},
{
  "key": "ctrl+shift+`",
  "command": "workbench.action.terminal.new"
}
```

## 工作区配置

### 推荐插件组合

1. **Web 开发**：Live Server + Auto Rename Tag + CSS Peek
2. **Node.js 开发**：ESLint + Prettier + npm Intellisense
3. **Python 开发**：Python + Pylance + Python Docstring Generator
4. **Vue.js 开发**：Vetur + Vue VSCode Snippets

## 调试配置

### launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
