## Description
Những năm gần đây, thị trường đã chứng kiến sự phát triển vượt bậc của ngành F&B. Một
trong những đóng góp làm thay đổi diện mạo ngành là ứng dụng công nghệ tiên tiến trong quá
trình quản lý và vận hành. Hiện nay, hầu hết các quán ăn, nhà hàng đều có mặt trên các ứng
dụng đặt thức ăn, bên cạnh đó một số nhà hàng cũng phát triển phần mềm phục vụ riêng cho
thương hiệu của mình. Trong dự án này, phần mềm đặt món được thiết kế hướng đến những
nhà hàng có các đặc điểm sau:

+ Mô hình nhà hàng truyền thống, đơn giá được tính theo từng món ăn (không phải nhà
hàng buffet).
+ Là một hoặc một chuỗi nhà hàng cùng thương hiệu.
+ Có quy mô vừa và nhỏ, quy trình kinh doanh phục vụ khách hàng gồm các bước đơn giản
truyền thống. Vì vậy, cũng chỉ có nhu cầu xây dựng phần mềm đơn giản với những tính
năng cơ bản.
+ Hướng đến khách hàng ở nhiều độ tuổi với mức độ thông thạo công nghệ khác nhau.
+ Cho phép thực khách có thể đặt bàn trước.
+ Cho phép thực khách dùng tại chỗ hoặc mua mang đi.
+ Cho phép thực khách dùng đặt món mang về nhà.
Từ những đặc điểm vừa xác định, có thể nhận thấy ta cần thiết kế một phần mềm đơn giản,
dễ sử dụng, tập trung vào tốc độ và độ ổn định thay vì những chức năng phức tạp.
1.1.2 Tính năng dự kiến
Để đáp ứng nhu cầu cho từng đối tượng sử dụng, dự kiến phần mềm này sẽ:
+ Sở hữu giao diện truyền thống.
+ Có chức năng quét mã QR, từ mã QR xác định được vị trí (số hiệu) bàn.
+ Hiển thị thực đơn, bao gồm giá, hình ảnh sản phẩm và mô tả sản phẩm.
+ Hiển thị thời gian gọi món và thời gian dự kiến hoàn thành trên mỗi đơn hàng.



## Installation

```bash
git clone https://github.com/huyhoang8704/restaurant-management.git
```

Create environment file `.env`

```bash
MONGO_URL = abc
PORT = 3000

JWT_SECRET=abc

CLOUDINARY_NAME=abc
CLOUDINARY_KEY=abc
CLOUDINARY_SECRET=abc

PAYOS_CLIENT_ID =abc
PAYOS_API_KEY =abc
PAYOS_CHECKSUM_KEY =abc
```
Run: Ensure that you installed Docker and docker-compose

```bash
docker-compose up -d
```



## Relevant resources
Demo: https://www.youtube.com/watch?v=W1ulZEtGjZk

FrontEnd: https://github.com/duyquy321323/restaurant4.0/tree/merge2

API Documentation: https://app.swaggerhub.com/apis/HoangNguyen-a30/restaurant-management/1.0.0







