import React from 'react';
import "../style/BaseCss.css";
import { Link } from 'react-router-dom';
import logo from '../assets/image/logo.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Outlet } from 'react-router-dom';
import Footerr from './Footerr';
 import {
//   // DesktopOutlined,
//   FileOutlined,
//   MedicineBoxOutlined,
//   TeamOutlined,
 UserOutlined,
 ShoppingCartOutlined
} from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserDoctor} from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
// import AllHome from '../Home/AllHome';
const { Search } = Input;
// import { img } from 'framer-motion/client';
// import { faKitMedical } from '@fortawesome/free-solid-svg-icons';
// const { Header } = Layout;

// const items1: MenuProps['items'] = ['Trang chủ', 'Về chúng tôi', 'Liên hệ'].map((key) => ({
//   key,
//   label: `${key}`,
// }));

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/home">Trang chủ</Link>, '1'),
  getItem(<Link to="/about_us">Về chúng tôi</Link>, '2'),
  getItem(<Link to="/first_aid">Tình huống sơ cứu</Link>, 
    'sub1', 
    null,
    // [
    //   getItem('Sơ cứu người đuối nước', '3'),
    //   getItem('Sơ cứu khi bị bỏng', '4'),
    //   getItem('Sơ cấp cứu khi bị điện giật', '5')
    // ]
  ),
  getItem(
    <Link to="/products">Thực phẩm chức năng</Link>,
    'sub2',
    null,
    // [
    //   getItem('Cho người cao tuổi', '6'),
    //   getItem('Cho trẻ em', '7'),
    //   getItem('Cho phụ nữ có thai', '8')
    // ]
  ),
  getItem(<Link to="/body"><FontAwesomeIcon style={{fontSize:"25px"}} icon={faUserDoctor}/></Link>, 13),

  // getItem('User', 'sub3', <UserOutlined />, [
  //   getItem('Tom', '9'),
  //   getItem('Bill', '10'),
  //   getItem('Alex', '11'),
  // ]),
  getItem(<Link to="/blog">Tin tức</Link>, 'sub4', 
    // [getItem('Team 1', '12'), getItem('Team 2', '13')]
  ),
  getItem(<Link to="/contact">Liên hệ</Link>, '14'),
  getItem(<Search className='custom-search'></Search>, "15"),
  getItem(<Link to="/cart"><ShoppingCartOutlined className='custom-cart' style={{fontSize:"30px", color:"#9090D7"}}></ShoppingCartOutlined></Link>, "16"),
  getItem(<Link to="/infor"></Link>, 'sub5', <UserOutlined className='custom-icon' style={{color:"white", fontSize: "18px"}}></UserOutlined>, [
    getItem(<Link to="/profile" className='submenu-item'>Tài khoản của tôi</Link>, '17'),
    getItem (<Link to="/login" className='submenu-item'>Đăng nhập</Link>, '18')
  ])
];

const Headerr = () => {
  return (
    <div>
      <div className='header-all' style={{backgroundColor: "rgb(225, 244, 251)", display: "flex", paddingTop:"10px", paddingBottom:"10px"}}>
        <img src={logo} alt="" style={{height: "55px", objectFit: "cover", paddingLeft:"90px"}}/>
      <Menu className='menu-header ant-menu-item markazi-text-uniquifier' defaultSelectedKeys={['1']} mode="horizontal" items={items} style={{ backgroundColor: "rgb(225, 244, 251)", width: "100%", marginTop: "15px", marginLeft:"40px", fontSize: "22px" }} />
      </div>
      <Outlet/>
      {/* <AllHome></AllHome> */}
      <Footerr></Footerr>
    </div>
  );
};

export default Headerr;