import "../style/BaseCss.css"
import "../style/IntroProduct.css"
const IntroAbout = () => {
    return (
        <div style={{ position: "relative", overflow: "hidden", marginTop: "1px" }}>
            <div className="image-div"></div>
            <div className="content-div">
                <h2 className="" style={{ fontSize: "40px", fontWeight: "bold" }}>Sản phẩm của chúng tôi</h2>
                <h3 style={{ lineHeight: "1.5" }}>Khám phá các loại thực phẩm chức năng giúp bổ sung dinh dưỡng, <br /> tăng cường sức khỏe và hỗ trợ cơ thể một cách an toàn, hiệu quả.</h3>
            </div>
        </div>

    );
};

export default IntroAbout;