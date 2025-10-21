---
title: TypeScript 高级类型系统
date: 2024-01-08 10:00:00
categories:
  - 前端
  - TypeScript
tags:
  - TypeScript
  - 类型系统
  - JavaScript
  - 前端开发
  - 静态类型
cover: https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# TypeScript 高级类型系统

TypeScript 的类型系统是其核心特性，提供了强大的类型检查和代码提示功能。

## 基础类型

```typescript
// 基本类型
let name: string = "TypeScript"
let age: number = 5
let isActive: boolean = true

// 数组类型
let numbers: number[] = [1, 2, 3]
let names: Array<string> = ["Alice", "Bob"]

// 对象类型
interface User {
  id: number
  name: string
  email?: string
}
```

## 高级类型

### 联合类型

```typescript
type Status = "loading" | "success" | "error"

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      return "加载中..."
    case "success":
      return "成功"
    case "error":
      return "错误"
  }
}
```

### 泛型

```typescript
function identity<T>(arg: T): T {
  return arg
}

let output = identity<string>("hello")
let numberOutput = identity<number>(42)
```

## 工具类型

TypeScript 提供了许多内置的工具类型，如 `Partial`、`Required`、`Pick`、`Omit` 等。
