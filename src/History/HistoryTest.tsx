import { useEffect, useState } from "react";
import { Table, Card } from "antd";
import axios from "axios";

interface TestHistory {
  TestOrder: number;
  TestName: string;
  Score: number;
  SubmitAt: string;
}

const HistoryTest = () => {
  const [data, setData] = useState<TestHistory[]>([]);
  const [loading, setLoading] = useState(false);

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;
  const userID = user?.id;

  useEffect(() => {
    if (!userID) return;

    setLoading(true);
    console.log("Fetching history for userID:", userID);
    axios
      .get(`http://localhost:5000/api/history/test?userID=${userID}`)
      .then((res) => {
        console.log("History data:", res.data);
        setData(res.data);
      })
      .catch((err) => console.error("Lỗi tải lịch sử:", err))
      .finally(() => setLoading(false));
  }, [userID]);

  const columns = [
    {
      title: "STT",
      dataIndex: "TestOrder",
      key: "TestOrder",
      width: 80,
      align: "center" as const,
    },
    {
      title: "Bài kiểm tra",
      dataIndex: "TestName",
      key: "TestName",
      width: 250,
    },
    {
      title: "Điểm",
      dataIndex: "Score",
      key: "Score",
      width: 100,
      align: "center" as const,
    },
    {
      title: "Thời gian",
      dataIndex: "SubmitAt",
      key: "SubmitAt",
      render: (date: string) => new Date(date).toLocaleString("vi-VN"),
      width: 200,
    },
  ];

  return (
    <Card
      title="📘 Lịch sử làm bài kiểm tra"
      style={{ width: "90%", maxWidth: 900, margin: "40px auto", marginTop: "100px" }}
    >
      <Table
        dataSource={data}
        loading={loading}
        columns={columns}
        rowKey={(record) => record.TestOrder}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default HistoryTest;
