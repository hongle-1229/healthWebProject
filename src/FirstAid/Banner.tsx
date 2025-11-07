
interface BannerProps {
    listRef: React.RefObject<HTMLDivElement | null>;
}

const Banner: React.FC<BannerProps> = ({ listRef }) => {
    const handleScroll = () => {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="first-aid-banner">
            <div className="banner-content">
                <h1 style={{ marginBottom: "30px" }}>🩺 Tư vấn cách xử lý khi gặp các tình huống khẩn cấp</h1>

                <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
                    Nên làm gì khi gặp người đuối nước, bị bỏng hay điện giật? <br />
                    Nên xử lý thế nào khi gặp người bị đột quỵ? <br />
                    ...
                </p>

                <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
                    <b style={{ fontSize: "20px" }}>
                        Hiểu đúng để hành động đúng. <br />
                    </b>
                    <br /> VietMed khuyến khích mỗi người chủ động trang bị kiến thức,
                    học hỏi kỹ năng sơ cứu cơ bản từ các nguồn được công nhận,
                    để bảo vệ bản thân và hỗ trợ người khác một cách an toàn. <br />
                    Bạn có thể tham khảo tại đây:
                </p>

                <ul style={{ marginBottom: 16, paddingLeft: 20, color: "#333", fontSize:"17px" }}>
                    <li>Tổng hợp các bước sơ cứu cơ bản theo khuyến nghị của tổ chức y tế uy tín.</li>
                    <li>Phân tích những sai lầm thường gặp khi sơ cứu và cách phòng tránh.</li>
                    <li>Tài liệu minh họa, video hướng dẫn từ nguồn chính thống dễ hiểu, dễ tra cứu.</li>
                    <li>Bộ câu hỏi trắc nghiệm giúp kiểm tra và củng cố kiến thức sơ cứu của bạn.</li>
                </ul>

                <span style={{ color: "#ff4d4f", fontWeight: 600, display: "block", marginBottom: 20 }}>
                    Cẩn trọng – Bình tĩnh – Hành động có hiểu biết: Kiến thức đúng giúp bạn xử lý tốt trong tình huống khẩn cấp.
                </span>

                <button className="banner-btn" onClick={handleScroll}>Tham khảo dưới đây</button>

            </div>
            <img
                className="banner-img"
                src="src/assets/image/bxck4xomawbbhdbduml6.png"
                alt="Banner y tế"
            />
            <style>
                {`
                    .first-aid-banner {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: linear-gradient(90deg, #e6f7ff 60%, #fff 100%);
                        border-radius: 16px;
                        padding: 32px 24px;
                        margin-bottom: 100px;
                        box-shadow: 0 4px 24px #0001;
                    }
                    .banner-content {
                        max-width: 60%;
                    }
                    .first-aid-banner h1 {
                        color: #1890ff;
                        font-size: 2.0rem;
                        font-weight: bold;
                        margin-bottom: 12px;
                    }
                    .first-aid-banner p {
                    font-size: 1.1rem;
                    color: #333;
                    margin-bottom: 18px;
                    }

                    .banner-btn {
                        background: #ff4d4f;
                        color: #fff;
                        border: none;
                        border-radius: 8px;
                        padding: 10px 28px;
                        margin-top: 20px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.2s;
                        width: 270px
                    }
                    .banner-btn:hover {
                    background: #d9363e;
                    }

                    .banner-img {
                    width: 800px;
                    height: auto;
                    margin-left: 32px;
                    border-radius: 12px;
                    background: #fff;
                    box-shadow: 0 2px 8px #0001;
                    }
                    @media (max-width: 768px) {
                    .first-aid-banner {
                        flex-direction: column;
                        text-align: center;
                        padding: 24px 8px;
                    }
                    .banner-content {
                        max-width: 100%;
                    }
                    .banner-img {
                        margin: 16px auto 0;
                        width: 120px;
                    }
                    }

        `
                }
            </style>
        </div>

    );
};

export default Banner;