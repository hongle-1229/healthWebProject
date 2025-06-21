  
interface BannerProps{
    listRef: React.RefObject<HTMLDivElement | null>;
}

const Banner: React.FC<BannerProps> = ({listRef}) => {
    const handleScroll = () =>{
        listRef.current?.scrollIntoView({ behavior: "smooth"});
    }

    return (
        <div className="first-aid-banner">
            <div className="banner-content">
                <h1 style={{ marginBottom: "30px" }}>🩺 Sơ cứu nhanh - Bảo vệ sức khỏe</h1>
                <p style={{ fontSize: "1.15rem", marginBottom: 12 }}>
                    Trang thông tin tổng hợp các tình huống sơ cứu thường gặp trong cuộc sống hằng ngày.<br />
                    Được biên soạn bởi chuyên gia y tế, giúp bạn dễ dàng tiếp cận, học hỏi và thực hành ngay khi cần thiết.
                </p>
                <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
                    <b style={{ fontSize: "20px" }}>Đừng để bất ngờ trước những tai nạn nhỏ hay sự cố bất ngờ! <br /> </b>
                    <br /> Hãy chủ động trang bị kiến thức để bảo vệ bản thân, gia đình và cộng đồng. <br />
                    Cung cấp các thông tin sơ cứu như:
                </p>
                <ul style={{ marginBottom: 16, paddingLeft: 20, color: "#333" }}>
                    <li>Hướng dẫn chi tiết từng bước xử lý các tình huống khẩn cấp.</li>
                    <li>Nhận biết dấu hiệu nguy hiểm, tránh sai lầm thường gặp.</li>
                    <li>Video minh họa, hình ảnh trực quan, dễ hiểu.</li>
                    <li>Kiểm tra kiến thức với bài trắc nghiệm tương tác.</li>
                </ul>
                <span style={{ color: "#ff4d4f", fontWeight: 600, display: "block", marginBottom: 20 }}>
                    Bình tĩnh – Đúng cách – Kịp thời: Mỗi hành động của bạn có thể cứu sống một mạng người!
                </span>
                <button className="banner-btn" onClick={handleScroll}>Khám phá các tình huống sơ cứu</button>

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
                        font-size: 2.2rem;
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
                        margin-top: 40px;
                        font-size: 1rem;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.2s;
                        width: 350px
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