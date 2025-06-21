import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Space } from "antd";
import { useNavigate } from "react-router-dom"; 

interface Test {
  TestID: number;
  TestTitle: string;
  Quantity: number;
}

const IntroTest = () => {
  const [test, setTest] = useState<Test[]>([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/quiz/list_test")
      .then((res) => {
        console.log("Danh sách bài test: ", res.data);
        setTest(res.data || []);
      })
      .catch((err) => console.log("Lỗi lấy danh sách bài test: ", err));
  }, []);

  

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ color: "#1976d2", fontSize: 32, marginBottom: 8 }}>
        🧠 Kiểm tra kiến thức sơ cứu của bạn
      </h1>
      <h2 style={{ color: "#555", marginBottom: 32 }}>
        Thêm kiến thức, thêm an toàn
      </h2>

      <h2><b>Chọn nội dung kiểm tra</b></h2>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        {test.map((item) => (
          <Card
            key={item.TestID}
            title={item.TestTitle}
            style={{ borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
            extra={
              <Button
                type="primary"
                onClick={() => navigate(`/quizdemo/${item.TestID}`)}
              >
                Bắt đầu         
              </Button>
            }
          >
            <p><b>Số câu hỏi:</b> {item.Quantity}</p>
          </Card>
        ))}
      </Space>
    </div>
  );
};

export default IntroTest;
