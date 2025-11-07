  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { Form, Input, Button, Card, message } from "antd";
  import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
  import { motion } from "framer-motion";
  import "../style/Register.css"; 

  const Register = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleRegister = async (values) =>{
      console.log("Gia tri nhap: ", values);
      
      try {
        const res = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
          UserName: values.username,
          Email: values.email,
          PassWordUser: values.password
          }),
        });

        const data = await res.json();

        if (res.ok){
          message.success("Đăng ký thành công!");
          alert(" 🎉 Đăng ký thành công! Vui lòng đăng nhập để tiếp tục!");
          setTimeout(()=>{
            setIsLogin(true);
          }, 1000);
        }
        else {
          message.error(data.error || "Đăng ký thất bại!");
        }

      } catch (error) {
        console.error("Lỗi: ", error);
        message.error("Không thể kết nối đến server!");
      }
    };

    const handleLogin = async (values) =>{
      console.log("Đăng nhập với : ", values);

      try {
        const res = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            UserName: values.username,
            PassWordUser: values.password
          }),
        });

        const data = await res.json();

        if (res.ok){
          message.success("Đăng nhập thành công!");
          alert(` 🎉 Đăng nhập thành công! Chào mừng ${data.user.username} đã quay trở lại!`);

          localStorage.setItem("user", JSON.stringify(data.user));

          window.location.href="/home";
        }
        else{
          message.error(data.error || "Đăng nhập thật bại!");
          alert ("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
        }
        
      } catch (error) {
        console.log(error);
        message.error("Không thể kết nối đến server!");
      }
    }

    return (
      <div className="all" style={{backgroundColor: "#b2bebf", height: "100vh"}}>
        <div className="auth-container">
        {/* Form Đăng Ký */}
        <div className="form-container register">
          <Card className="form-box">
            <h2 className="title">Đăng ký</h2>
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item  name="username" rules={[{ required: true}]}>
                <Input className="input" prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
              </Form.Item>

              <Form.Item  name="email" rules={[{ required: true, type: "email" }]}>
                <Input className="input" prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item  name="password" rules={[{ required: true }]}>
                <Input.Password className="input" prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Button className="submit" type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form>
          </Card>
        </div>

        {/* Form Đăng Nhập */}
        <div className="form-container login">
          <Card className="form-box">
            <h2 className="title">Đăng nhập</h2>
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item  name="username" rules={[{ required: true }]}>
                <Input className="input" prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
              </Form.Item>

              <Form.Item  name="password" rules={[{ required: true }]}>
                <Input.Password className="input" prefix={<LockOutlined />} placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Button className="submit" type="primary" htmlType="submit" block>
                Đăng nhập
              </Button>
            </Form>
            <Link to="/forgot-password" className="text-blue-500 text-sm forgot-password" style={{paddingTop:"20px"}}>Quên mật khẩu?</Link>
          </Card>
          
        </div>

        {/* Phần che xanh trượt qua lại */}
        <motion.div
          className="auth-slider"
          animate={{ x: isLogin ? "-100%" : "0%" }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        >
          <h1>{isLogin ? "Chào mừng trở lại!" : "Gia nhập với chúng tôi!"}</h1>
          <p>{isLogin ? "Không có tài khoản?" : "Bạn đã có tài khoản?"}</p>
          <Button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </Button>
        </motion.div>
      </div>
      </div>
    );
  };
  export default Register;

