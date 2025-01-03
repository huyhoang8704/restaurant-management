# Sử dụng Node.js phiên bản 16 làm base image
FROM node:16

# Đặt thư mục làm việc mặc định
WORKDIR /app

# Sao chép file package.json để cài đặt dependencies trước
COPY package.json .

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép toàn bộ mã nguồn ứng dụng
COPY . .

# Khai báo cổng ứng dụng
EXPOSE 3000

ENV NODE_ENV production

# Chỉ định lệnh để khởi chạy ứng dụng
CMD ["node", "server.js"]
