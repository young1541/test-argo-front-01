# Step 1: Build React app
#FROM node:22-alpine AS build
#WORKDIR /app
#COPY package.json package-lock.json ./
#RUN npm install
# . 현재 디렉터리(ex07플젝) . /app에 복사
#COPY . .
#RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine
#COPY --from=build /app/build /usr/share/nginx/html
COPY build /user/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]