USE [data_health_web]

DBCC CHECKIDENT ('[dbo].[body_part]', RESEED, 0)

select * from [dbo].[body_part];

ALTER TABLE [dbo].[symptom]
ALTER COLUMN [SymptomDescription] NVARCHAR(MAX) NOT NULL;


delete from [dbo].[body_part];

-- users
INSERT INTO Users (ImageUser, UserName, Email, FullName, PhoneNumber, PassWordUser, RoleUser, CreateAt)
VALUES 
(NULL, 'hongle', 'hongle1229@gmail.com', N'Hoàng Thị Hồng Lê', '0365385143', 'hongle1229', 'admin', DEFAULT),
(NULL, 'tranthib', 'tranthib@example.com', N'Trần Thị B', '0912345678', 'baomat456', 'user', DEFAULT),
(NULL, 'phamvanduc', 'phamvanduc@example.com', N'Phạm Văn Đức', '0909090909', '12345678', 'user', DEFAULT),
(NULL, 'lethimy', 'lethimy@example.com', N'Lê Thị My', '0999888777', 'matkhau789', 'user', DEFAULT),
(NULL, 'hoangminh', 'hoangminh@example.com', N'Hoàng Minh', '0933222111', 'vietpass999', 'user', DEFAULT),
(NULL, 'dangquocbao', 'dangquocbao@example.com', N'Đặng Quốc Bảo', '0977777777', 'adminpass', 'expert', DEFAULT),
(NULL, 'phamhongnhung', 'phamhongnhung@example.com', N'Phạm Hồng Nhung', '0966666666', 'nhungyeu123', 'user', DEFAULT),
(NULL, 'nguyenthithuy', 'nguyenthithuy@example.com', N'Nguyễn Thị Thùy', '0955555555', 'thuymatkhau', 'user', DEFAULT),
(NULL, 'tranduynam', 'tranduynam@example.com', N'Trần Duy Nam', '0944444444', 'nam789123', 'user', DEFAULT),
(NULL, 'buiduchanh', 'buiduchanh@example.com', N'Bùi Đức Hạnh', '0933333333', 'hanhphuc123', 'user', DEFAULT);

-- disease
INSERT INTO disease (DiseaseName)  
VALUES  
(N'Cảm lạnh'),  
(N'Cúm mùa'),  
(N'Viêm họng'),  
(N'Viêm mũi dị ứng'),  
(N'Viêm xoang'),  
(N'Đau dạ dày'),  
(N'Rối loạn tiêu hóa'),  
(N'Táo bón'),  
(N'Tiêu chảy'),  
(N'Đau đầu căng thẳng'),  
(N'Chóng mặt'),  
(N'Viêm da dị ứng'),  
(N'Mề đay'),  
(N'Nấm da'),  
(N'Hắc lào'),  
(N'Lang ben'),  
(N'Ghẻ'),  
(N'Nổi mụn trứng cá'),  
(N'Viêm nang lông'),  
(N'Bỏng nhẹ');  

