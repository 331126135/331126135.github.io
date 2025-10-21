---
title: React Hooks 深度解析
date: 2024-01-12 14:20:00
categories:
  - 前端
  - React
tags:
  - React
  - Hooks
  - 函数组件
  - JavaScript
  - 前端框架
cover: https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# React Hooks 深度解析

React Hooks 是 React 16.8 引入的新特性，它让函数组件也能使用状态和其他 React 特性。

## 常用 Hooks

### useState

```javascript
import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### useEffect

```javascript
import React, { useState, useEffect } from 'react'

function DataFetcher() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => setData(data))
  }, [])
  
  return <div>{data ? data.name : 'Loading...'}</div>
}
```

## 自定义 Hooks

自定义 Hooks 是复用状态逻辑的最佳方式。
