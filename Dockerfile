# # Docker npm run build
# # Stage 1: build Vue project
# FROM node:18-alpine AS build

# WORKDIR /app

# # copy package files
# COPY package*.json ./

# # install dependencies
# RUN npm install

# # copy source code
# COPY . .

# # build project
# RUN npm run build


# # Stage 2: run with nginx
# FROM nginx:alpine

# # copy nginx config (optional แต่แนะนำ)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # copy dist ไป nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# # Docker npm run serve
# # ใช้ Node image
# FROM node:18-alpine

# # ตั้ง working directory
# WORKDIR /app

# # copy package.json และ package-lock.json
# COPY package*.json ./

# # ติดตั้ง dependencies
# RUN npm install

# # copy source code ทั้งหมด
# COPY . .

# # expose port dev server ของ Vue (default 5173 หรือ 8080 ขึ้นกับ Vue CLI)
# EXPOSE 8080

# # รัน dev server
# CMD ["npm", "run", "serve"]



# # Docker npm run serve + volume
# # Dockerfile for Vue Dev Server
# FROM node:18-alpine

# WORKDIR /app

# # Copy package files (only) เพื่อใช้ cache layer
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy all source code
# COPY . .
      
# # Expose Vue dev server port
# EXPOSE 8080

# # Run dev server
# CMD ["npm", "run", "serve"]




# # Docker Compose :  Dockerfile
# # Dockerfile
# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# EXPOSE 8080

# CMD ["npm", "run", "serve"]




# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# EXPOSE 8080

# CMD ["npm", "run", "serve"]



FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "serve"]