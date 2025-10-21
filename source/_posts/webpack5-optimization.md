---
title: Webpack 5 配置优化指南
date: 2024-01-06 09:30:00
categories:
  - 前端
  - 构建工具
tags:
  - Webpack
  - 构建工具
  - 前端工程化
  - 性能优化
  - 模块打包
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Webpack 5 配置优化指南

Webpack 5 带来了许多新特性和性能改进，合理配置可以显著提升构建速度和打包效率。

## Webpack 5 新特性

### 模块联邦

模块联邦允许在运行时动态加载其他应用的模块。

```javascript
const ModuleFederationPlugin = require('@module-federation/webpack')

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfeReact: 'mfeReact@http://localhost:3001/remoteEntry.js'
      }
    })
  ]
}
```

### 持久化缓存

Webpack 5 内置了持久化缓存，可以显著提升构建速度。

```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  }
}
```

## 性能优化

### 代码分割

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

### Tree Shaking

Webpack 5 改进了 Tree Shaking 算法，可以更好地消除未使用的代码。

## 开发体验优化

### 热更新

```javascript
module.exports = {
  devServer: {
    hot: true,
    liveReload: false
  }
}
```
