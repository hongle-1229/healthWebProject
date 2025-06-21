
const NewsBanner = () => {
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
        <button style={{
          backgroundColor: "#1890ff",
          color: "#fff",
          padding: "12px 24px",
          fontSize: 16,
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}>
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
    </div>
  );
};

export default NewsBanner;
