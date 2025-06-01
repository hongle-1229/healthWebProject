import { Card, Col, Row } from 'antd';
// import { div, h1 } from 'framer-motion/client';
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import { Avatar} from 'antd';

const { Meta } = Card;

const OurTeam: React.FC = () => (
    <div>
        <h1 style={{textAlign:"center", fontWeight:"bold", fontSize:"40px", marginTop:"120px"}}>Đội ngũ của chúng tôi</h1>
        <Row style={{display:"flex", gap:"80px", marginLeft:"180px", marginTop:"40px", marginBottom:"150px"}}>
        <Col span={6}>
            <Card
                style={{ width: 350, textAlign:"center" }}
                cover={
                    <img
                        alt="example"
                        src="https://online-learning-college.com/wp-content/uploads/2023/01/Qualifications-to-Become-a-Doctor--scaled.jpg"
                    />
                }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
            >
                <Meta
                    //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Travis Kelce"
                    description="Pharmacist"
                />
            </Card>

        </Col>
        <Col span={6}>
            <Card
                style={{ width: 350, textAlign:"center" }}
                cover={
                    <img
                        alt="example"
                        src="https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
                    />
                }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
            >
                <Meta
                    //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Taylor Swift"
                    description="Pharmacist"
                />
            </Card></Col>
        <Col span={6}>
            <Card
                style={{ width: 350, textAlign:"center" }}
                cover={
                    <img
                        alt="example"
                        src="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
                    />
                }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
            >
                <Meta
                    //   avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Travis Kelce"
                    description="Pharmacist"
                />
            </Card></Col>
    </Row>
    </div>

);

export default OurTeam;