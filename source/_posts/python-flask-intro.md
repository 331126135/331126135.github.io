---
title: Python Flask 框架入门
date: 2024-01-13 09:15:00
categories:
  - 后端
  - Python
tags:
  - Python
  - Flask
  - Web开发
  - 后端框架
cover: https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Python Flask 框架入门

Flask 是一个轻量级的 Python Web 框架，简单易学，适合快速开发 Web 应用。

## Flask 简介

Flask 是一个微框架，它只提供核心功能，其他功能通过扩展来实现。

## 基本应用

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
```

## 路由和视图

Flask 使用装饰器来定义路由，支持动态路由参数。

## 模板系统

Flask 使用 Jinja2 模板引擎，支持模板继承和宏定义。
