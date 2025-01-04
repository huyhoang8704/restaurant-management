FROM node:16

# Tạo user
RUN useradd -m user

WORKDIR /app

# Gán quyền cho user
RUN chown -R user:user /app

# Chuyển sang người dùng 'user'
USER user

COPY package.json .

RUN npm install
RUN npm i nodemon --save-dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]