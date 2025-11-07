import { forwardRef } from "react";
import "../style/ContentAbout.css"
import "animate.css"
const ContentAbout = forwardRef<HTMLDivElement>((props, ref) => {
    
    return (
        <div ref={ref}>
            {/* block 1 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-1">
                    <img src="https://cafefcdn.com/thumb_w/640/203337114487263232/2024/7/15/ung20dung20cong20nghe-17210074277281671422169-0-49-450-769-crop-17210074341681992733945.jpg" alt="image" />
                </div>
                <div className="block-right-1">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>
                    Nền tảng tư vấn sức khoẻ ứng dụng trí tuệ nhân tạo
                    </h1>
                    <h3 style={{ lineHeight: "1.5", fontSize: "20px" }}>
                    VietMed là dự án phi lợi nhuận do sinh viên phát triển, ứng dụng công nghệ học máy để mang đến những gợi ý và lời khuyên chăm sóc sức khỏe cá nhân hoá. 
                    Thông qua việc phân tích dữ liệu triệu chứng, thói quen và nhu cầu của người dùng, hệ thống AI của VietMed có thể tư vấn các giải pháp an toàn, hợp lý — 
                    từ chế độ sinh hoạt đến thực phẩm chức năng phù hợp. 
                    Mục tiêu của chúng tôi là giúp người dùng hiểu rõ hơn về cơ thể mình và chăm sóc sức khỏe chủ động, đúng cách.
                    </h3>
                </div>
            </div>
            {/* block 2 */}
            <div style={{ display: "flex" }}>
                <div className="block-left-2">
                    <h1 className="animate__animated animate__shakeX" style={{ fontWeight: "bold" }}>
                    Tư vấn, hướng dẫn và tri thức vì sức khỏe cộng đồng
                    </h1>
                    <h3 style={{ lineHeight: "1.7" }}>
                    Hướng dẫn sơ cứu minh họa rõ ràng, dễ áp dụng trong tình huống thực tế.<br />
                    Kiến thức về dinh dưỡng, thực phẩm chức năng và lối sống lành mạnh.<br />
                    Tư vấn sức khỏe mang tính tham khảo, giúp người dùng hiểu và chủ động hơn trong việc chăm sóc bản thân.<br />
                    Thông tin được tổng hợp từ các tổ chức y tế uy tín và chuyên gia trong lĩnh vực.<br />
                    VietMed không thay thế bác sĩ, nhưng là người bạn đồng hành giúp bạn tiếp cận tri thức y tế đúng đắn, dễ hiểu và nhân văn.
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
