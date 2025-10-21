---
title: Kubernetes 集群管理实战
date: 2024-01-05 14:20:00
categories:
  - DevOps
  - Kubernetes
tags:
  - Kubernetes
  - 容器编排
  - DevOps
  - 微服务
  - 云原生
cover: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Kubernetes 集群管理实战

Kubernetes 是容器编排的事实标准，掌握 Kubernetes 对现代应用部署至关重要。

## Kubernetes 基础概念

### Pod

Pod 是 Kubernetes 的最小部署单元，通常包含一个或多个容器。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: my-container
    image: nginx:1.20
    ports:
    - containerPort: 80
```

### Deployment

Deployment 管理 Pod 的副本，提供滚动更新和回滚功能。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-container
        image: nginx:1.20
```

### Service

Service 提供稳定的网络访问入口。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 80
  type: LoadBalancer
```

## 常用命令

```bash
# 查看 Pod
kubectl get pods

# 查看服务
kubectl get services

# 查看部署
kubectl get deployments

# 应用配置
kubectl apply -f deployment.yaml

# 查看日志
kubectl logs <pod-name>
```
