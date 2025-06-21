use [data_health_web]
delete from [dbo].[functional_food];
DBCC checkident ('[dbo].[functional_food]', reseed, 0);
--select * from [dbo].[functional_food_type]
insert into [dbo].[functional_food](NameFood, ImageFood, Benefit, Instructions, Alert, TypeID, PriceFoods, Rating, Sold, Discount)
values	(
N'TPBVSK Special Kid Multivitamines - Hỗ trợ tăng cường thể lực và sức khỏe cho trẻ [Nhập khẩu Pháp]', 
N'https://product.hstatic.net/200000201079/product/at-tang-cuong-de-khang-chinh-hang-eric-favre-nhap-khau-phap-naviphar-1_a28e9583151a40cd963f74859b96e1a9_master.jpg',
N'- Giúp bổ sung các vitamin và khoáng chất cần thiết cho cơ thể.
- Hỗ trợ nâng cao sức khỏe. 
- Giúp tăng cường sức đề kháng.',
N'- Trẻ dưới 24 tháng tuổi: Sử dụng theo sự hướng dẫn của Bác sỹ.
- Trẻ dưới 5 tuổi: Uống 5ml (1 thìa cà phê) mỗi ngày vào buổi sáng.
- Trẻ trên 5 tuổi: Uống 10ml (2 thìa cà phê) mỗi ngày vào buổi sáng.',
N'- Lắc kỹ trước khi dùng. Có thể uống trực tiếp hoặc pha loãng với nước hay nước giải khát khác.
- Khuyến cáo: Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.',
3, 259000, 5, 2.3, 10),

(N'Nước hồng sâm trẻ em hươu cao cổ Bio chính hãng hộp 30 gói', 
N'https://product.hstatic.net/200000751371/product/uoc-hong-sam-huou-cao-co-bio-han-quoc-cho-tre-em-hop-20ml-x-30-goi-002_caf18112fe034691bd828dd1ca8b5308_grande.jpg',
N'- Phát triển được hệ xương chắc khỏe hơn từ đó trẻ sẽ cao hơn với những bạn cùng trang lứa rất nhiều
- Tăng khả năng hấp thụ được tối đa các dưỡng chất có trong hồng sâm và thúc đẩy hệ tiêu hóa trẻ hoạt động tốt nên sẽ hạn chế được tình trạng táo bón ở trẻ.
- Giảm mụn nhọt,hạn chế táo bón và giúp gan đào thải hết các chất độc ra khỏi cơ thể cũng như thanh nhiệt từ đó giúp cho trẻ không còn bị nóng trong người.
- Tăng cường khả năng vận động và giúp trẻ nhanh nhẹn hơn. Đồng thời giúp trẻ giảm được sự mệt mỏi, tăng khả năng tập trung nên sẽ giúp trẻ đạt được hiệu quả cao trong học tập.',
N'### Đối tượng sử dụng:
- Trẻ cần phát triển thể chất và trí não, trẻ có sức khoẻ yếu, trẻ cần hồi phục sau quá trình điều trị một căn bệnh nào đó.
- Trẻ biếng ăn, khó ngủ, lười vận động.
- Trẻ bị còi xương, chậm lớn, kém phát triển.
- Trẻ hay thụ động, trí não phát triển kém.
- Trẻ thường xuyên ốm vặt, suy dinh dưỡng.

### Cách sử dụng:
- Đối với trẻ lớn: Ngày uống 1 - 2 gói, uống trực tiếp. Mùa lạnh trước khi dùng có thể ngâm gói vào nước ấm để tránh bé uống bị viêm họng
- Đối với trẻ nhỏ lớn hơn 1 tuổi: Ngày dùng 1 gói Hồng sâm baby Hàn Quốc hươu cao cổ. Nếu trẻ khó uống thì 1 gói chia 2 lần, uống trực tiếp hoặc hòa với sữa cho bé uống. Phần chưa dùng bảo quản trong tủ lạnh, tuy nhiên không nên để quá lâu.',
N'Sản phẩm không phải là thuốc và không thể thay thế cho thuốc chữa bệnh, mức độ hiệu quả tùy thuộc vào cơ địa của mỗi người.',
3, 1200000, 5, 1.1, 10),

