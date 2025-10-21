---
title: MongoDB 聚合管道详解
date: 2024-01-04 11:10:00
categories:
  - 数据库
  - MongoDB
tags:
  - MongoDB
  - NoSQL
  - 聚合管道
  - 数据查询
  - 数据库操作
cover: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
---

# MongoDB 聚合管道详解

MongoDB 的聚合管道是一个强大的数据处理工具，可以对文档进行复杂的转换和分析。

## 聚合管道基础

聚合管道由多个阶段组成，每个阶段对文档进行特定的操作。

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

## 常用操作符

### $match

用于过滤文档，类似于 SQL 的 WHERE 子句。

```javascript
{ $match: { age: { $gte: 18 }, city: "Beijing" } }
```

### $group

用于分组和聚合计算。

```javascript
{
  $group: {
    _id: "$category",
    count: { $sum: 1 },
    avgPrice: { $avg: "$price" },
    maxPrice: { $max: "$price" }
  }
}
```

### $project

用于选择或重命名字段。

```javascript
{
  $project: {
    name: 1,
    email: 1,
    fullName: { $concat: ["$firstName", " ", "$lastName"] }
  }
}
```

### $lookup

用于关联查询，类似于 SQL 的 JOIN。

```javascript
{
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "userInfo"
  }
}
```

## 性能优化

1. 合理使用索引
2. 减少数据传输量
3. 优化管道顺序
4. 使用 explain() 分析性能
