import React from "react";
import { Button, Card, Collapse } from "antd";

const { Panel } = Collapse;

const FirstAidPage: React.FC = () => {
  return (
    <div className="container" style={{ margin: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Sơ cứu nhanh - Tình huống khẩn cấp</h1>
      
      <div className="section">
        <h2>Tình huống khẩn cấp</h2>
        <Collapse defaultActiveKey={['1']} accordion>
          <Panel header="Nghẹt thở" key="1">
            <p>Hướng dẫn sơ cứu cho tình huống nghẹt thở...</p>
          </Panel>
          <Panel header="Đột quỵ" key="2">
            <p>Hướng dẫn sơ cứu cho tình huống đột quỵ...</p>
          </Panel>
          <Panel header="Ngừng tim" key="3">
            <p>Hướng dẫn sơ cứu cho tình huống ngừng tim...</p>
          </Panel>
        </Collapse>
      </div>

      <div className="description">
        <h2>Mô tả tình huống và cách xử lý: </h2>
        <p></p>
      </div>

      <div className="section">
        <h2>Video hướng dẫn chi tiết</h2>
        <div className="video-container">
          <Card
            hoverable
            cover={<img alt="video" src="video-thumbnail.jpg" />}
          >
            <Card.Meta title="Hướng dẫn sơ cứu khi bị nghẹt thở" />
            <Button type="primary" block>
              Xem Video
            </Button>
          </Card>
        </div>
      </div>

      <div className="section">
        <h2>Sai lầm thường gặp và cách phòng tránh</h2>
        <ul>
          <li>Không kiểm tra tình trạng của nạn nhân trước khi thực hiện sơ cứu</li>
          <li>Áp dụng phương pháp sơ cứu sai cho từng tình huống</li>
          <li>Không gọi cấp cứu kịp thời khi cần</li>
        </ul>
      </div>

      <div className="section">
        <h2>Test kiến thức sơ cứu</h2>
        <Button type="primary" block>
          Bắt đầu bài kiểm tra
        </Button>
      </div>
    </div>
  );
};

export default FirstAidPage;
