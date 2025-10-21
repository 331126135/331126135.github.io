---
title: Jest 单元测试最佳实践
date: 2024-01-01 08:00:00
categories:
  - 测试
  - 前端测试
tags:
  - Jest
  - 单元测试
  - 测试框架
  - 前端测试
  - 自动化测试
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Jest 单元测试最佳实践

Jest 是 JavaScript 生态系统中最流行的测试框架之一，提供了完整的测试解决方案。

## Jest 基础

### 基本测试

```javascript
// math.js
function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

module.exports = { add, subtract }

// math.test.js
const { add, subtract } = require('./math')

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3)
})

test('subtracts 2 from 5 to equal 3', () => {
  expect(subtract(5, 2)).toBe(3)
})
```

### 异步测试

```javascript
// async.js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('data')
    }, 1000)
  })
}

// async.test.js
test('fetchData returns data', async () => {
  const data = await fetchData()
  expect(data).toBe('data')
})
```

## Mock 和 Spy

### Mock 函数

```javascript
const mockFn = jest.fn()

mockFn('hello')
expect(mockFn).toHaveBeenCalledWith('hello')
```

### Mock 模块

```javascript
jest.mock('./api')

const api = require('./api')
api.getData.mockResolvedValue('mocked data')
```

## 测试配置

### Jest 配置

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
}
```

## 最佳实践

1. **测试命名**：使用描述性的测试名称
2. **单一职责**：每个测试只测试一个功能
3. **AAA 模式**：Arrange, Act, Assert
4. **Mock 外部依赖**：避免测试依赖外部服务
5. **覆盖率**：保持合理的测试覆盖率
