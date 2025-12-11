import React, { useEffect, useState } from 'react';
import "../style/BaseCss.css";
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/image/logo.png';
import type { MenuProps } from 'antd';
import { Menu, Button, Drawer } from 'antd';
import { Outlet } from 'react-router-dom';
import Footerr from './Footerr';
import {
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { Input } from 'antd';
import useResponsive from '../useResponsive';

const { Search } = Input;

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

const ScrolltoTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
};

const Headerr = () => {
  const { isMobile } = useResponsive();
  const [open, setOpen] = useState(false);

  // ===== CUSTOM POPUP LOGOUT =====
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLogin = !!user;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/home";
  };

  // ====== ITEMS MENU ======
  const items: MenuItem[] = [
    getItem(<Link to="/home">Trang chủ</Link>, '1'),
    getItem(<Link to="/about_us">Về chúng tôi</Link>, '2'),
    getItem(<Link to="/first_aid">Tư vấn sơ cứu</Link>, '3'),
    getItem(<Link to="/products">Thực phẩm chức năng</Link>, '4'),
    getItem(<Link to="/body"><FontAwesomeIcon style={{ fontSize: "25px" }} icon={faUserDoctor} /></Link>, '5'),
    getItem(<Link to="/blog">Tin tức</Link>, '6'),
    getItem(<Link to="/contact">Liên hệ</Link>, '7'),
    getItem(<Search className='custom-search'></Search>, "15"),

    // ===== MENU TÀI KHOẢN =====
    getItem(
      <span style={{ color: "#9090D7" }}>
        {isLogin ? user.username : "Tài khoản"}
      </span>,
      "sub5",
      <UserOutlined className="custom-icon" style={{ color: "white", fontSize: 18 }} />,
      [
        ...(isLogin
          ? [
            getItem(<Link to="/profile">Tài khoản của tôi</Link>, "17"),
            getItem(
              <span onClick={() => setShowLogoutPopup(true)}>Đăng xuất</span>,
              "18"
            ),
            getItem(<Link to="/history-test">Lịch sử làm bài</Link>, "20"),
            getItem(<Link to="/history-lookUp">Lịch sử tra cứu</Link>, "21"),
          ]
          : [
            getItem(<Link to="/login">Đăng nhập</Link>, "18"),
          ]
        )
      ]
    ),
  ];

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      {showLogoutPopup && (
        <div className="logout-overlay">
          <div className="logout-box">
            <h2>Bạn có chắc muốn đăng xuất?</h2>
            <div className="logout-buttons">
              <button className="btn-yes" onClick={handleLogout}>Có</button>
              <button className="btn-no" onClick={() => setShowLogoutPopup(false)}>Không</button>
            </div>
          </div>
        </div>
      )}
      <div>
        <ScrolltoTop />

        {/* ========= HEADER ========= */}
        <div
          className='header-all'
          style={{
            backgroundColor: "rgb(225, 244, 251)",
            display: "flex",
            paddingTop: "10px",
            position: 'fixed',
            top: 0,
            zIndex: 1000,
            width: "100%"
          }}
        >
          <Link to="/home">
            <img
              src={logo}
              alt=""
              style={{
                height: "55px",
                objectFit: "cover",
                paddingLeft: "90px",
                paddingBottom: "10px"
              }}
            />
          </Link>

          {isMobile ? (
            <>
              <Button
                icon={<MenuOutlined />}
                onClick={showDrawer}
                style={{
                  fontSize: "24px",
                  border: "none",
                  background: "none",
                  paddingLeft: "350px",
                  paddingTop: "15px"
                }}
              />

              <Drawer
                title="Danh mục"
                placement="right"
                onClose={onClose}
                open={open}
              >
                <Menu
                  mode="vertical"
                  items={items}
                  onClick={(e) => {
                    if (e.key === "18" && isLogin) {
                      setShowLogoutPopup(true);
                    }
                    onClose();
                  }}
                />
              </Drawer>
            </>
          ) : (
            <Menu
              className='menu-header ant-menu-item markazi-text-uniquifier'
              defaultSelectedKeys={['1']}
              mode="horizontal"
              items={items}
              style={{
                backgroundColor: "rgb(225, 244, 251)",
                width: "100%",
                marginTop: "18px",
                marginLeft: "40px",
                fontSize: "22px"
              }}
            />
          )}
        </div>

        <Outlet />
        <Footerr />
      </div>
    </>
  );
};

export default Headerr;
