import { useEffect, useState } from "react";
import {
  Table,
  Button,
  InputNumber,
  Image,
  Popconfirm,
  Typography,
  Divider,
  message
} from "antd";
import axios from "axios";

const { Title } = Typography;

interface CartItem {
  CartItemID: number;
  NameFood: string;
  ImageFood: string;
  Price: number;
  Quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const userId = 1; // Tạm dùng user cố định

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCartItems(res.data))
      .catch(() => message.error("Không thể tải giỏ hàng"));
  }, []);

  const updateQuantity = (cartItemId: number, quantity: number) => {
    axios
      .put("http://localhost:5000/api/cart/update", { cartItemId, quantity })
      .then(() => {
        message.success("✅ Cập nhật số lượng");
        setCartItems((prev) =>
          prev.map((item) =>
            item.CartItemID === cartItemId ? { ...item, Quantity: quantity } : item
          )
        );
      })
      .catch(() => message.error("❌ Lỗi khi cập nhật"));
  };

  const removeItem = (cartItemId: number) => {
    axios
      .delete("http://localhost:5000/api/cart/delete/", {
        data: {cartItemId},
      })
      .then(() => {
        message.success("🗑️ Đã xoá sản phẩm");
        setCartItems((prev) => prev.filter((item) => item.CartItemID !== cartItemId));
      })
      .catch(() => message.error("❌ Không thể xoá sản phẩm"));
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "NameFood",
      key: "NameFood",
      render: (text: string, record: CartItem) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            src={record.ImageFood}
            width={60}
            height={60}
            style={{ marginRight: 12, objectFit: "cover", borderRadius: 6 }}
          />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "Price",
      key: "Price",
      render: (price: number) => price.toLocaleString() + "₫",
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (quantity: number, record: CartItem) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => updateQuantity(record.CartItemID, value!)}
        />
      ),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: unknown, record: CartItem) =>
        (record.Price * record.Quantity).toLocaleString() + "₫",
    },
    {
      title: "Xoá",
      key: "action",
      render: (_: unknown, record: CartItem) => (
        <Popconfirm
          title="Xoá sản phẩm khỏi giỏ?"
          onConfirm={() => removeItem(record.CartItemID)}
        >
          <Button danger>Xoá</Button>
        </Popconfirm>
      ),
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        background: "#fff",
        padding: 32,
        borderRadius: 8,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Title level={2}>🛒 Giỏ hàng của bạn</Title>

      <Table
        columns={columns}
        dataSource={cartItems}
        pagination={false}
        rowKey="CartItemID"
        locale={{ emptyText: "Giỏ hàng đang trống" }}
      />

      <Divider />

      <div style={{ textAlign: "right", fontSize: 20 }}>
        <b>Tổng cộng: {total.toLocaleString()}₫</b>
      </div>

      <Button
        type="primary"
        size="large"
        style={{ float: "right", marginTop: 24 }}
        disabled={cartItems.length === 0}
      >
        Thanh toán
      </Button>

      <div style={{ clear: "both" }}></div>
    </div>
  );
}
