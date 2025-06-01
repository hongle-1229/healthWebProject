import '../style/ProductHome.css';
import 'animate.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface Product {
  FunctionalFoodsID: number;
  NameFood: string;
  ImageFood: string;
  PriceFoods: number;
  Rating: number;
  Sold: number;
  Discount: number;
}

const ProductHome = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data.data);
      })
      .catch((error) => console.log("Lỗi lấy sản phẩm: ", error));
  }, []);

  return (
    <div style={{marginBottom: "100px"}}>
      <Row justify="center">
        {products.map((product) => (
          <Col xs={24} sm={12} md={6} key={product.FunctionalFoodsID}>
            <div className="product-card">
              {product.Discount > 0 && (
                <div className="discount-badge">-{product.Discount}%</div>
              )}
              <Card
                hoverable
                cover={<img alt={product.NameFood} src={product.ImageFood} className="product-image" />}
                className="product-container"
              >
                <h3 className="product-title">{product.NameFood}</h3>
                <p className="product-price">{product.PriceFoods.toLocaleString()} đ</p>
                <Rate disabled defaultValue={product.Rating} className="product-rating" />
                <p className="product-sold">Đã bán {product.Sold}K</p>
                <div className='button-container'>
                  <ShoppingCartOutlined className='cart-icon' />
                  <Button block className="buy-button" >
                    Mua ngay
                  </Button>
                </div>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductHome;