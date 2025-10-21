---
title: CSS Grid 布局完全指南
date: 2024-01-03 16:50:00
categories:
  - 前端
  - CSS
tags:
  - CSS
  - Grid布局
  - 前端开发
  - 响应式设计
  - 布局技术
cover: https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# CSS Grid 布局完全指南

CSS Grid 是现代 CSS 布局的强大工具，提供了二维网格布局能力。

## Grid 基础

### 创建网格容器

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 20px;
}
```

### 网格线命名

```css
.grid-container {
  display: grid;
  grid-template-columns: [start] 1fr [middle] 1fr [end];
  grid-template-rows: [top] auto [bottom];
}
```

## 网格项目定位

### 使用网格线

```css
.item {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}
```

### 使用网格区域

```css
.grid-container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}

.footer {
  grid-area: footer;
}
```

## 响应式设计

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
```

## 对齐方式

```css
.grid-container {
  justify-items: center;    /* 水平对齐 */
  align-items: center;      /* 垂直对齐 */
  justify-content: space-between;  /* 容器水平对齐 */
  align-content: space-around;     /* 容器垂直对齐 */
}
```
