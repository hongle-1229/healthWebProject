import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Rate } from "antd";

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

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/all_infor?id=${id}`)
      .then(res => {
        console.log("Dữ liệu trả về: ", res.data);
        setProduct(res.data.data[0]);
      })
      .catch(err => console.error("Lỗi lấy chi tiết sản phẩm:", err));
  }, [id]);

  if (!product) return <div>Đang tải dữ liệu sản phẩm...</div>;

  return (
    <div style={{ padding: "24px", width: "90vw", backgroundColor:"#ffffff", margin: "50px 70px"  }}>
      <div style={{display: "flex"}}>
        <div>
            <img src={product.ImageFood} alt={product.NameFood} style={{ width: "600px", borderRadius: "12px", objectFit: "cover" }} />
        </div>
        <div style={{margin:"20px 60px"}}>
            <h1 style={{width: "700px"}}>{product.NameFood}</h1>
            <p style={{fontSize: "23px"}}> <strong>Giá:</strong> {product.PriceFoods.toLocaleString()} đ</p>
            <p style={{fontSize: "23px"}}> <strong>Đã bán:</strong> {product.Sold}K</p>
            <strong style={{fontSize: "23px"}}>Đánh giá: </strong> ({product.Rating}) 
            <Rate disabled defaultValue={product.Rating} className="product-rating" /> 
        </div>
      </div>
      <div >
        <h1><strong>Công dụng:</strong></h1>
        <ReactMarkdown>{product.Benefit}</ReactMarkdown>
      </div>
      <h1><strong>Hướng dẫn sử dụng:</strong></h1>
      <ReactMarkdown>{product.Instructions}</ReactMarkdown>
      <h1><strong>Lưu ý:</strong></h1>
      <ReactMarkdown>{product.Alert}</ReactMarkdown>
      {/* <div>
        <h1>Đánh giá</h1>
      </div> */}
    </div>
  );
};

export default DetailProduct;