(N'Men vi sinh IMIALE cho trẻ đi ngoài phân sống, phân lỏng, trẻ sôi bụng, đi ngoài có mùi chua, có bọt', 
N'https://down-vn.img.susercontent.com/file/sg-11134201-22100-3gfxyvi937ivda.webp',
N'- Imiale bổ sung lợi khuẩn sống- gắn đích Bifidobacterium BB-12 thuộc lợi khuẩn quan trọng nhất đường tiêu hóa bé, 90% lợi khuẩn đường ruột là Bifidobacterium
- Bifidobacterium BB-12 giúp thiết lập hệ vi sinh cân bằng, phục hồi chức năng tiêu hóa trơn tru, bé hết các rối loạn đi ngoài phân sống, phân lỏng
-  Ngoài ra, Bifidobacterium BB-12 tạo lớp hàng rào bảo vệ vững chắc cho đường ruột bé, dự phòng các vấn đề rối loạn tiêu hóa, bé ăn ngon, hấp thu tốt, tăng cường đề kháng ',
N'- Dùng 6 giọt x 1 lần/ngày. Lắc mạnh lọ trước khi dùng trong khoảng 5 - 10 giây. Để tạo giọt, lật ngược lọ xuống và nghiêng một góc 45 độ.
- Có thể bổ sung Imiale cho trẻ ngay sau khi sinh
- Nếu trẻ đang trong thời gian điều trị kháng sinh, bổ sung Imiale trước hoặc sau khi sử dụng kháng sinh, ít nhất 2-3 giờ.',
N'Bảo quản:  Đậy nắp kỹ sau khi sử dụng, bảo quản nơi thoáng mát <30 độ C',
3, 390000, 5, 1, 15),

(N'Hoạt Huyết Thông Mạch TW3 – Hỗ trợ hoạt huyết thông mạch, tăng cường sức khỏe tim mạch', 
N'https://japans.vn/wp-content/uploads/2024/11/hoat-huyet-thong-mach-tw3-ava.jpg', 
N'- Việc sử dụng Hoạt Huyết Thông Mạch TW3 mang lại nhiều lợi ích rõ ràng. Đầu tiên, sản phẩm giúp giảm nguy cơ hình thành cục máu đông, nhờ vào khả năng hỗ trợ hoạt huyết hiệu quả. Bên cạnh đó, nó còn cải thiện tuần hoàn máu não, giúp tăng cường trí nhớ và giảm thiểu triệu chứng đau đầu, mất ngủ.
- Sản phẩm còn đặc biệt hữu ích cho những người đã từng gặp phải tai biến mạch máu não. Sử dụng đều đặn viên uống này có thể giúp hồi phục nhanh chóng hơn sau khi bị tai biến, đồng thời ngăn ngừa tái phát.

### Tăng cường lưu thông máu
- Một trong những công dụng nổi bật của Hoạt Huyết Thông Mạch TW3 chính là tăng cường lưu thông máu. Điều này không chỉ giúp cung cấp oxy và dưỡng chất cho các tế bào mà còn giúp thải loại độc tố ra khỏi cơ thể.
- Người sử dụng sản phẩm sẽ cảm thấy cơ thể nhẹ nhàng hơn, tinh thần thoải mái hơn nhờ vào việc lưu thông máu hiệu quả.

### Cải thiện chức năng não bộ
- Với khả năng cải thiện tuần hoàn máu não, viên uống này giúp tăng cường chức năng não bộ một cách rõ rệt. Bạn sẽ thấy mình có thể tập trung tốt hơn, trí nhớ cũng được cải thiện đáng kể. Đây là một lợi ích lớn đối với những ai thường xuyên làm việc căng thẳng hay cần tư duy liên tục.

### Giảm thiểu triệu chứng khó chịu
- Việc sử dụng Hoạt Huyết Thông Mạch TW3 không chỉ giúp cải thiện hệ tuần hoàn mà còn giúp giảm thiểu các triệu chứng khó chịu như đau đầu, hoa mắt, chóng mặt. Những triệu chứng này thường xuất hiện khi cơ thể gặp vấn đề về tuần hoàn máu, và sản phẩm này chính là cứu tinh cho bạn.', 
N'## Cách sử dụng đúng cách
- Theo hướng dẫn, bạn nên uống Hoạt Huyết Thông Mạch TW3 2 lần mỗi ngày, mỗi lần 2 viên. Nên uống trước bữa ăn khoảng 30 phút hoặc sau bữa ăn khoảng 1 giờ để cơ thể dễ dàng hấp thụ các thành phần dinh dưỡng.

### Liều lượng khuyến nghị
- Liều lượng sử dụng được khuyến nghị là rất quan trọng, bởi vì nếu bạn sử dụng quá mức có thể dẫn đến các tác dụng phụ không mong muốn. Luôn tuân thủ đúng hướng dẫn của nhà sản xuất để sản phẩm luôn an toàn và hiệu quả.', 
N'### Lưu ý khi sử dụng
- Người mẫn cảm với bất kỳ thành phần nào của sản phẩm, trẻ em dưới 12 tuổi, phụ nữ có thai hay cho con bú nên tham khảo ý kiến bác sĩ trước khi sử dụng Hoạt Huyết Thông Mạch TW3. Đồng thời, những người đang gặp vấn đề về máu chậm đông cũng nên tránh xa sản phẩm này.', 
1, 180000, 4.5, 2.1, 28),

