import { Card, Table, Image, Space, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SearchDevice from "../layout/Search"; 
import { ColumnsType } from "antd/es/table";

interface Product {
  FunctionalFoodsID: number;
  NameFood: string;
  ImageFood: string;
  PriceFoods: number;
  Rating: number;
  Sold: number;
  Discount: number;
  Benefit: string;
  Instructions: string;
  Alert: string;
}

const ManageProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all_infor")
      .then(res => {
        console.log("Dữ liệu sản phẩm:", res.data);
        setProducts(res.data.data || []);
      })
      .catch(err => console.error("Lỗi lấy dữ liệu sản phẩm:", err));
  }, []);

  const columns: ColumnsType<Product> = [
    {
        title: "ID",
        dataIndex: "FunctionalFoodsID",
        key: "id"
    },
    {
      title: "Ảnh",
      dataIndex: "ImageFood",
      key: "image",
      render: (url: string) => <Image width={60} src={url} />
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "NameFood",
      key: "name"
    },
    {
      title: "Giá",
      dataIndex: "PriceFoods",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN") + " đ"
    },
    {
      title: "Đánh giá",
      dataIndex: "Rating",
      key: "rating"
    },
    {
      title: "Đã bán",
      dataIndex: "Sold",
      key: "sold"
    },
    {
      title: "Giảm giá",
      dataIndex: "Discount",
      key: "discount",
      render: (value: number) => `${value}%`
    },
    {
      title: "Lợi ích",
      dataIndex: "Benefit",
      key: "benefit",
      ellipsis: true,
      render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
    },
    {
        title: "Hướng dẫn sử dụng",
        dataIndex: "Instructions",
        key: "instructions",
        ellipsis: true,
        render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
    },
    {
        title:"Cảnh báo",
        dataIndex: "Alert",
        key: "alert",
        ellipsis: true,
        render: (text: string) =>(
        <Tooltip title={text}>
            <span>{text}</span>
        </Tooltip>
      )
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
        title="Quản lý sản phẩm chức năng"
        style={{ marginTop: "80px" }}
        extra={
          <div style={{ display: "flex", gap: "10px" }}>
            <SearchDevice /> 
          </div>
        }
      >
        <Table
          rowKey="FunctionalFoodsID"
          dataSource={products}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize: 5,
            pageSizeOptions: [5],
            total: products.length,
            onChange: (page) => setCurrentPage(page)
          }}
          scroll={{ x: 1000 }}
        />
      </Card>
    </div>
  );
};

export default ManageProduct;
