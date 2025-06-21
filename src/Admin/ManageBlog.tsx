import { Card, Table, Space, Button,  Tooltip, Image } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchDevice from "../layout/Search"; 
import { ColumnsType } from "antd/es/table";

interface Blog{
  NewsID: string,
  NewsTitle: string,
  ImageNews: string,
  NewsDescription: string,
  SourceNews: string,
  PublishAt: string,
}

const ManageProduct = () => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/api/news")
      .then(res => {
        console.log("Dữ liệu bài viết:", res.data);
        setBlog(res.data || []);
      })
      .catch(err => console.error("Lỗi lấy dữ liệu bài viết:", err));
  }, []);

  const columns: ColumnsType<Blog> = [
    {
        title: "ID",
        dataIndex: "NewsID",
        key: "id"
    },
    {
      title: "Tiêu đề",
      dataIndex: "NewsTitle",
      key: "title"
    },
    {
      title: "Ảnh",
      dataIndex: "ImageNews",
      key: "image",
      render: (url: string) => <Image width={60} src={url}></Image>
    //   render: (urls: string) => (
    //     <Space>
    //       {urls.split(",").map((url,index) =>(
    //         <Image key={index} width={60} src={url.trim()}></Image>
    //       ))}
    //     </Space>
    //   )
    },
    {
      title: "Mô tả",
      dataIndex: "NewsDescription",
      key: "description",
      ellipsis: true,
      render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
    },
    //{
    //   title: "Hướng dẫn sơ cứu",
    //   dataIndex: "FirstAidDescription",
    //   key: "description",
    //   ellipsis: true,
    //   render: (text: string) =>(
    //     <Tooltip title={text}>
    //         <span>{text}</span>
    //     </Tooltip>
    //   )
    // },
    {
      title: "Nguồn",
      dataIndex: "SourceNews",
      key: "source"
    },
    {
        title: "Thời gian tạo",
        dataIndex: "PublishAt",
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
        title="Quản lý bài viết"
        style={{ marginTop: "80px" }}
        extra={
          <div style={{ display: "flex", gap: "10px" }}>
            <SearchDevice /> 
          </div>
        }
      >
        <Table
          rowKey="NewsID"
          dataSource={blog}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: 5,
            pageSizeOptions: [5],
            total: blog.length,
            onChange: (page) => setCurrentPage(page)
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
