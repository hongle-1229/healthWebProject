use [data_health_web]
delete from [dbo].[news]
ALTER TABLE [dbo].[news]
ALTER COLUMN NewsDescription NVARCHAR(MAX);


insert into [dbo].[news] (NewsTitle, ImageNews, NewsDescription, SourceNews, PublishAt)
values	(N'Tập thể dục giúp người cao tuổi kéo dài tuổi thọ', 
		'https://login.medlatec.vn//ImagePath/images/20221005/20221005_tap-the-duc-duong-sinh-1.jpg', 
		N'Mọi người đều đã biết tập thể dục mang lại nhiều lợi ích cho sức khoẻ, gồm cả sống thọ. Nhưng tập hàng ngày hay tập 1 - 2 ngày vào cuối tuần, cách nào tốt hơn?', 
		'https://thanhnien.vn/co-mot-cach-tap-the-duc-giup-nguoi-lon-tuoi-keo-dai-tuoi-tho-vuot-troi-185250403222628655.htm', 
		'2025-04-04'),

		(N'Chăm sóc sức khoẻ khi mang thai như thế nào cho đúng?', 
		'https://prod-cdn.pharmacity.io/blog/h6j81OZV-bau-1.jpeg', 
		N'Chăm sóc sức khoẻ khi mang thai không chỉ đảm bảo an toàn cho người phụ nữ mà còn giúp em bé được phát triển khoẻ mạnh. Một lối sống lành mạnh và tuân thủ lịch hẹn khám thai là nguyên tắc cơ bản trong chăm sóc sức khoẻ khi mang thai.', 
		'https://www.vinmec.com/vie/bai-viet/cham-soc-suc-khoe-khi-mang-thai-nhu-nao-cho-dung-vi', 
		'2022-03-04'),

		(N'Vấn đề chăm sóc sức khoẻ trẻ em và những điều cần biết', 
		'https://www.prudential.com.vn/export/sites/prudential-vn/vi/.thu-vien/hinh-anh/pulse-nhip-song-khoe/song-khoe/2022/6-cach-cham-soc-suc-khoe-cho-be-ma-cha-me-nao-cung-can-biet-1200x800-1.jpg', 
		N'Chăm sóc sức khoẻ trẻ em tưởng chừng như đơn giản nhưng lại bao gồm rất nhiều vấn đề mà các bậc cha mẹ cần lưu tâm.', 
		'https://nhathuoclongchau.com.vn/bai-viet/van-de-cham-soc-suc-khoe-tre-em-va-nhung-dieu-can-biet.html', 
		'2024-04-14'),

		(N'Lợi ích bất ngờ từ việc ăn sáng no, ăn trưa vừa phải và ăn tối sớm', 
		'https://nld.mediacdn.vn/291774122806476800/2021/12/10/pic-2-1639130323014489922134.jpg', 
		N'Hầu hết mọi người đều biết việc chúng ta ăn gì và ăn bao nhiêu đóng vai trò quan trọng đối với sức khỏe. Gần đây các nhà khoa học phát hiện ra rằng thời điểm ăn cũng có thể tạo ra sự khác biệt.', 
		'https://dantri.com.vn/suc-khoe/loi-ich-bat-ngo-tu-viec-an-sang-no-an-trua-vua-phai-va-an-toi-som-20231129211825751.htm', 
		'2023-11-30'),

		(N'"Thần dược"online: Khi mạng xã hội trở thành chợ trời thực phẩm chức năng',
		'https://images2.thanhnien.vn/528068263637045248/2025/6/3/base64-1748991110474163726910.jpeg',
		N'Thực phẩm chức năng được các "bác sĩ online" giấu mặt và người nổi tiếng quảng cáo như "thần dược", có công dụng chữa bệnh khiến người tiêu dùng hoang mang.',
		'https://thanhnien.vn/bat-nhao-tinh-trang-quang-cao-thuc-pham-chuc-nang-tren-mang-xa-hoi-185250601144604808.htm',
		'2025-06-04')