import { forwardRef } from "react";
import "../style/ContentAbout.css"
import "animate.css"
const ContentAbout = forwardRef<HTMLDivElement>((props, ref) => {
    
    return (
        <div ref={ref}>
            {/* block 1 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-1">
                    <img src="https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL2JlY29taW5nLWRvY3Rvci5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjgyOH19fQ==" alt="image" />
                </div>
                <div className="block-right-1">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>
                        Nền tảng sức khoẻ toàn diện, hiện đại
                    </h1>
                    <h3 style={{ lineHeight: "1.5", fontSize: "20px" }}>
                        Chúng tôi cung cấp giải pháp chăm sóc sức khoẻ chủ động: từ kiến thức sơ cứu thực tế, tư vấn sử dụng thực phẩm chức năng an toàn, đến công nghệ dự đoán bệnh thông minh bằng AI và mô hình 3D. Mục tiêu là giúp bạn và gia đình chủ động bảo vệ sức khoẻ mỗi ngày, tiếp cận tri thức y khoa chuẩn xác, tiện lợi và cá nhân hoá.
                    </h3>
                </div>
            </div>
            {/* block 2 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-2">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>
                        Đột phá với công nghệ và tri thức y tế
                    </h1>
                    <h3 style={{ lineHeight: "1.5" }}>
                        Hướng dẫn sơ cứu minh hoạ trực quan, dễ hiểu.<br/>
                        Kho kiến thức về thực phẩm chức năng, dinh dưỡng và chăm sóc sức khoẻ toàn diện.<br/>
                        Dự đoán bệnh thông minh: Chọn triệu chứng trên mô hình 3D, nhận phân tích và tư vấn từ AI.<br/>
                        Đội ngũ chuyên gia đồng hành, cập nhật thông tin y tế mới nhất.<br/>
                        Website là người bạn đồng hành tin cậy, giúp bạn chủ động bảo vệ sức khoẻ bản thân và cộng đồng bằng tri thức và công nghệ hiện đại.
                    </h3>
                </div>
                <div className="block-right-2">
                    <img src="https://east.optum.com/wp-content/uploads/2024/04/PCP-followup_708x568.jpg" alt="image" />
                </div>
            </div>
        </div>
    );
});

export default ContentAbout;
