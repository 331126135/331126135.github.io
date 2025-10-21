---
title: Express.js 中间件开发指南
date: 2024-01-02 12:35:00
categories:
  - 后端
  - Node.js
tags:
  - Express.js
  - Node.js
  - 中间件
  - Web开发
  - 后端框架
cover: https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Express.js 中间件开发指南

Express.js 的中间件是处理请求和响应的核心机制，理解中间件的工作原理对开发至关重要。

## 中间件基础

中间件是一个函数，它可以访问请求对象、响应对象和应用程序的请求-响应循环中的下一个中间件函数。

```javascript
const express = require('express')
const app = express()

// 基本中间件
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// 路由中间件
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

## 内置中间件

### express.json()

解析 JSON 格式的请求体。

```javascript
app.use(express.json())
```

### express.urlencoded()

解析 URL 编码的请求体。

```javascript
app.use(express.urlencoded({ extended: true }))
```

### express.static()

提供静态文件服务。

```javascript
app.use(express.static('public'))
```

## 自定义中间件

### 日志中间件

```javascript
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
}

app.use(logger)
```

### 认证中间件

```javascript
const authenticate = (req, res, next) => {
  const token = req.headers.authorization
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  // 验证 token
  if (isValidToken(token)) {
    next()
  } else {
    res.status(401).json({ error: 'Invalid token' })
  }
}

app.use('/api', authenticate)
```

## 错误处理中间件

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})
```
