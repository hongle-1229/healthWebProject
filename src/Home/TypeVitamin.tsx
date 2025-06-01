import { Card, Row, Col, Typography } from 'antd';

const { Title, Text, Link } = Typography;

const products = [
    {
        id: 1,
    title: 'Type of Vitamins',
    description:
      'Explore essential nutrients for your health and well-being. Learn about each type in detail.',
    isIntro: true,
    },
    {
        id: 2,
      title: 'Vitamin C',
      description: 'Vitamin C as ascorbic acid',
      image: 'https://lh3.googleusercontent.com/dXhK2mBr4IEB6g58NOhpCa2fBivBv2W35VT4W1nyqwL3lJpAvwGy2bx_7kppghkoPgcQPODTly0QIkQeM7zPCusBkoZHK4AG=w410',
    },
    {
        id: 3,
      title: 'Magnesium',
      description: 'Vitamin C as ascorbic acid',
      image: 'https://lh3.googleusercontent.com/wClc5YJYCsil-i4jF0gHyYpq1V8B51xL3rIGt84SYYB99naipB-BnaEJj6m_xRcB8Tb3ZRiTDujyTc8y-Q1gDKOSNirkM5W_=w200',
    },
    {
        id: 4,
        title: 'Vitamin D',
        description: 'hdjsgdhgdf',
        image: 'https://lh3.googleusercontent.com/98u9BYwZoGz7ei2aT1qHLLzssqiXTCuTvUQGe6pCSf9aZgHEUiIb1KfG0XUSLLg7oNcMG_OQhwOdMWine8IAVPxsIVTbQgs=w410',
    },
    {
        id: 5,
        title: 'Vitamin D',
        description: 'hdjsgdhgdf',
        image: 'https://lh3.googleusercontent.com/EwDQ6eHkIqaxTjOuIoHgHddDq56RVcj9crADo14zrV1E6slArCcQSz_ifJZd7p9T3vSEDwdbuaMemqpJ-DQfT1x9iRRi4JD6Uw=w410',
    },
    {
        id: 6,
        title: 'Vitamin D',
        description: 'hdjsgdhgdf',
        image: 'https://lh3.googleusercontent.com/w7Oi9eauoBkS8WQxZQueBzsJgtoRLrP_aPn0sNhhgUUiRp0fZh4nkyg5HDV8yfE6r3QbH3EdR2XXRvdSvm4l9Ynvfv9s8g3q=w410',
    },
  ];

const TypeVitamin = () => {
    return (
        <div style={{ padding: '40px' }}>
      <Row gutter={[0, 25]}>
        {products.map((product, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable={!product.isIntro}
              style={{
                borderRadius: product.isIntro ? "none" : "none",
                backgroundColor: product.isIntro ? '#fff' : '#e6f7ff',
                backgroundImage: product.image && !product.isIntro ? `url(${product.image})` : 'none',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right bottom',
                backgroundSize: product.id/2==0 ? 'auto 100%' : "60%",
                minHeight: 180,
                maxWidth: 350,
                transition: 'transform 0.3s ease',
              }}
                // bodyStyle={{
                //     padding: '24px',
                //     height: '100%',
                // }}
              onMouseEnter={e => {
                if (!product.isIntro) e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                if (!product.isIntro) e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div style={{ maxWidth: product.isIntro ? '100%' : '60%' }}>
                <Title level={product.isIntro ? 3 : 4} style={{ marginBottom: 8 }}>
                  {product.title}
                </Title>
                <Text strong style={{ color: '#595959' }}>
                  {product.description}
                </Text>
                {!product.isIntro && (
                  <div style={{ marginTop: 16 }}>
                    <Link href="#" style={{ color: '#1890ff', fontWeight: 500 }}>
                      See More →
                    </Link>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    );
};

export default TypeVitamin;