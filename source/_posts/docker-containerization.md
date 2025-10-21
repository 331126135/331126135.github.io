---
title: Docker 容器化部署实践
date: 2024-01-11 11:45:00
categories:
  - DevOps
  - 容器化
tags:
  - Docker
  - 容器化
  - 部署
  - DevOps
  - 微服务
cover: https://images.unsplash.com/photo-1605745341112-85968b19335a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Docker 容器化部署实践

Docker 是现代应用部署的重要工具，它简化了应用的打包、分发和运行过程。

## Docker 基础

Docker 使用容器技术，将应用及其依赖打包到一个可移植的容器中。

## Dockerfile 编写

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

## Docker Compose

使用 Docker Compose 可以定义和运行多容器应用。

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
```

## 最佳实践

1. 使用多阶段构建
2. 优化镜像大小
3. 合理使用缓存
4. 安全配置
