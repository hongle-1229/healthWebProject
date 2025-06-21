import { Card, Table, Image, Space, Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchDevice from "../layout/Search"; 
import { ColumnsType } from "antd/es/table";

interface User {
  UserID: number,
  ImageUser: string,
  UserName: string,
  Email: string,
  FullName: string,
  PhoneNumber: string,
  PassWordUser: string,
  RoleUser: string,
  CreateAt: string
}

const ManageProduct = () => {
  const [user, setUser] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then(res => {
        console.log("Dữ liệu người dùng:", res.data);
        setUser(res.data || []);
      })
      .catch(err => console.error("Lỗi lấy dữ liệu người dùng:", err));
  }, []);

  const columns: ColumnsType<User> = [
    {
        title: "ID",
        dataIndex: "UserID",
        key: "id"
    },
    {
      title: "Ảnh",
      dataIndex: "ImageUser",
      key: "image",
      render: (url: string) => <Image width={60} src={url} />
    },
    {
      title: "Tên người dùng",
      dataIndex: "UserName",
      key: "name"
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      key: "full-name",
    //   render: (price: number) => price.toLocaleString("vi-VN") + " đ"
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "email"
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "phone"
    },
    {
      title: "Mật khẩu",
      dataIndex: "PassWordUser",
      key: "password",
      render: () => `**********`
    },
    {
      title: "Vai trò",
      dataIndex: "RoleUser",
      key: "role",
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
    }
  ];

  return (
    <div>
      <Card
        title="Quản lý người dùng"
        style={{ marginTop: "80px" }}
        extra={
          <div style={{ display: "flex", gap: "10px" }}>
            <SearchDevice /> 
          </div>
        }
      >
        <Table
          rowKey="UserID"
          dataSource={user}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: 5,
            pageSizeOptions: [5],
            total: user.length,
            onChange: (page) => setCurrentPage(page)
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
