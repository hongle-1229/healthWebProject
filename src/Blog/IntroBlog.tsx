
interface BannerProps{
  listRef: React.RefObject<HTMLDivElement | null>;
} 

const NewsBanner: React.FC<BannerProps> = ({listRef}) => {
  
  const handleScroll = () =>{
    listRef.current?.scrollIntoView({behavior:"smooth"});
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "60px 80px",
      background: "linear-gradient(to right, #e0f7fa, #fff)",
      borderRadius: 16,
      flexWrap: "wrap",
      gap: "40px"
    }}>
      {/* LEFT CONTENT */}
      <div style={{ flex: 1, minWidth: 280 }}>
        <h1 style={{ fontSize:40, fontWeight: "bold", marginBottom: 50, lineHeight: 1.5 }}>🩺 Cập nhật các tin tức <br /> về sức khoẻ mỗi ngày</h1>
        <p style={{ fontSize: 18, marginBottom: 30, lineHeight:1.6 }}>
          Khám phá hàng trăm bài viết hữu ích cùng những tin tức mới nhất về chăm sóc sức khoẻ và phòng tránh bệnh tật cho bạn và gia đình.
        </p>
        <button onClick={handleScroll} className="button-blog">
          Khám phá ngay
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div style={{ flex: 1, minWidth: 280, textAlign: "center" }}>
        <img
          src="src/assets/image/news.png"
          alt="Doctor illustration"
          style={{ maxWidth: "100%", height: "auto", borderRadius: 12 }}
        />
      </div>

      <style>
        {`

          .button-blog{
            background: #56a9f7;
            color: #fff;
            padding: 12px 32px;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
          }
          .button-blog:hover{
            background: #1087f7;

          }
        `}
        </style>
    </div>
  );
};

export default NewsBanner;
