interface BannerPoprs{
    listRef: React.RefObject<HTMLDivElement | null>;
}

const Banner: React.FC<BannerPoprs> = ({listRef}) => {
    const handleScroll = () =>{
        listRef.current?.scrollIntoView({behavior:"smooth"});
    }
    return (
        <div>
            <div className="tpcn-banner">
                <div className="tpcn-banner-left">
                    <h1 style={{ color: "#1890ff", fontWeight: 700, fontSize: "2.5rem", marginBottom: 52 }}>
                        🌱💙 Thực phẩm chức năng<br />Bảo vệ sức khỏe mỗi ngày
                    </h1>
                    <p style={{ fontSize: "1.15rem", color: "#333", marginBottom: 26 }}>
                        Cùng VietMed tìm hiểu cách bổ sung dưỡng chất an toàn, 
  tăng cường sức đề kháng và hỗ trợ sức khỏe thể chất – tinh thần 
  dựa trên cơ sở khoa học và lời khuyên cá nhân hóa từ AI.
                    </p>
                    <ul style={{ lineHeight:"25px",color: "#ff2418", fontSize: "1rem", marginBottom: 28, paddingLeft: 20 }}>
                        <li>Thông tin được tổng hợp từ nguồn y tế và dinh dưỡng đáng tin cậy.</li>
                        <li>AI tư vấn lựa chọn thực phẩm chức năng phù hợp với độ tuổi, nhu cầu và thói quen sinh hoạt.</li>
                        <li>Khuyến khích lối sống lành mạnh – sử dụng thực phẩm chức năng đúng cách, không lạm dụng.</li>
                    </ul>
                    <button onClick={handleScroll} className="tpcn-banner-btn">
                        Khám phá sản phẩm
                    </button>
                </div>
                {/* <div className="tpcn-banner-right"> */}
                    <img
                    className="tpcn-banner-right"
                        src="src/assets/image/oh4j8zzjzzlfy3ustlaq.png"
                        alt="Thực phẩm chức năng"
                        
                    />
                {/* </div> */}
            </div>

            <style>
                {
                    `
                    .tpcn-banner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: linear-gradient(90deg, #e6f7ff 60%, #fff 100%);
                    border-radius: 20px;
                    padding: 36px 28px;
                    margin-bottom: 40px;
                    box-shadow: 0 4px 24px #0001;
                    }

                    .tpcn-banner-left {
                    max-width: 55%;
                    }

                    .tpcn-banner-btn {
                    background: #56a9f7;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    padding: 12px 32px;
                    font-size: 1.1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                    width: 300px
                    }
                    .tpcn-banner-btn:hover {
                    background: #1087f7;
                    }

                    .tpcn-banner-right {
                    width: 800px;
                    border-radius: 6px;
                    box-shadow: 0 4px 24px #0002;
                    background: #fff;
                    }

                    @media (max-width: 900px) {
                    .tpcn-banner {
                        flex-direction: column;
                        text-align: center;
                        padding: 24px 8px;
                    }
                    .tpcn-banner-left {
                        max-width: 100%;
                    }
                    `
                }
            </style>

        </div>
    );
};

export default Banner;