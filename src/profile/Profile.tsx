import { useEffect, useState } from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Upload,
    Avatar,
    Row,
    Col,
    Spin,
    message,
} from "antd";
import type { UploadProps } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";


// dữ liệu trả về từ api
type UserDto = {
    id: number;
    username: string;
    email: string | null;
    FullName: string | null;
    PhoneNumber: string | null;
    ImageUser: string | null;
    RoleUser: string | null;
};

export default function AccountProfile() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [user, setUser] = useState<UserDto | null>(null);

    // const userId = localStorage.getItem("userId");

    /* ================= LOAD USER ================= */
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            message.error("Chưa đăng nhập");
            setLoading(false);
            return;
        }

        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        async function loadUser() {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/users/${parsedUser.id}`
                );
                if (!res.ok) throw new Error("Không thể tải dữ liệu");

                const data = await res.json();

                setAvatar(data.ImageUser);

                form.setFieldsValue({
                    UserName: data.UserName,
                    FullName: data.FullName,
                    Email: data.Email,
                    PhoneNumber: data.PhoneNumber,
                });
            } catch (err: any) {
                message.error(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [form]);



    /* ================= AVATAR ================= */
    const uploadProps: UploadProps = {
        beforeUpload: (file) => {
            if (file.size > 5 * 1024 * 1024) {
                message.error("Ảnh tối đa 5MB");
                return Upload.LIST_IGNORE;
            }

            const reader = new FileReader();
            reader.onload = () => setAvatar(reader.result as string);
            reader.readAsDataURL(file);

            return false;
        },
        showUploadList: false,
    };

    /* ================= SAVE ================= */
    const handleSubmit = async (values: any) => {
        if (!user?.id) {
            message.error("Không xác định được người dùng");
            return;
        }

        if (values.NewPassword || values.ConfirmPassword) {
            if (values.NewPassword !== values.ConfirmPassword) {
                message.error("Mật khẩu xác nhận không khớp");
                alert("Mật khẩu không khớp, vui lòng nhập lại!");
                return;
            }
    }

        setSaving(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/users/update/${user.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        UserName: values.UserName ?? null,
                        FullName: values.FullName ?? null,
                        Email: values.Email ?? null,
                        PhoneNumber: values.PhoneNumber ?? null,
                        ImageUser: avatar ?? null,
                        OldPassword: values.OldPassword || null,
                        NewPassword: values.NewPassword || null,
                    }),
                }
            );

            if (!res.ok){
                const err = await res.json();
                message.error(err.message);
                throw new Error("Cập nhật thất bại");
            }

            const result = await res.json();

            // cập nhật lại localStorage

            const updatedUser = {
                ...user,
                username: result.user.UserName,
                FullName: result.user.FullName,
                email: result.user.Email,
                PhoneNumber: result.user.PhoneNumber,
                ImageUser: result.user.ImageUser,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            // báo toàn app user đã đổi
            window.dispatchEvent(new Event("userUpdated"));

            alert(" 🎉 Cập nhật thành công");

        } catch (err: any) {
            message.error(err.message);
        } finally {
            setSaving(false);
        }
    };


    /* ================= RENDER ================= */
    if (loading) {
        return (
            <div style={{ textAlign: "center", padding: 80 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return <div style={{ textAlign: "center" }}>Không có dữ liệu người dùng</div>;
    }

    return (
        <Card title="Quản lý tài khoản" style={{ maxWidth: 900, margin: "80px auto" }}>
            <Row gutter={32}>
                <Col span={6} style={{ textAlign: "center" }}>
                    <Avatar
                        size={140}
                        src={avatar || undefined}
                        icon={<UserOutlined />}
                    />

                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                            Đổi ảnh
                        </Button>
                    </Upload>

                    <Button danger style={{ marginTop: 8 }} onClick={() => setAvatar(null)}>
                        Xóa ảnh
                    </Button>
                </Col>

                <Col span={18}>
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                        <Form.Item label="Tên đăng nhập" name="UserName">
                            <Input  />
                        </Form.Item>

                        <Form.Item label="Họ và tên" name="FullName">
                            <Input />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email" name="Email">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số điện thoại" name="PhoneNumber">
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Mật khẩu cũ" name="OldPassword">
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label="Mật khẩu mới" name="NewPassword">
                            <Input.Password />
                        </Form.Item>

                        <Form.Item label="Xác nhận mật khẩu" name="ConfirmPassword">
                            <Input.Password />
                        </Form.Item>

                        <Form.Item style={{ textAlign: "right" }}>
                            <Button type="primary" htmlType="submit" loading={saving}>
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Card>
    );
}
