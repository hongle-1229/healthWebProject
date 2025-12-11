import '../style/ProductHome.css';
import 'animate.css';
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Card, Row, Col, Rate } from "antd";
import { useNavigate } from 'react-router-dom';

interface Product {
  FunctionalFoodsID: number;
  NameFood: string;
  ImageFood: string;
  PriceFoods: number;
  Rating: number;
  Sold: number;
  Discount: number;
  TypeID: number;
};

interface CategoryList {
  TypeID: number;
  NameType: string;
}

const ProductHome = forwardRef<HTMLDivElement>((props, ref) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<CategoryList[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/all")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data.data);
      })
      .catch((error) => console.log("Lỗi lấy sản phẩm: ", error));
  }, []);
  

// const handleAddToCart = (productId: number) => {
//   axios.post("http://localhost:5000/api/cart/add", {
//     cartId: 1,
//     productId,
//   }).then(() => {
//     alert("🛒 Đã thêm sản phẩm vào giỏ hàng!");
//   }).catch(() => {
//     message.error("❌ Thêm vào giỏ thất bại!");
//   });
//   console.log("Gửi productId:", productId);
// };

  useEffect(()=>{
    axios
      .get("http://localhost:5000/api/products/type")
      .then((response) =>{
        console.log("API Response:", response.data);
        const allCategory = {TypedID: 0, NameType: "Tất cả"};
        setTypes([allCategory, ...response.data]);
    })
      .catch((error) => console.log("Lỗi lấy sản phẩm: ", error));
  }, []);

const filterProduct = selected ? products.filter((p) => p.TypeID === selected) : products;


  return (
    <div style={{marginBottom: "100px"}}>
      <h1 ref={ref} style={{justifyContent:"center", display:"flex", fontWeight:"bold", fontSize:"40px", marginTop:"150px"}}>Danh mục sản phẩm</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
          marginLeft: "415px",
          marginBottom: "30px",
          marginTop: "60px"
        }}
      >
        {types.map((type) => (
          <div
            key={type.TypeID}
            onClick={() => setSelected(type.TypeID)}
            style={{
              border: selected === type.TypeID ? "2px solid #1890ff" : "1px solid #ddd",
              borderRadius: "12px",
              padding: "10px",
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              backgroundColor: selected === type.TypeID ? "#ebf9ffff" : "#fff",
            }}
          >
            <h2 style={{ color: "#333", fontSize: "1.2rem" }}>{type.NameType}</h2>
          </div>
        ))}
      </div>

{/* <h2
        style={{
          fontWeight: "bold",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        {selected && selected !== 0
          ? `Sản phẩm thuộc danh mục: ${types.find(t => t.TypeID === selected)?.NameType}`
          : "Tất cả sản phẩm"}
      </h2> */}

      <Row justify="center">
        {filterProduct.map((product) => (
          <Col xs={24} sm={12} md={6} key={product.FunctionalFoodsID}>
            <div className="product-card">
              {/* {product.Discount > 0 && (
                <div className="discount-badge">-{product.Discount}%</div>
              )} */}
              <Card
                onClick={()=> navigate(`/product_detail/${product.FunctionalFoodsID}`)}
                hoverable
                cover={<img alt={product.NameFood} src={product.ImageFood} className="product-image" />}
                className="product-container"
              >
                <h3 className="product-title">{product.NameFood}</h3>
                <p className="product-price">{product.PriceFoods.toLocaleString()} đ</p>
                <Rate disabled defaultValue={product.Rating} className="product-rating" />
                {/* <p className="product-sold">Đã bán {product.Sold}K</p> */}
                <div className='button-container'>

                  {/* <ShoppingCartOutlined 
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleAddToCart(product.FunctionalFoodsID);
                  }} 
                  className='cart-icon' />

                  <Button block className="buy-button" >
                    Mua ngay
                  </Button> */}
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