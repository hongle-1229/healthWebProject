use [data_health_web]
delete from [dbo].[first_aid_cases];
DBCC CHECKIDENT ('[dbo].[first_aid_cases]', RESEED, 0);

select * from [dbo].[first_aid_cases];

ALTER TABLE [dbo].[first_aid_cases]
ADD ImageFirstAid NVARCHAR(MAX)

-- 1. Thêm các cột mới tạm thời
ALTER TABLE [dbo].[first_aid_cases] ADD FirstAidDescription_tmp NVARCHAR(MAX);
ALTER TABLE [dbo].[first_aid_cases] ADD CommonMistake_tmp NVARCHAR(MAX);

-- 2. Sao chép dữ liệu từ cột cũ sang cột mới
UPDATE [dbo].[first_aid_cases]
SET 
    FirstAidDescription_tmp = CAST(FirstAidDescription AS NVARCHAR(MAX)),
    CommonMistake_tmp = CAST(CommonMistake AS NVARCHAR(MAX));

-- 3. Xoá các cột cũ kiểu TEXT
ALTER TABLE [dbo].[first_aid_cases] DROP COLUMN FirstAidDescription;
ALTER TABLE [dbo].[first_aid_cases] DROP COLUMN CommonMistake;

-- 4. Đổi tên cột mới thành tên cột cũ
EXEC sp_rename 'dbo.first_aid_cases.FirstAidDescription_tmp', 'FirstAidDescription', 'COLUMN';
EXEC sp_rename 'dbo.first_aid_cases.CommonMistake_tmp', 'CommonMistake', 'COLUMN';



