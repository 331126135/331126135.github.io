---
title: Linux 系统管理常用命令
date: 2023-12-31 17:25:00
categories:
  - 系统管理
  - Linux
tags:
  - Linux
  - 系统管理
  - 命令行
  - 服务器运维
  - 操作系统
cover: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# Linux 系统管理常用命令

Linux 系统管理是服务器运维的基础，掌握常用命令对系统管理至关重要。

## 文件系统操作

### 文件和目录操作

```bash
# 列出文件
ls -la

# 创建目录
mkdir -p /path/to/directory

# 复制文件
cp source.txt destination.txt

# 移动文件
mv oldname.txt newname.txt

# 删除文件
rm -rf directory/
```

### 文件权限

```bash
# 修改权限
chmod 755 file.txt

# 修改所有者
chown user:group file.txt

# 递归修改
chmod -R 755 directory/
```

## 系统监控

### 进程管理

```bash
# 查看进程
ps aux

# 实时监控
top
htop

# 杀死进程
kill -9 PID

# 查找进程
ps aux | grep nginx
```

### 系统资源

```bash
# 查看内存使用
free -h

# 查看磁盘使用
df -h

# 查看磁盘 I/O
iostat -x 1

# 查看网络连接
netstat -tulpn
```

## 网络管理

```bash
# 查看网络接口
ip addr show

# 测试网络连通性
ping google.com

# 查看路由表
ip route show

# 查看端口占用
netstat -tulpn | grep :80
```

## 日志管理

```bash
# 查看系统日志
journalctl -f

# 查看特定服务日志
journalctl -u nginx

# 查看日志文件
tail -f /var/log/syslog

# 搜索日志
grep "error" /var/log/syslog
```
