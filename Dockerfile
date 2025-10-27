# 使用更可靠的镜像源
FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 配置npm镜像源
RUN npm config set registry https://registry.npmmirror.com

# 安装pnpm
RUN npm install -g pnpm

# 配置pnpm镜像源
RUN pnpm config set registry https://registry.npmmirror.com

# 复制package.json
COPY package.json ./

# 安装依赖
RUN pnpm install --no-frozen-lockfile

# 复制源代码
COPY . .

# 生成静态文件
RUN pnpm run build

# 检查生成的文件
RUN ls -la /app/public

# 使用更可靠的nginx镜像
FROM nginx:alpine

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建的静态文件
COPY --from=0 /app/public /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
