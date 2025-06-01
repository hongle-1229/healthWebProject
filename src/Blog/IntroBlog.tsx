import "../style/BaseCss.css"
import "../style/IntroProduct.css"
const IntroAbout = () => {
    return (
        <div style={{ position: "relative", overflow: "hidden", marginTop: "1px" }}>
            <div className="image-div"></div>
            <div className="content-div">
                <h2 className="" style={{ fontSize: "40px", fontWeight: "bold" }}>Tin tức nổi bật</h2>
                <h3 style={{ lineHeight: "1.5" }}>Khám phá các bài viết bổ ích, <br /> để có thêm kiến thức về chăm sóc sức khoẻ cho bản thân và gia đình.</h3>
            </div>
        </div>

    );
};

export default IntroAbout;