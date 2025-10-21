---
title: MySQL 数据库优化技巧
date: 2024-01-10 16:30:00
categories:
  - 数据库
  - MySQL
tags:
  - MySQL
  - 数据库优化
  - SQL
  - 性能调优
  - 索引
cover: https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# MySQL 数据库优化技巧

MySQL 数据库优化是提升应用性能的关键，涉及索引、查询优化、配置调优等多个方面。

## 索引优化

### 创建合适的索引

```sql
-- 单列索引
CREATE INDEX idx_user_email ON users(email);

-- 复合索引
CREATE INDEX idx_user_name_age ON users(name, age);

-- 唯一索引
CREATE UNIQUE INDEX idx_user_username ON users(username);
```

### 索引使用原则

1. 经常用于 WHERE 条件的列
2. 经常用于 ORDER BY 的列
3. 经常用于 JOIN 的列
4. 避免过多索引

## 查询优化

### EXPLAIN 分析

```sql
EXPLAIN SELECT * FROM users WHERE age > 18 AND city = 'Beijing';
```

### 查询优化技巧

1. 避免 SELECT *
2. 使用 LIMIT 限制结果
3. 合理使用 JOIN
4. 避免子查询嵌套过深

## 配置优化

### 关键参数

```ini
# InnoDB 缓冲池大小
innodb_buffer_pool_size = 1G

# 连接数
max_connections = 200

# 查询缓存
query_cache_size = 64M
```
