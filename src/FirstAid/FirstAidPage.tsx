import { forwardRef, useEffect, useState } from "react";
import { Button, Collapse, Spin, message, Card } from "antd";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { BulbOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
// const images = item.ImageFirstAid.split(",");

interface FirstAidCase {
  Title: string;
  ImageFirstAid: string;
  FirstAidDescription: string;
  VideoURL: string;
  CommonMistake: string;
}

function getYouTubeEmbedUrl(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2] ? `https://www.youtube.com/embed/${match[2]}` : url;
}


const FirstAidPage = forwardRef<HTMLDivElement>((props, ref) => {
  const [data, setData] = useState<FirstAidCase[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/first_aid/")
      .then((res) => {
        setData(res.data.data);

      })
      .catch((err) => {
        console.error(err);
        message.error("Lỗi khi tải dữ liệu sơ cứu.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin tip="Đang tải dữ liệu..." style={{ marginTop: 100 }} />;

  return (
    <div ref={ref} className="container" style={{ margin: "20px" }}>
      <h1 style={{
        textAlign: "center",
        fontSize: 36,
        color: "#0d47a1",
        marginBottom: 52,
        fontWeight: "bold"
      }}>
        🚑 Sơ cứu nhanh - Tình huống khẩn cấp
      </h1>

      <Collapse accordion bordered={false}>
        {data.map((item, index) => (
          <Panel
            key={index}
            header={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 12px"
                }}
              >
                <div>
                  <h1 style={{ fontSize: 30, margin: 0, fontWeight: 600, color: "#1e88e5" }}>
                    {item.Title}
                  </h1>
                </div>
                <BulbOutlined style={{
                  fontSize: 26,
                  color: "#ffd600",
                  transition: "transform 0.3s",
                }} />
              </div>
            }
            style={{
              borderRadius: 16,
              background: "#fafafa",
              border: "1px solid #e0e0e0",
              marginBottom: 20,
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              overflow: "hidden"
            }}
          >
            <div className="panel-content" style={{ padding: 16 }}>
              <h1 style={{ color: "#0d47a1", marginBottom: 16 }}>🧠 Mô tả tình huống</h1>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 20,
                marginBottom: 24
              }}>
                {(typeof item.ImageFirstAid === "string"
                  ? item.ImageFirstAid.split(",")
                  : item.ImageFirstAid
                ).map((imgUrl: string, idx: number) => (
                  <img
                    key={idx}
                    src={imgUrl.trim()}
                    alt={`Ảnh mô tả ${idx + 1}`}
                    style={{
                      maxWidth: "100%",
                      width: 500,
                      height: 350,
                      objectFit: "cover",
                      borderRadius: 12,
                      boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                      background: "#eee"
                    }}
                  />
                ))}
              </div>

              <div className="react-markdown" style={{ marginBottom: 32, fontSize: 15, lineHeight: 1.6 }}>
                <ReactMarkdown>{item.FirstAidDescription}</ReactMarkdown>
              </div>

              <h1 style={{ color: "#2e7d32", marginBottom: 16 }}>🎥 Video hướng dẫn</h1>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <iframe
                  width="800"
                  height="450"
                  src={getYouTubeEmbedUrl(item.VideoURL)}
                  title={item.Title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                />
              </div>

              {item.CommonMistake && (
                <>
                  <h1 style={{ color: "#c62828", marginBottom: 16 }}>⚠️ Sai lầm thường gặp</h1>
                  <div className="react-markdown" style={{ fontSize: 16, lineHeight: 1.6 }}>
                    <ReactMarkdown>{item.CommonMistake}</ReactMarkdown>
                  </div>
                </>
              )}
            </div>
          </Panel>
        ))}
      </Collapse>


      {/* test */}
      <div style={{ marginTop: 60, display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 16,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            padding: 32,
            background: "linear-gradient(120deg, #fce4ec, #e3f2fd)",
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ textAlign: "center" }}>
            <BulbOutlined style={{ fontSize: 48, color: "#1976d2" }} />
            <h1 style={{ margin: "16px 0 8px", fontSize: 28, color: "#333" }}>
              🧠 Kiểm tra kiến thức sơ cứu
            </h1>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 32 }}>
              Đánh giá hiểu biết của bạn về các kỹ năng sơ cứu quan trọng để bảo vệ bản thân và người khác.
            </p>
            <Button
              type="primary"
              size="large"
              shape="round"
              onClick={() => navigate("/intro-test")}
              style={{ padding: "0 32px", fontSize: 18 }}
            >
              Bắt đầu bài kiểm tra
            </Button>
          </div>
        </Card>
      </div>
      <style>
        {
          `
            .react-markdown h3 {
  margin-top: 24px;
  margin-bottom: 12px;
  color: #333;
}
.react-markdown ul {
  margin-left: 20px;
  margin-bottom: 16px;
}
.react-markdown li {
  margin-bottom: 6px;
}
.react-markdown p {
  margin-bottom: 12px;
  white-space: normal; /* không cần pre-line nữa */
}

          `
        }
      </style>
    </div>
  );
});

export default FirstAidPage;
