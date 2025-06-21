import 'animate.css'
import '../style/ContentHome.css'
import { Card, Button, Row, Col, Rate } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import axios from 'axios';

// const { Meta } = Card;

interface Products {
    FunctionalFoodsID: number;
    NameFood: string;
    ImageFood: string;
    PriceFoods: number;
    Rating: number;
    Sold: number;
    Discount: number;
}

const ContentHome = () => {

    const [products, setProducts] = useState<Products[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/productThree")
            .then((response) => {
                console.log("API response: ", response.data);
                setProducts(response.data);
            })
            .catch((error) => console.log("Lỗi lấy sản phẩm: ", error));
    }, []);

    return (
        <div className='all-content'>
            <div className="div-1 animate__animated animate__slideInUp">
                <img style={{ height: "30px" }} src="https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/10/31/31314c12-1c71-45aa-91dd-4a92df10ecdf/Group-8042-1.svg" alt="" />
                <h2 className='maven-pro-uniquifier' style={{ marginTop: "10px", color: "rgb(65, 186, 227)", fontSize: "22px" }}>Chào mừng đến VietMed</h2>
                <h1 className='maven-pro-uniquifier' style={{ color: "rgb(23, 65, 79)", fontWeight: "bold", fontSize: "50px" }}>Các loại vitamin tốt nhất</h1>
            </div>
            <div className="div-bottom">
                <div className="div-2-3 animate__animated animate__slideInLeft">
                    <div className="div-2" style={{ marginBottom: "100px" }}>
                        <img src="https://lh3.googleusercontent.com/6OM9x4mtPbplX2KyBXqF0qhS8ZmKgZ73v2gpik4Am8dfzXtLV10bc4zjGr63mSFhaU5HN4XXpAwdEI_g86G2LVQXLWNCNqRd=rw-w120" alt="" />
                        <h2 className='title maven-pro-uniquifier'> Tốt cho tim mạch </h2>
                        <p>Thực phẩm chức năng giúp bảo vệ và tăng <br />cường sức khỏe tim mạch.</p>
                    </div>
                    <div className="div-3">
                        <img src="https://lh3.googleusercontent.com/GYMRtJWcKHDJK3ZeW2bM5XoRKPSCsuttOniyR6DEmZOLu0RA-NUZyF0aN3XMjptLZQuptMCoITaQ7WmNnfAvdSIltVz04tze=rw-w120" alt="" />
                        <h2 className='title maven-pro-uniquifier'>Cải thiện sức khoẻ</h2>
                        <p>Hỗ trợ nâng cao sức đề kháng và sức khỏe <br /> tổng thể cho mọi người.</p>
                    </div>
                </div>
                <div className="div-4 animate__animated animate__zoomIn">
                    <img style={{ marginLeft: "20px" }} src="https://lh3.googleusercontent.com/_8hVrsqiun6fQu9NMn8zMdn-ha3w_MWc-6P8EWaE2a9eOt3KK3egPG_5jxqdeUyCsXZRRkpkKKKwFHyNrpVW1A9GB2DVnxk=rw-w702" alt="" />
                </div>
                <div className="div-5-6 animate__animated animate__slideInRight" style={{ marginLeft: "10px" }}>
                    <div className="div-5" style={{ marginBottom: "100px" }}>
                        <img src="https://lh3.googleusercontent.com/_AHTi_znlJ40w1ThXuX1btwdHFSevyuZrpRHsactTC5iwhaKlEHTlZmvTNV2F44lz0Hi796-sau8YeaJNZmaqQH1w8y4DQaFDQ=rw-w120" alt="" />
                        <h2 className='title maven-pro-uniquifier'> Chắc khoẻ xương </h2>
                        <p>Bổ sung dưỡng chất giúp xương chắc khỏe,<br /> phòng ngừa loãng xương</p>
                    </div>
                    <div className="div-6">
                        <img src="https://lh3.googleusercontent.com/N5AyJP94Z2M8NzUOGd14dbU5xUgWDtNVHBIEQp3Htkw89x5owLMH-zUUtDoxFLBi-LmBaRgR3JgtTqmgrbq_Yk3Y6wnqYaw=rw-w120" alt="" />
                        <h2 className='title maven-pro-uniquifier'>Tăng cường trí nhớ </h2>
                        <p>Hỗ trợ phát triển và duy trì trí nhớ, tăng cường <br /> khả năng tập trung.</p>
                    </div>
                </div>
            </div>

            {/* our product */}
            <div className='maven-pro-uniquifier' style={{ textAlign: "center", color: "rgb(65, 186, 227)" }}>
                <h4>Sản phẩm của chúng tôi</h4>
            </div>
            <div className='our-products' style={{ marginBottom: "100px" }}>
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
        </div>
    );
};


  
export default ContentHome;