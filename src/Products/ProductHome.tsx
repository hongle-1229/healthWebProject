import '../style/ProductHome.css';
import 'animate.css';
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import {message} from "antd"

interface Product {
  FunctionalFoodsID: number;
  NameFood: string;
  ImageFood: string;
  PriceFoods: number;
  Rating: number;
  Sold: number;
  Discount: number;
};

const ProductHome = forwardRef<HTMLDivElement>((props, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data.data);
      })
      .catch((error) => console.log("Lỗi lấy sản phẩm: ", error));
  }, []);

 const handleAddToCart = (productId: number) => {
  axios.post("http://localhost:5000/api/cart/add", {
    cartId: 1,
    productId,
  }).then(() => {
    alert("🛒 Đã thêm sản phẩm vào giỏ hàng!");
  }).catch(() => {
    message.error("❌ Thêm vào giỏ thất bại!");
  });
  console.log("Gửi productId:", productId);
};


  return (
    <div style={{marginBottom: "100px"}}>
      <h1 ref={ref} style={{justifyContent:"center", display:"flex", fontWeight:"bold", fontSize:"40px", marginTop:"150px"}}>Sản phẩm của chúng tôi</h1>
      <Row justify="center">
        {products.map((product) => (
          <Col xs={24} sm={12} md={6} key={product.FunctionalFoodsID}>
            <div className="product-card">
              {product.Discount > 0 && (
                <div className="discount-badge">-{product.Discount}%</div>
              )}
              <Card
                onClick={()=> navigate(`/product_detail/${product.FunctionalFoodsID}`)}
                hoverable
                cover={<img alt={product.NameFood} src={product.ImageFood} className="product-image" />}
                className="product-container"
              >
                <h3 className="product-title">{product.NameFood}</h3>
                <p className="product-price">{product.PriceFoods.toLocaleString()} đ</p>
                <Rate disabled defaultValue={product.Rating} className="product-rating" />
                <p className="product-sold">Đã bán {product.Sold}K</p>
                <div className='button-container'>

                  <ShoppingCartOutlined 
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleAddToCart(product.FunctionalFoodsID);
                  }} 
                  className='cart-icon' />

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
});

export default ProductHome;