(N'An cung bổ não hộp gỗ Samsung 60 viên Hàn Quốc', 
N'https://hueminhkorea.com/wp-content/uploads/2021/12/an-cung-ho-go-60-vien-han-quoc-13.jpg', 
N'- Hỗ trợ bổ nguyên khí, hoạt huyết thông mạch, ổn định huyết áp, ngăn ngừa nguy cơ đột quỵ do bệnh tim mạch.
- Hỗ trợ điều trị di chứng tai biến mạch máu não, thiểu năng tuần hoàn não, rối loạn tiền đình, suy giảm trí nhớ.
- Hỗ trợ phục hồi sức khoẻ toàn diện cho người bị suy nhược thần kinh vì áp lực công việc, lao động trí óc cường độ cao và đối mặt với những biến cố trong cuộc sống.
- Hỗ trợ ngăn ngừa hiện tượng chảy máu não, xuất huyết não phục hồi hệ thần kinh chức năng cho những mới bị và những người đã bị tai biến mạch máu não lâu ngày.
- Hỗ trợ phòng ngừa đột quỵ

### Đối tượng sử dụng 
- Người bị cao huyết áp, biến chứng do tai biến mạch máu não như: đờm ứ trệ gây khó thở, tê liệt cơ mặt, rối loạn ngôn ngữ.
- Người tim đập nhanh, rối loạn thần kinh thực vật.
- Người bị rối loạn tiền đình, suy giảm trí nhớ.
- Người cao tuổi hoặc người làm việc trí óc căng thẳng.
- Người ốm yếu, sức khoẻ suy giảm.', 
N'### 1. Dùng trong trường hợp căng thẳng, mệt mỏi, đau đầu, tiền đình:
- Đối với người dưới 50 tuổi : 3 ngày uống 1 viên, sử dụng thêm 1 viên khi cần
- Đối với người trên 50 tuổi: uống liên tục 10 ngày mỗi ngày 1 viên, rồi nghỉ 1 tuần. Lặp lại theo chu kỳ tiếp theo.

### 2. Hỗ trợ điều trị tai biến: ngày 1 viên uống liên tục hàng ngày.

### 3. Hỗ trợ ổn định huyết áp, người già trí nhớ suy giảm, phòng ngừa tai biến: uống ngày 1 viên', 
N'- Uống vào sau khi ăn 1 – 2h là tốt nhất
- Nên uống theo liệu trình 3 tháng / đợt. Tùy theo thể trạng mỗi người uống lặp lại sau 1 tháng hoặc sử dụng quanh năm nếu cần thiết.', 
1, 1050000, 5, 1.1, 34),

(N'Nước an cung ngưu hoàng hoàn Hàn Quốc Kwangdon', 
N'https://hueminhkorea.com/wp-content/uploads/2022/08/nuoc-an-cung-nguu-hoang-hoan-kwangdong-30-tuyp-5-768x602.jpg', 
N'- Hỗ trợ phòng chống đột quỵ, tai biến. Thúc đẩy quá trình tuần hoàn máu não.
- Hỗ trợ phục hồi sau tai biến mạch máu não, thiểu năng tuần hoàn não, suy giảm trí nhớ.
- Sản phẩm giúp điều hòa khí huyết, thông mạch, ổn định huyết áp
- Hỗ trợ hạn chế tình trạng tim đập nhanh, hồi hộp, khó thở.
- Chống đột quỵ, tai biến. Thúc đẩy quá trình tuần hoàn máu não.
- Hỗ trợ giải quyết tình trạng thiếu máu lên não, tắc động mạch
- Giảm Stress, giảm các triệu chứng thần kinh căng thẳng, mất ngủ , đau đầu
- Bồi bổ sức khỏe giúp phục hồi nhanh cho những trường hợp mới ốm dậy, những trường hợp sau khi trải qua phẫu thuật.
- Trợ tim, mạnh tim phục hồi sức khỏe cho những người suy nhược cơ thể, huyết áp không ổn định
- Tăng cường trí nhớ. Tăng sự miễn dịch trong cơ thể', 
N'Cách sử dụng để đạt hiệu quả nhất như sau:
- Dùng khi phòng bệnh: Người lớn 1 tuần uống 1 đến 2 lần. 
- Dùng khi hỗ trợ cấp cứu: Ngày 1 lần, mỗi lần 1 chai.
- Dùng để phục hồi sau tai biến: Ngày 1 lần, mỗi 1 lần 1 tuýp', 
N'- Uống khi cơ thể mệt mỏi hoa mắt chóng mặt, đau đầu, chân tay run, mắt lờ đờ mệt mỏi.
- Có triệu trứng tăng huyết áp và căng thẳng kéo dài tim đập nhanh.
- Người gặp biến cố bất ngờ ko giữ đc bình tĩnh cũng nên dùng ngay 1 lọ', 
1, 2250000, 4.5, 2, 25),