UPDATE  [dbo].[first_aid_cases]
SET 
    CommonMistake = REPLACE(
        REPLACE(
            REPLACE(
                REPLACE(
                    REPLACE(CommonMistake, '''', ''), -- Xóa dấu '
                    '\t', ''                          -- Xóa tab
                ),
                '\r\n', CHAR(13) + CHAR(10)           -- Xuống dòng thực
            ),
            '  ', ' '                                 -- Xóa 2 space
        ),
        '+', ''                                       -- Xóa dấu +
    );


insert into [dbo].[first_aid_cases] (Title,ImageFirstAid, FirstAidDescription, VideoURL, CommonMistake)
values (
N'Nghẹt thở', 
N'https://www.vinmec.com/static/uploads/20201010_070433_858367_Untitled_max_1800x1800_png_9cefb40198.png, https://nhathuocngocanh.com/wp-content/uploads/2023/06/Hinh-1.-Dau-hieu-nghet-tho-pho-bien.jpg',
N'# Dấu hiệu của nghẹt thở: 
- Dấu hiệu phổ biến khi bị nghẹt thở là bàn tay nắm chặt vào cổ họng. Nếu người đó không có triệu chứng rõ rệt nào, hãy tìm những dấu hiệu có thể sau: 
- Không có khả năng nói chuyện. 
- Khó thở hoặc thở ồn ào. 
- Tiếng kêu khó chịu khi cố gắng thở. 
- Ho, có thể yếu hoặc mạnh. 
- Da, môi và móng chuyển sang màu xanh hoặc sẫm. 
- Da bị đỏ ửng, sau đó chuyển sang màu nhợt nhạt hoặc hơi xanh. 
- Mất ý thức 

# Cách sơ cứu: 
- Nếu người đó có thể ho mạnh, người đó nên tiếp tục ho. Nếu người đó bị nghẹn và không thể nói, khóc hoặc cười mạnh mẽ, Hội Chữ thập đỏ Hoa Kỳ khuyến nghị cách tiếp cận 5 và 5 để cung cấp sơ cứu: 
- Vỗ lưng 5 lần: Đối với người lớn, đứng sang một bên và ngay phía sau. Đối với một đứa trẻ, quỳ xuống phía sau. Đặt một cánh tay ngang ngực của người đó để được hỗ trợ. Cúi người ở eo để phần thân trên song song với mặt đất. Đưa ra năm cú đánh ngược riêng biệt giữa hai bả vai của người đó bằng gót bàn tay của bạn. 
- Ép bụng 5 lần: Thực hiện năm động tác ép bụng (còn được gọi là cơ động Heimlich). 
- Thực hiện lặp lại các động tác trên: 5 lần vỗ lưng, 5 lần ép bụng cho đến khi tắc nghẽn được đánh bật. 
- Hiệp hội Tim mạch Hoa Kỳ không dạy kỹ thuật vỗ lưng, chỉ có các thủ thuật ép bụng. Không được phép sử dụng kỹ thuật vỗ lưng nếu bạn chưa học kỹ thuật này. Cả hai cách tiếp cận đều được chấp nhận. 

## Thực hiện các động tác ép bụng (cơ động Heimlich) lên người khác:
- Đứng sau người bị nạn, đặt một chân hơi trước chân kia để cân bằng. Vòng tay của bạn quanh thắt lưng. Đẩy nhẹ người về phía trước một chút. Nếu trẻ bị nghẹn, hãy quỳ xuống phía sau trẻ.
- Nắm chặt một bàn tay và đặt nó ở vị trí hơi trên rốn của nạn nhân.
- Tay còn lại ôm chặt vào nắm tay đó. Ấn mạnh và nhanh vào bụng với một lực đẩy nhanh, hướng lên như thể cố gắng nâng người lên.
- Thực hiện từ sáu đến 10 lần ép bụng cho đến khi tắc nghẽn.
- Nếu vật tắc nghẽn vẫn không bị bong ra, bạn có thể lặp lại chu kỳ 5-5. Nếu bạn là người cứu hộ duy nhất, hãy thực hiện vỗ lưng và ép bụng trước khi gọi 115 hoặc số khẩn cấp tại địa phương để được giúp đỡ. Nếu có người khác, hãy nhờ người đó gọi giúp đỡ trong khi bạn thực hiện sơ cứu.
- Nếu người bệnh bất tỉnh, thực hiện hồi sức tim phổi tiêu chuẩn (CPR) với ép ngực.

## Thực hiện các động tác ép bụng (cơ động Heimlich) lên chính mình:
- Đầu tiên, nếu bạn ở một mình và nghẹt thở, hãy gọi số khẩn cấp tại địa phương của bạn ngay lập tức. Sau đó, mặc dù bạn sẽ không thể thực hiện vỗ lưng được cho chính mình một cách hiệu quả, bạn vẫn có thể thực hiện các động tác ép bụng để đánh bật vật gây nghẹt thở.
- Đặt một nắm tay hơi trên rốn của bạn.
- Nắm chặt nắm tay của bạn bằng tay kia và gập người trên một bề mặt cứng, một mặt bàn hoặc ghế.
- Đẩy nắm đấm của bạn vào trong và hướng lên.

## Thực hiện làm thông đường hô hấp của phụ nữ mang thai hoặc người béo phì:
- Vị trí bàn tay của bạn đặt cao hơn một chút so với thao tác Heimlich bình thường, ở đáy xương ức, hoặc nơi gắn các xương sườn thấp nhất.
- Tiến hành như với thao tác Heimlich, ấn mạnh vào ngực, với một lực đẩy nhanh.
- Lặp lại cho đến khi thực phẩm hoặc dị vật gây tắc nghẽn bị đánh bật. Nếu người đó bất tỉnh, hãy làm theo các bước tiếp theo hồi sức tim phổi CPR.

### Thực hiện làm thông đường thở của một người bất tỉnh:
- Hạ người nằm ngửa xuống sàn, đặt hai tay sang một bên.
- Thông đường hô hấp: Nếu tắc nghẽn có thể nhìn thấy dị vật ở phía sau cổ họng hoặc cao trong cổ họng, hãy đưa một ngón tay vào miệng và móc dị vật ra. Đừng thử ấn ngón tay vào nếu bạn không thể nhìn thấy vật thể. Cẩn thận không sẽ đẩy thức ăn hoặc đồ vật vào sâu đường hô hấp hơn, điều này rất dễ xảy ra ở trẻ nhỏ.
- Bắt đầu CPR, hồi sức tim phổi nếu vật lạ vẫn tắc nghẽn và nạn nhân không phản ứng lại sau khi bạn thực hiện các biện pháp trên. Việc ép ngực được sử dụng trong CPR có thể đánh bật dị vật long ra. Nhớ kiểm tra lại miệng định kỳ.

## Làm thông đường thở cho trẻ sơ sinh bị nghẹn, trẻ hơn 1 tuổi:
- Giữ trẻ sơ sinh nằm sấp mặt trên cẳng tay, đặt tay nằm trên đùi của bạn. Hỗ trợ nâng đỡ đầu và cổ của bé bằng bàn tay.
- Vỗ 5 lần nhẹ nhàng năm lần vào giữa lưng trẻ bằng gót bàn tay còn lại. Sự kết hợp của trọng lực và việc vỗ lưng sẽ có thể làm cho dị vật văng ra. Giữ các ngón tay của bạn hướng lên trên để tránh đánh trẻ sơ sinh ở phía sau đầu.
- Giữ trẻ nằm ngửa trên cẳng tay của bạn và đầu thấp hơn thân nếu như việc trên không hiệu quả. Sử dụng hai ngón tay đặt ở giữa xương ức của trẻ và ép lên ngực 5 lần.
- Lặp lại việc vỗ lưng và ép ngực nếu hô hấp ở trẻ chưa phục hồi. Gọi trợ giúp y tế khẩn cấp.
- Bắt đầu hô hấp nhân tạo cho trẻ sơ sinh nếu một trong những kỹ thuật trên đã làm thông đường thở nhưng trẻ không thở được.
- Nếu trẻ lớn hơn 1 tuổi và có ý thức, chỉ nên ép bụng. Cẩn thận không sử dụng quá nhiều lực để tránh làm hỏng xương sườn hoặc các cơ quan nội tạng của trẻ.',
N'https://www.youtube.com/watch?v=SKs8EKh_3SQ',
N'# Sai lầm thường gặp:
## Cho tay hoặc vật lạ vào miệng để móc dị vật:
- Nhiều người có thói quen dùng tay hoặc thìa, đũa,..để cố móc dị vật ra khỏi miệng nạn nhân, đặc biệt là trẻ nhỏ. Hành động này rất nguy hiểm vì có thể đẩy dị vật vào sâu hơn, làm tắc nghẽn đường thở nghiêm trọng hơn hoặc gây tổn thương niêm mạc họng.
## Vuốt xuôi ngực hoặc vuốt lưng không đúng cách:
- Vuốt xuôi ngực hoặc vuốt dọc lưng là cách làm sai, có thể khiến dị vật trôi sâu hơn vào khí quản thay vì được tống ra ngoài.
- Đúng kỹ thuật là vỗ lưng (giữa hai bả vai) với lực vừa phải, hoặc thực hiện ép bụng/ép ngực đúng thao tác.
## Sử dụng mẹo dân gian như cho nuốt cơm, hoa quả, nước:
- Việc cho nạn nhân nuốt cơm, hoa quả, uống nước,..khi đang nghẹt thở có thể làm dị vật mắc sâu hơn, tăng nguy cơ tắc nghẽn hoàn toàn đường thở, thậm chí gây tử vong.
## Thực hiện ép bụng (Heimlich) sai đối tượng:
- Không được thực hiện động tác ép bụng (Heimlich) cho trẻ dưới 1 tuổi vì có thể gây tổn thương nội tạng như gan, tỳ tạng.
- Với trẻ sơ sinh, cần dùng kỹ thuật vỗ lưng và ép ngực bằng hai ngón tay, không ép bụng.
## Không kiểm tra dị vật trước khi móc:
- Nếu không nhìn thấy dị vật trong miệng hoặc họng, tuyệt đối không đưa tay vào móc bừa vì dễ làm dị vật đi sâu hơn.
## Không gọi cấp cứu hoặc chậm gọi cấp cứu:
- Nhiều trường hợp chỉ tập trung sơ cứu mà quên gọi cấp cứu 115 hoặc nhờ người khác hỗ trợ gọi, làm mất thời gian vàng để cứu sống nạn nhân.
## Không khuyến khích nạn nhân ho khi còn có thể: 
- Nếu nạn nhân vẫn còn ho được, tuyệt đối không can thiệp mà nên động viên họ tiếp tục ho mạnh để tự tống dị vật ra ngoài.
## Thực hiện động tác không đúng kỹ thuật, quá mạnh hoặc quá nhẹ:
- Vỗ lưng, ép bụng/ngực không đúng vị trí hoặc lực không phù hợp có thể không hiệu quả hoặc gây chấn thương cho nạn nhân'),
(N'Ðột quỵ', 
N'https://suckhoedoisong.qltns.mediacdn.vn/zoom/600_315/Images/nguyenkhanh/2017/12/24/nguy-co-dot-quy-o-nguoi-tang-huyet-ap-va-cach-so-cuu1514128026.jpg, https://benhvienphuongdong.vn/public/uploads/2024/thang-3/so-cuu-dot-quy/so-cuu-dot-quy-4.jpg',
N'# Dấu hiệu của đột quỵ
- Người nhà có thể phát hiện sớm các dấu hiệu đột quỵ để kịp thời sơ cứu và chuyển người bệnh đến bệnh viện khi thấy những dấu hiệu sau:
- Mặt méo lệch: Một bên khuôn mặt có thể bị xệ xuống, miệng méo hoặc mắt không mở được.
- Yếu cơ tay chân: Người bệnh không thể nhấc một hoặc cả hai cánh tay, hoặc bị yếu, tê cứng tay chân một cách đột ngột.
- Nói khó: Khó khăn khi phát âm, nói ngọng, hoặc không hiểu lời người khác.
- Mất thăng bằng: Khó đứng vững hoặc đi lại.
- Đau đầu dữ dội: Đau đột ngột, dữ dội, không rõ nguyên nhân.
- Phương pháp nhận diện FAST (Face - Mặt, Arm - Tay, Speech - Lời nói, Time - Thời gian) là cách hiệu quả để nhận biết đột quỵ. Nếu bạn thấy người bệnh có một trong các dấu hiệu trên xuất hiện một cách đột ngột, hãy nghĩ ngay đến khả năng đột quỵ và cần sơ cứu.

# Cách sơ cứu
- Bước 1: Giữ bình tĩnh và đặt người bệnh nằm nghiêng: 
  - Giữ người bệnh nằm nghiêng để tránh nguy cơ hít phải dị vật hoặc dịch tiết vào đường thở nếu người bệnh nôn mửa. 
  - Tư thế nằm nghiêng cũng giúp giảm áp lực lên đồng thời làm thông thoáng đường thở bằng cách lau sạch đờm dãi nếu có.
- Bước 2: Gọi cấp cứu: 
  - Đây là bước quan trọng nhất trong đột quỵ tại nhà. 
  - Gọi cấp cứu ngay lập tức để đưa người bệnh đến cơ sở y tế gần nhất. 
  - Hãy báo cho nhân viên y tế biết các triệu chứng người bệnh đang gặp phải để họ có thể chuẩn bị sẵn sàng.
- Bước 3: Không để người bệnh cử động mạnh: 
  - Không nên di chuyển người bệnh quá nhiều, và đặc biệt không nên để họ tự mình đi lại. 
  - Động tác mạnh có thể khiến máu lưu thông nhanh hơn, làm tăng áp lực lên não và khiến tình trạng tồi tệ hơn.
- Bước 4: Hô hấp nhân tạo khi hôn mê, ngừng thở
  - Kiểm tra tim mạch, huyết áp, nhịp thở: 
  - Huyết áp: Nếu bạn có máy đo huyết áp tại nhà, hãy kiểm tra huyết áp của người bệnh. Tuy nhiên, không tự ý dùng thuốc hạ huyết áp nếu không có chỉ định từ bác sĩ.
  - Nhịp thở: Hãy theo dõi nhịp thở của bệnh nhân và đảm bảo họ thở được dễ dàng.
- Bước 5: Giữ người bệnh ở trong tình trạng ấm áp:
  - Giữ thân nhiệt ổn định bằng cách đắp chăn mỏng. Lưu ý không nên dùng quá nhiều chăn hoặc đắp chăn dày, vì có thể gây cản trở hô hấp.
- Bước 6: Không tự ý dùng thuốc:
  - Một số người nghĩ rằng việc sử dụng thuốc aspirin có thể làm tan cục máu đông, nhưng điều này chỉ đúng với đột quỵ do tắc mạch, và không có tác dụng với đột quỵ do xuất huyết. Nên hỏi bác sĩ trước khi sử dụng.',
N'https://www.youtube.com/watch?v=SKs8EKh_3SQ',
N'
# Sai lầm cần tránh
- Không cố gắng làm người bệnh tỉnh táo bằng cách vỗ vào mặt hoặc lắc mạnh.
- Không cho người bệnh ăn hoặc uống gì, kể cả nước, vì người bệnh có thể mất khả năng nuốt và dễ bị sặc.
- Không dùng thuốc hạ huyết áp hoặc thuốc chống đông, trừ khi có chỉ dẫn của bác sĩ.
- Bạn cần đặc biệt chú ý những hành động được đề cập trên để bảo vệ tính mạng người bệnh.

## Khi nào nên gọi cấp cứu ngay? Nếu thấy một trong số các triệu chứng dưới đây, hãy gọi 115 ngay:
- Đột ngột đau đầu dữ dội mà chưa từng gặp trước đây.
- Mất thăng bằng nghiêm trọng và không thể đi lại bình thường.
- Đột nhiên mất thị lực một hoặc hai bên mắt.
- Khó khăn trong việc nói chuyện hoặc không hiểu người khác nói gì.
- Thời gian là yếu tố quan trọng nhất để xử lý đột quỵ. Nếu có thể sơ cứu và đưa người bệnh đến bệnh viện trong vòng “giờ vàng” (3-4 giờ sau khi xuất hiện triệu chứng), khả năng hồi phục sẽ cao hơn rất nhiều.

# Phòng tránh đột quỵ
- Duy trì chế độ ăn lành mạnh: Bổ sung rau xanh, trái cây, hạn chế thực phẩm không tốt cho sức khỏe.
- Vận động hàng ngày: Những bài tập thể dụng phù hợp mỗi ngày giúp tăng cường sức khỏe tim mạch.
- Theo dõi tình trạng huyết áp: Kiểm tra thường xuyên để đảm bảo huyết áp luôn ở mức an toàn.
- Từ bỏ thói quen hút thuốc: Thuốc lá tăng nguy cơ đột quỵ.
- Luôn để đầu óc thoải mái: Stress làm tăng huyết áp, gây áp lực lên tim và mạch máu.
- Ngoài ra, nếu bạn hoặc người thân có tiền sử bệnh tim mạch, tiểu đường, hoặc tiền sử đột quỵ, hãy thường xuyên khám sức khỏe theo chỉ dẫn của bác sĩ.'),

(N'Ngừng tim', 
N'',
N'',
N'',
N'')


SELECT COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'first_aid_cases';


EXEC sp_rename 'dbo.first_aid_cases.First_Aid_Description', 'FirstAidDescription', 'COLUMN';

EXEC sp_rename 'dbo.first_aid_cases.Video_Url', 'VideoURL', 'COLUMN';

EXEC sp_rename 'dbo.first_aid_cases.Common_Mistake', 'CommonMistake', 'COLUMN';
