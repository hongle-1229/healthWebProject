import React from 'react';
import '../style/BaseCss.css';
// import { Footer } from "antd/es/layout/layout";
import {
    FacebookFilled, 
    YoutubeFilled, 
    InstagramFilled, 
    TikTokFilled, 
    PhoneFilled,
    MailFilled,
    HomeFilled
} from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import type { FormItemProps } from 'antd';
const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({
  prefix,
  children,
}) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};
const Footerr = () => {
    const onFinish = (value: object) => {
        console.log(value);
      };
    return (
        <div style={{display:"flex", backgroundColor:"#17414F", color: "white"}}>
            <div className="block-1 marginLeft-110px marginTop-30px">
                <img src="src/assets/image/vietmed.png" alt="" style={{height:"100px", objectFit: "cover", marginBottom: "20px"}}/>
                <p style={{color: "white"}}>
                Sức khỏe của bạn là ưu tiên hàng đầu <br /> của chúng tôi. Chúng tôi luôn đồng hành cùng bạn, <br /> giúp bạn dễ dàng tra cứu thông tin sơ cứu, <br /> thực phẩm chức năng và kiến thức y tế cần thiết.
                </p>
                <div className="block-network-society" style={{display: "flex", gap:"20px", alignItems:"center"}}>
                <FacebookFilled className='font-30px' style={{color:"blue", backgroundColor: "white", border: "none"}}/>
                <YoutubeFilled className='font-30px' style={{color:"red", backgroundColor: "white"}}/>
                <InstagramFilled className='font-30px' style={{color:"#f8690a", backgroundColor:"white"}}/>
                <TikTokFilled className='font-30px' style={{color: "black", backgroundColor:"white"}}/>
                </div>
            </div>
            <div className="block-2 marginLeft-110px marginTop-60px">
                <div className="title-contact font-30px">
                    Liên hệ với chúng tôi
                </div>
                <div className="block-contact">
                    <ul style={{listStyle: "none", display:"inline"}}>
                    <li style={{paddingBottom:"10px"}}><PhoneFilled /> 0123456789</li>
                    <li style={{paddingBottom: "10px"}}><MailFilled /> VietMed123@gmail.com</li>
                    <li><HomeFilled /> 123 Streetnam, District, City</li>
                    </ul>
                </div>
            </div>
            <div className="block-3 marginLeft-110px marginTop-60px marginBottom-30px">
                <div className="title-send-infor font-30px">
                    Gửi thông tin của bạn cho chúng tôi
                </div>
                <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                    <MyFormItemGroup prefix={['user']}>
                        <MyFormItemGroup prefix={['name']}>
                            <MyFormItem  name="name" label={<span style={{ color: "#d4d4d4", fontSize:"16px" }}>Tên</span>} rules={[{required: true}]} style={{marginBottom:"5px"}}>
                                <Input />
                            </MyFormItem>
                            <MyFormItem name="email" label={<span style={{ color: "#d4d4d4", fontSize:"16px" }}>Email</span>}  rules={[{required: true}]} style={{marginBottom:"5px"}}>
                                <Input />
                            </MyFormItem>
                        </MyFormItemGroup>

                        <MyFormItem name="phone" label={<span style={{ color: "#d4d4d4", fontSize:"16px" }}>Số điện thoại</span>}  rules={[{required: true}]}>
                            <Input />
                        </MyFormItem>
                    </MyFormItemGroup>

                    <Button className='markazi-text-uniquifier' type="primary" htmlType="submit" style={{backgroundColor: "white", color: "#5a5959", width:"200px", borderRadius:"20px", fontSize: "25px"}}>
                       Gửi
                    </Button>
                </Form>
            </div>
            {/* <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer> */}
        </div>
    );
};

export default Footerr;