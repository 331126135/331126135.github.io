# Hexo 博客

基于 Hexo 和 Butterfly 主题的个人技术博客。

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

- 如果部署到用户页面：创建名为 `username.github.io` 的仓库
- 如果部署到项目页面：创建任意名称的仓库（如 `blog`）

### 2. 配置仓库设置

1. 进入仓库的 Settings > Pages
2. 将 Source 设置为 "GitHub Actions"
3. 保存设置

### 3. 推送代码

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/your-username/your-repository.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 推送到 main 分支
git push -u origin main
```

### 4. 配置 URL

根据部署方式修改 `_config.yml` 中的 URL 配置：

**用户页面（username.github.io）：**
```yaml
url: https://your-username.github.io
root: /
```

**项目页面（username.github.io/blog）：**
```yaml
url: https://your-username.github.io/blog
root: /blog/
```

### 5. 自动部署

推送代码后，GitHub Actions 会自动：
1. 安装依赖
2. 构建静态文件
3. 部署到 GitHub Pages

### 6. 访问网站

部署完成后，可以通过以下地址访问：
- 用户页面：`https://your-username.github.io`
- 项目页面：`https://your-username.github.io/blog`

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态文件
npm run build

# 清理缓存
npm run clean
```

## 自定义域名

如果需要使用自定义域名：

1. 在 `source/` 目录下创建 `CNAME` 文件
2. 在文件中写入你的域名（如：`example.com`）
3. 在域名服务商处配置 CNAME 记录指向 `your-username.github.io`
