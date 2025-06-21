import { Button, Form, Input, InputNumber } from 'antd';
import "../style/AllContact.css"

interface FormValues {
  user: {
    name: string;
    email: string;
    age: number;
    phone: string;
    introduction?: string;
  };
}

const AllContact: React.FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div >
      <div style={{marginLeft: "230px", marginTop: "50px"}}>
      <h1 style={{color:"rgb(23, 65, 79)"}}>Liên hệ với chúng tôi</h1>
      <p style={{color: "#353535"}}>
        <b style={{color:"rgb(23, 65, 79)"}}>Địa chỉ</b>: Số 8 - Ngõ 12 - Lê Trọng Tấn - Hà Đông - Hà Nội <br />
        <b style={{color:"rgb(23, 65, 79)"}}>Số điện thoại</b>: 036 538 5143 <br />
        <b style={{color:"rgb(23, 65, 79)"}}>Email</b>: hongle1229@gmail.com <br />
        <b style={{color:"rgb(23, 65, 79)"}}>Giờ làm việc</b>: Thứ Hai - Thứ bảy, 9:00 AM - 18:00 PM
      </p>
      <i>
        <p>Chúng tôi rất vui khi nhận được phản hồi từ bạn. Nếu bạn có bất kì ý kiến nào hãy liên hệ với chúng tôi qua các kênh sau đây:</p>
      </i>
      </div>

      <Form
        {...layout}
        name="contact-form"
        onFinish={onFinish}
        style={{ maxWidth: 600, marginLeft: "130px" }}
        validateMessages={validateMessages}
      >
        <Form.Item name={['user', 'name']} label="Tên của bạn" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item name={['user', 'age']} label="Tuổi" rules={[{ type: 'number', min: 0, max: 99 }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          name={['user', 'phone']}
          label="Số điện thoại"
          rules={[
            { required: true, message: 'Số điện thoại là bắt buộc' },
            {
              pattern: /^[0-9]{10}$/,
              message: 'Số điện thoại phải gồm 10 chữ số',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={['user', 'introduction']} label="Phản hồi">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>

      
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'normal', color:"rgb(23, 65, 79)" }}>Theo dõi chúng tôi trên:</h2>
        <a
          href="#"
          target="_blank"
          style={{ textDecoration: 'none', color: '#1877f2' }}
        >
          Facebook
        </a>
        <span style={{ margin: '0 10px', color: '#000' }}>|</span>
        <a
          href="#"
          target="_blank"
          style={{ textDecoration: 'none', color: '#1877f2' }}
        >
          Instagram
        </a>
      </div>
      <h2 style={{marginLeft: "230px", fontWeight:"600", color:"rgb(23, 65, 79)"}}>Vị trí của chúng tôi: </h2>
      <div style={{ width: '70%', height: '500px', margin:"50px auto" }}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.676898493035!2d105.85444431529527!3d21.028511193525682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abcb9277fe4b%3A0x210be810a5742a87!2zSGFub2kgVGFuIFh1YW5n!5e0!3m2!1svi!2s!4v1672492012768!5m2!1svi!2s"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen={true}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>

    </div>
  );
};

export default AllContact;