(N'Elevit của Úc hộp 100 viên - Vitamin dành cho bà bầu', 
N'https://cityplaza.vn/Data/ResizeImage/images/velevit_ucx500x500x4.webp', 
N'Elevit - Viên tổng hợp có bổ xung iốt và các loại vitamin và khoáng chất dành cho phụ nữ chuẩn bị mang thai, đang mang thai và đang cho con bú.
- Mỗi viên Elevit  cho phụ nữ mang thai chứa:
- Vitamin B1 1,55 mg, vitamin B2, 1,8 mg, 19 mg vitamin B3; Vitamin B5 10 mg, 2,6 mg vitamin B6, vitamin B124.0 μg; Vitamin C 100 mg, Vitamin D3 12,5 μg; Vitamin E 15 mg, Vitamin H 200 μg, Folic Acid 800 μg; Canxi 125 mg, 60 mg sắt; Magnesium 100 mg, 125 mg phốt pho; đồng 1 mg; Magnanese 1 mg, 7,5 mg kẽm.
- Elevit được Bayer Úc bào chế dưới dạng viên nang,. Những phụ nữ nào có dự định mang thai, nên uống ELEVIT ít nhất 1 tháng trước khi có thai để bổ xung đầy đủ vitamin ,iốt và khoáng chất giúp cho cơ thể mẹ khỏe mạnh, giúp cho khả năng đậu thai cao và giúp cho bé tránh được các thiếu hụt và khiếm khuyết về sau.', 
N'Uống mỗi ngày 1 viên sau ăn.', 
N'Sản phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh', 
2, 960000, 4.8, 1.5, 28),

(N'ICare Mom: Viên uống bổ sung Vitamin và khoáng chất cho mẹ bầu', 
N'https://myvita.vn/cdn/shop/files/iCare-products-MOM_7cf0a2a6-798c-4257-ba26-800dfcc723fc.jpg?v=1737529247&width=800', 
N'Bổ sung vitamin và khoáng chất cần thiết giúp tăng cường sức khỏe, nâng cao sức đề kháng cho phụ nữ trước, trong và sau khi mang thai, bà mẹ đang cho con bú.', 
N'- Uống 1 viên mỗi ngày hoặc theo chỉ định của chuyên gia y tế.
- Đối tượng sử dụng: Phụ nữ trước, trong và sau khi mang thai có nhu cầu bổ sung vitamin và khoáng chất.', 
N'- Trong bao bì kín, để nơi khô thoáng, tránh ánh sáng trực tiếp, để xa tầm tay trẻ em.
- Không sử dụng cho người mẫn cảm với bất kỳ thành phần nào của thuốc.
- Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
- Thời gian sử dụng: 36 tháng kể từ ngày sản xuất.', 
2, 480000, 5, 2.2, 10),
		
(N'TPBVSK GS Mamavit prefolin DHA - hỗ trợ cung cấp vitamin, DHA cho phụ nữ mang thai', 
N'https://product.hstatic.net/200000756969/product/ava_gs_mamavit_89077d150c84444fb40f8bd4b0221c60_grande.png', 
N'Là viên uống bổ sung vitamin tổng hợp cho mẹ bầu, bổ sung omega, GS Mamavit hỗ trợ:
- Bổ sung các Vitamin, khoáng chất cần thiết và DHA giúp tăng cường sức đề kháng.
- Hỗ trợ tăng cường sức khỏe cho phụ nữ mang thai, cho con bú.', 
N'- Trước khi mang thai: Uống 1 viên nén và 1 viên nang mềm xen kẽ mỗi ngày sau bữa ăn chính và uống với nhiều nước;
- Trong thời kỳ mang thai và cho con bú: Uống 1 viên nén và 1 viên nang mềm mỗi ngày sau bữa ăn chính và uống với nhiều nước.

### Đối tượng sử dụng:
- Phụ nữ chuẩn bị mang thai.
- Phụ nữ mang thai và cho con bú.', 
N'- Sản phẩm được phát triển trên cơ sở hợp tác cùng Viện Chăm sóc bà mẹ và trẻ em Praha;
- Sản phẩm ứng dụng công nghệ MMV chỉ tan trong ruột giúp tăng khả năng hấp thu và che giấu mùi vị khó chịu, phù hợp với đối tượng phụ nữ mang thai;
- Không dùng cho người mẫn cảm với bất kỳ thành phần nào của sản phẩm;
- Không dùng cho trẻ em;
- Không dùng quá liều khuyến cáo;
- Thực phẩm này không nhằm thay thế chế độ ăn uống đa dạng;
- Sản phẩm không chứa đường, gluten và lactose.
- Thực phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.', 
2, 480000, 5, 1, 10)

