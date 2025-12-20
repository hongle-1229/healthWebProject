# Vietmed Health Support Web Application

## 1. Giới thiệu
Dự án là một website hỗ trợ y tế, cung cấp các chức năng:
- Tra cứu sơ cứu nhanh
- Tra cứu thực phẩm chức năng
- Tra cứu triệu chứng sử dụng AI để phân tích
- Tin tức & cộng đồng
- Quản lý tài khoản người dùng
- Lưu lịch sử tra cứu và làm bài kiểm tra

Dự án được xây dựng phục vụ mục đích đồ án tốt nghiệp.

---

## 2. Công nghệ sử dụng

### Front-end
- ReactJS
- Ant Design
- Three.js (mô phỏng 3D)
- HTML, CSS, JavaScript

### Back-end
- Node.js
- ExpressJS

### Database
- Microsoft SQL Server
### AI
- Thuật toán Naive Bayes
- Python
---

## 3. Cấu trúc thư mục chính

- back_end: chứa toàn bộ mã nguồn phía máy chủ của hệ thống VietMed, được xây dựng theo mô hình phân tách rõ ràng giữa cấu hình, dữ liệu và các tuyến xử lý API

- src: chứa toàn bộ mã nguồn giao diện người dùng của hệ thống VietMed, được xây dựng bằng React và tổ chức theo từng chức năng

- train_model: chứa mã nguồn và dữ liệu phục vụ huấn luyện mô hình AI cho chức năng phân tích triệu chứng và tư vấn bệnh lý



---

## 4. Hướng dẫn cài đặt & chạy dự án

### 4.1. Database

1. Mở SQL Server Management Studio
2. Chạy lần lượt các file theo đúng thứ tự:

-- 1. Tạo database
create_database.sql

-- 2. Tạo bảng và các ràng buộc
create_table.sql

-- 3. Dữ liệu mẫu để demo
data.sql


### 4.2. Back_end
- Cấu hình kết nối DB: connect_sql.js
- chỉnh sửa cấu hình .env
- lệnh chạy back_end: cd back_end -> node index.js
### 4.3. front_end
- npm run dev
### 4.4. training AI
- cd train_model -> python trainmodel.py -> python main.py