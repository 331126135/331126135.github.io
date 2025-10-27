---
title: Ubuntu中Docker镜像下载失败问题解决方案
date: 2025-01-24 12:00:00
updated: 2025-01-24 12:00:00
categories: 
  - DevOps
  - Docker
tags:
  - Docker
  - Ubuntu
  - 镜像源
description: Ubuntu系统中Docker镜像下载失败的解决方案，通过配置国内镜像源快速解决问题。
keywords: Docker,Ubuntu,镜像源,网络问题
comments: true
toc: true
copyright: true
---

# Ubuntu中Docker镜像下载失败问题解决方案

## 问题现象

在Ubuntu系统中使用Docker时，经常会遇到以下错误：

```bash
Error response from daemon: Get "https://registry-1.docker.io/v2/": net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## 问题原因

- Docker Hub服务器位于海外，国内访问速度慢
- 网络不稳定导致连接超时
- DNS解析问题

## 解决方案

### 配置Docker镜像源

1. **创建Docker配置目录**
```bash
sudo mkdir -p /etc/docker
```

2. **配置镜像源**
```bash
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev",
    "https://proxy.1panel.live",
    "https://docker.1panel.top",
    "https://docker.m.daocloud.io",
    "https://docker.1ms.run",
    "https://docker.ketches.cn"
  ]
}
EOF
```

3. **重启Docker服务**
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

4. **验证配置**
```bash
docker info | grep -A 10 "Registry Mirrors"
docker pull hello-world
```

## 其他解决方案

### 使用阿里云镜像源
```bash
sudo tee /etc/docker/daemon.json <<EOF
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com"
  ]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 配置DNS
```bash
echo "nameserver 8.8.8.8" | sudo tee -a /etc/resolv.conf
echo "nameserver 8.8.4.4" | sudo tee -a /etc/resolv.conf
```

## 故障排除

如果配置后仍有问题，可以尝试：

```bash
# 清理Docker缓存
docker system prune -a -f

# 检查防火墙
sudo ufw status

# 查看Docker日志
sudo journalctl -u docker.service
```

通过以上配置，Docker镜像下载问题应该得到解决。