-- symptom
INSERT INTO symptom (SymptomName, SymptomDescription)  
VALUES  
(N'Đau đầu', N'Cảm giác đau nhói hoặc âm ỉ ở đầu, có thể đi kèm với chóng mặt hoặc buồn nôn.'),  
(N'Đau nửa đầu', N'Cơn đau dữ dội một bên đầu, có thể kèm theo nhạy cảm với ánh sáng và âm thanh.'),  
(N'Đau bụng', N'Cảm giác khó chịu, đau rát hoặc co thắt ở vùng bụng, có thể do rối loạn tiêu hóa.'),  
(N'Đau dạ dày', N'Cảm giác nóng rát hoặc đau âm ỉ ở vùng thượng vị, có thể liên quan đến viêm loét dạ dày.'),  
(N'Đau lưng', N'Cảm giác căng cứng hoặc đau nhức vùng lưng, có thể do tư thế sai hoặc căng cơ.'),  
(N'Đau cổ', N'Đau hoặc căng cứng ở vùng cổ, có thể do ngồi lâu hoặc vận động sai tư thế.'),  
(N'Đau vai', N'Đau nhức hoặc khó cử động ở vai, có thể liên quan đến viêm khớp hoặc căng cơ.'),  
(N'Đau khớp', N'Cảm giác đau và sưng ở khớp, có thể liên quan đến viêm khớp hoặc chấn thương.'),  
(N'Đau cơ', N'Cảm giác đau nhức hoặc mỏi cơ, thường gặp sau khi vận động quá sức.'),  
(N'Đau họng', N'Cảm giác đau rát và khó chịu ở cổ họng, có thể kèm theo khàn tiếng hoặc ho.'),  
(N'Đau răng', N'Cảm giác đau nhức ở răng do sâu răng, viêm nướu hoặc các vấn đề nha khoa khác.'),  
(N'Đau tai', N'Cảm giác đau nhói hoặc âm ỉ trong tai, có thể do viêm tai giữa hoặc nhiễm trùng.'),  
(N'Đau mắt', N'Cảm giác đau nhức, mỏi mắt hoặc khô mắt, thường do căng thẳng hoặc tiếp xúc với màn hình lâu.'),  
(N'Sốt', N'Thân nhiệt cao hơn bình thường, có thể đi kèm với ớn lạnh và mệt mỏi.'),  
(N'Ho', N'Phản xạ ho liên tục, có thể khan hoặc có đờm, do nhiễm trùng hoặc kích ứng đường hô hấp.'),  
(N'Khó thở', N'Cảm giác hụt hơi, thở gấp hoặc tức ngực, có thể liên quan đến bệnh phổi hoặc tim.'),  
(N'Buồn nôn', N'Cảm giác khó chịu ở dạ dày, có thể kèm theo nôn mửa.'),  
(N'Mệt mỏi', N'Cảm giác kiệt sức, uể oải dù không hoạt động nhiều.'),  
(N'Chóng mặt', N'Cảm giác quay cuồng, mất thăng bằng, có thể liên quan đến huyết áp thấp hoặc thiếu máu.'),  
(N'Nổi mẩn đỏ', N'Các nốt đỏ xuất hiện trên da, có thể gây ngứa hoặc không.'),  
(N'Sưng viêm', N'Vùng da hoặc khớp bị sưng đỏ, nóng và đau, có thể do nhiễm trùng hoặc chấn thương.'),  
(N'Phát ban', N'Các mảng da đỏ hoặc bong tróc, có thể do dị ứng hoặc bệnh ngoài da.'),  
(N'Ngứa', N'Cảm giác kích ứng trên da, có thể do dị ứng, côn trùng cắn hoặc bệnh ngoài da.'),  
(N'Chảy máu cam', N'Máu chảy ra từ mũi, thường do khô mũi hoặc chấn thương nhẹ.'),  
(N'Khô mắt', N'Cảm giác cộm, khô và khó chịu ở mắt, thường do tiếp xúc với màn hình hoặc môi trường khô.'),  
(N'Tê tay chân', N'Cảm giác tê rần hoặc châm chích ở tay, chân, có thể do thiếu máu hoặc chèn ép dây thần kinh.');  

-- body_part
INSERT INTO body_part (PartName)  
VALUES  
(N'Đầu'),  
(N'Trán'),  
(N'Mắt'),  
(N'Mũi'),  
(N'Miệng'),  
(N'Tai'),  
(N'Cổ'),  
(N'Vai'),  
(N'Ngực'),  
(N'Bụng'),  
(N'Lưng'),  
(N'Eo'),  
(N'Cánh tay'),  
(N'Khuỷu tay'),  
(N'Cổ tay'),  
(N'Bàn tay'),  
(N'Ngón tay'),  
(N'Hông'),  
(N'Mông'),  
(N'Đùi'),  
(N'Đầu gối'),  
(N'Cẳng chân'),  
(N'Mắt cá chân'),  
(N'Bàn chân'),  
(N'Ngón chân');  


select * from body_part;