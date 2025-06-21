import { Card, Table, Image, Space, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchDevice from "../layout/Search"; 
import { ColumnsType } from "antd/es/table";

interface FirstAidCase{
  FirstAidID: number,
  Title: string,
  ImageFirstAid: string,
  VideoUrl: string,
  FirstAidDescription: string,
  CommonMistake: string,
  CreateAt: string
}

const ManageProduct = () => {
  const [firstaid, setFirstaid] = useState<FirstAidCase[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/api/first_aid")
      .then(res => {
        console.log("Dữ liệu trường hợp sơ cứu:", res.data);
        setFirstaid(res.data.data || []);
      })
      .catch(err => console.error("Lỗi lấy dữ liệu trường hợp sơ cứu:", err));
  }, []);

  const columns: ColumnsType<FirstAidCase> = [
    {
        title: "ID",
        dataIndex: "FirstAidID",
        key: "id"
    },
    {
      title: "Tên trường hợp",
      dataIndex: "Title",
      key: "title"
    },
    {
      title: "Ảnh",
      dataIndex: "ImageFirstAid",
      key: "image",
      render: (urls: string) => (
        <Space>
          {urls.split(",").map((url,index) =>(
            <Image key={index} width={60} src={url.trim()}></Image>
          ))}
        </Space>
      )
    },
    {
      title: "Video hướng dẫn",
      dataIndex: "VideoURL",
      key: "video",
    },
    {
      title: "Hướng dẫn sơ cứu",
      dataIndex: "FirstAidDescription",
      key: "description",
      ellipsis: true,
      render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
    },
    {
      title: "Sai lầm thường gặp",
      dataIndex: "CommonMistake",
      key: "common-mistake",
      ellipsis: true,
      render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
    },
    {
        title: "Thời gian tạo",
        dataIndex: "CreateAt",
        key: "create",
        render: (value: string) => {
            const date = new Date(value);
            return date.toLocaleString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                hour12: false
            });
        }
    },
    {
      title: "Hành động",
      key: "actions",
      render: () => (
        <Space style={{display: "block"}}>
          <Button style={{marginBottom:"10px"}} icon={<EditOutlined />} type="primary">Sửa</Button>
          <Button icon={<DeleteOutlined />} danger>Xoá</Button>
        </Space>
      )
    },
  ];

  return (
    <div>
      <Card
        title="Quản lý trường hợp sơ cứu"
        style={{ marginTop: "80px" }}
        extra={
          <div style={{ display: "flex", gap: "10px" }}>
            <SearchDevice /> 
          </div>
        }
      >
        <Table
          rowKey="FirstAidID"
          dataSource={firstaid}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: 5,
            pageSizeOptions: [5],
            total: firstaid.length,
            onChange: (page) => setCurrentPage(page)
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
