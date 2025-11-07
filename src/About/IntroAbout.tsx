
interface BannerProps{
    listRef: React.RefObject<HTMLDivElement | null>;
}

const Banner: React.FC<BannerProps> = ({listRef}) => {
    const handleScroll = () =>{
        listRef.current?.scrollIntoView({ behavior: "smooth"});
    }

    return (
        <section className="about-bg-banner">
            <div className="about-bg-overlay" />
            <div className="about-bg-content">
                <h1>Về Chúng Tôi</h1>
                <p>
                    <b>Sứ mệnh:</b> Chia sẻ kiến thức và kỹ năng sơ cứu – chăm sóc sức khỏe đáng tin cậy, giúp cộng đồng chủ động bảo vệ bản thân và những người xung quanh.<br />
                    <b>Tầm nhìn:</b> Trở thành nền tảng tra cứu và tư vấn sức khỏe phi lợi nhuận, mang lại thông tin dễ hiểu – chính xác – an toàn cho mọi người.
                </p>
                <div className="about-bg-values">
                    <div className="about-bg-value-card">
                        <span>📚</span>
                        <b>Khách quan</b>
                        <p>Nội dung được tổng hợp từ các nguồn y tế đáng tin cậy trong và ngoài nước.</p>
                    </div>
                    <div className="about-bg-value-card">
                        <span>💬</span>
                        <b>Tư vấn</b>
                        <p>Cung cấp thông tin mang tính hướng dẫn, không thay thế cho chẩn đoán y khoa.</p>
                    </div>
                    <div className="about-bg-value-card">
                        <span>🌱</span>
                        <b>Cộng đồng</b>
                        <p>Do sinh viên phát triển với tinh thần lan tỏa tri thức và vì sức khỏe cộng đồng.</p>
                    </div>
                </div>
                <button className="about-bg-btn" onClick={handleScroll}>
                    Tìm hiểu thêm 
                </button>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
                {`
                .about-bg-banner {
                    position: relative;
                    width: 100%;
                    height: 645px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('/src/assets/image/istockphoto-949812160-170667a.jpg') center/cover no-repeat;
                    overflow: hidden;
                    margin-bottom: 60px;
                }
                .about-bg-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(30deg, rgba(0, 16, 28, 30%) 0%, rgba(184, 222, 255, 0.28) 30%);
                    backdrop-filter: blur(2px);
                    z-index: 1;
                }
                .about-bg-content {
                    position: relative;
                    z-index: 2;
                    color: black;
                    font-family: "Inter", sans-serif;
                    font-optical-sizing: auto;
                    font-weight: <weight>;
                    font-style: normal;
                    padding: 48px 30px;
                    text-align: center;
                    width: 100%;
                    max-width: 900px;
                }
                .about-bg-content h1 {
                    font-size: 2.8rem;
                    font-weight: 700;
                    margin-bottom: 18px;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 16px #0006;
                }
                .about-bg-content p {
                    font-size: 1.2rem;
                    margin-bottom: 30px;
                    line-height: 1.6;
                    color: black;
                    text-shadow: 0 1px 6px #100f0f33;
                }
                .about-bg-values {
                    display: flex;
                    justify-content: center;
                    gap: 28px;
                    margin-bottom: 28px;
                    flex-wrap: wrap;
                }
                .about-bg-value-card {
                    background: rgba(255,255,255,0.83);
                    border-radius: 16px;
                    padding: 16px 20px 10px 20px;
                    box-shadow: 0 2px 8px #0002;
                    min-width: 130px;
                    max-width: 200px;
                    margin: 0 8px;
                    transition: background 0.18s;
                }
                .about-bg-value-card:hover {
                    background: rgba(255,255,255,0.22);
                }
                .about-bg-value-card span {
                    font-size: 2rem;
                    display: block;
                    margin-bottom: 6px;
                }
                .about-bg-value-card b {
                    display: block;
                    color: black;
                    font-size: 1.05rem;
                    margin-bottom: 4px;
                    text-shadow: 0 1px 2px #0005;
                }
                .about-bg-value-card p {
                    font-size: 0.97rem;
                    color: black;
                    margin: 0;
                    text-shadow: 0 1px 4px #0003;
                }
                .about-bg-btn {
                    background: linear-gradient(90deg, #19b4db 0%, #83d5e6 100%);
                    color: #ffffffff;
                    border: none;
                    border-radius: 8px;
                    padding: 12px 36px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 2px 8px #0002;
                    transition: background 0.2s;
                    margin-top: 10px;
                    width: 200px
                }
                .about-bg-btn:hover {
                    background: linear-gradient(90deg, #83d5e6 0%, #19b4db 100%);
                }
                @media (max-width: 900px) {
                    .about-bg-content {
                        padding: 32px 8px;
                    }
                    .about-bg-values {
                        gap: 14px;
                    }
                }
                @media (max-width: 600px) {
                    .about-bg-content h1 {
                        font-size: 2rem;
                    }
                    .about-bg-content p {
                        font-size: 1rem;
                    }
                    .about-bg-values {
                        flex-direction: column;
                        align-items: center;
                    }
                    .about-bg-value-card {
                        min-width: 100px;
                        max-width: 100%;
                        margin-bottom: 10px;
                    }
                }
                `}
            </style>
        </section>
    );
};

export default Banner;
