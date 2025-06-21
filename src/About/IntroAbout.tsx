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
                    <b>Sứ mệnh:</b> Kết nối cộng đồng với chuyên gia y tế, lan tỏa tri thức sức khoẻ hiện đại.<br />
                    <b>Tầm nhìn:</b> Trở thành địa chỉ tin cậy về sức khoẻ, đồng hành cùng bạn xây dựng lối sống lành mạnh.
                </p>
                <div className="about-bg-values">
                    <div className="about-bg-value-card">
                        <span>🎯</span>
                        <b>Chính xác</b>
                        <p>Thông tin được kiểm duyệt bởi chuyên gia.</p>
                    </div>
                    <div className="about-bg-value-card">
                        <span>🤝</span>
                        <b>Tận tâm</b>
                        <p>Luôn đồng hành cùng bạn.</p>
                    </div>
                    <div className="about-bg-value-card">
                        <span>💡</span>
                        <b>Đổi mới</b>
                        <p>Ứng dụng công nghệ hiện đại.</p>
                    </div>
                </div>
                <button className="about-bg-btn" onClick={handleScroll}>
                    Tìm hiểu thêm 
                </button>
            </div>
            <style>
                {`
                .about-bg-banner {
                    position: relative;
                    width: 100%;
                    height: 645px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('src/assets/image/1435660933_Health.jpg') center/cover no-repeat;
                    overflow: hidden;
                    margin-bottom: 60px;
                }
                .about-bg-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: linear-gradient(120deg, rgba(141, 186, 228, 0.68) 0%, rgba(0,0,0,0.28) 100%);
                    backdrop-filter: blur(2px);
                    z-index: 1;
                }
                .about-bg-content {
                    position: relative;
                    z-index: 2;
                    color: #fff;
                    padding: 48px 36px;
                    text-align: center;
                    width: 100%;
                    max-width: 900px;
                }
                .about-bg-content h1 {
                    font-size: 2.8rem;
                    font-weight: 800;
                    margin-bottom: 18px;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 16px #0006;
                }
                .about-bg-content p {
                    font-size: 1.2rem;
                    margin-bottom: 30px;
                    line-height: 1.6;
                    color: white;
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
                    background: rgba(255,255,255,0.13);
                    border-radius: 16px;
                    padding: 16px 20px 10px 20px;
                    box-shadow: 0 2px 8px #0002;
                    min-width: 130px;
                    max-width: 170px;
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
                    color: #fff;
                    font-size: 1.08rem;
                    margin-bottom: 4px;
                    text-shadow: 0 1px 4px #0005;
                }
                .about-bg-value-card p {
                    font-size: 0.97rem;
                    color: #f0f0f0;
                    margin: 0;
                    text-shadow: 0 1px 4px #0003;
                }
                .about-bg-btn {
                    background: linear-gradient(90deg, #19b4db 0%, #83d5e6 100%);
                    color: #fff;
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
