import "../style/BaseCss.css"
import "../style/IntroAbout.css"
const IntroAbout = () => {
    return (
        <div style={{ position: "relative", overflow: "hidden" }}>
    <div className="image-div"></div>
    <div className="content-div">
        <h2 className="" style={{ fontSize: "40px", fontWeight:"bold" }}>Về chúng tôi</h2>
        <h3 style={{lineHeight:"1.5"}}>Chúng tôi cam kết mang đến thông tin y tế chính xác, dễ hiểu và hữu ích, <br /> giúp mọi người chăm sóc sức khỏe tốt hơn mỗi ngày!</h3>
    </div>
</div>

    );
};

export default IntroAbout;