// định nghĩa các routes cho users
import express from "express";
import bcrypt from "bcryptjs";
import { sql, poolPromise } from "../config/connect_sql.js";

const route = express.Router();


route.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT * FROM users");

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


route.post('/register', async (req, res) => {
    try {
        const { UserName, PassWordUser, Email } = req.body;

        if (!UserName || !PassWordUser || !Email) {
            return res.status(400).json({ message: "Vui lòng điển đầy đủ thông tin!" });
        }

        const hashPassword = await bcrypt.hash(PassWordUser, 10);

        const pool = await poolPromise;

        const checkUser = await pool.request()
            .input('email', sql.NVarChar, Email)
            .query("SELECT * FROM users WHERE Email = @email");

        if (checkUser.recordset.length > 0) {
            return res.status(409).json({ message: "Email đã tồn tại!" });
        }

        await pool.request()
            .input("username", sql.NVarChar, UserName)
            .input("password", sql.NVarChar, hashPassword)
            .input("email", sql.NVarChar, Email)
            .query("INSERT INTO users (UserName, PassWordUser, Email) VALUES (@username, @password, @email)")

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
})


/* ==============================
   3. LOGIN
============================== */
route.post('/login', async (req, res) => {
    try {
        const { UserName, PassWordUser } = req.body;

        if (!UserName || !PassWordUser) {
            return res.status(400).json({ message: "Vui lòng nhập tên và mật khẩu để đăng nhập!" });
        }

        const pool = await poolPromise;
        const result = await pool.request()
            .input("username", sql.NVarChar, UserName)
            .query("SELECT * FROM users WHERE UserName = @username");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Tài khoản không tồn tại!" });
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(PassWordUser, user.PassWordUser);

        console.log("Check password: ", isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: "Mật khẩu không đúng!" });
        }

        res.status(200).json({
            message: "Đăng nhập thành công!",
            user: {
                // key(tên field trả về cho front-end): value (DB)
                id: user.UserID,
                username: user.UserName,
                email: user.Email,

                FullName: user.FullName,
                PhoneNumber: user.PhoneNumber,
                ImageUser: user.ImageUser,
                RoleUser: user.RoleUser
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});


/* ==============================
   GET USER BY ID
============================== */
route.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const pool = await poolPromise;
        const result = await pool.request()
            .input("id", sql.Int, id)
            .query(`
                SELECT UserID, UserName, Email, FullName, PhoneNumber, ImageUser
                FROM users
                WHERE UserID = @id
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }

        const user = result.recordset[0];

        res.json({
            UserID: user.UserID,
            UserName: user.UserName,
            Email: user.Email,
            FullName: user.FullName,
            PhoneNumber: user.PhoneNumber,
            ImageUser: user.ImageUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ==============================
   5. API UPDATE PROFILE (Hợp nhất)
   - cập nhật thông tin cơ bản
   - nếu ImageUser (base64) có => cập nhật Avatar
   - nếu NewPassword có => kiểm tra OldPassword rồi cập nhật
============================== */
route.put('/update/:id', async (req, res) => {
    try {
        const { UserName, FullName, Email, PhoneNumber, ImageUser, OldPassword, NewPassword } = req.body;
        const { id } = req.params;
        const pool = await poolPromise;

        // 1) Cập nhật thông tin cơ bản
        await pool.request()
            .input("id", sql.Int, id)
            .input("username", sql.NVarChar, UserName)
            .input("fullname", sql.NVarChar, FullName)
            .input("email", sql.NVarChar, Email)
            .input("phone", sql.NVarChar, PhoneNumber)
            .query(`
                UPDATE users 
                SET UserName = @username,FullName = @fullname, Email = @email, PhoneNumber = @phone
                WHERE UserID = @id
            `);

        // 2) Nếu có ImageUser (Base64) -> lưu vào Avatar (NVARCHAR(MAX))
        if (ImageUser && typeof ImageUser === "string" && ImageUser.trim() !== "") {
            await pool.request()
                .input("id", sql.Int, id)
                .input("avatar", sql.NVarChar(sql.MAX), ImageUser)
                .query(`
                    UPDATE users
                    SET ImageUser = @avatar
                    WHERE UserID = @id
                `);
        }

        // 3) Nếu có đổi mật khẩu yêu cầu OldPassword + NewPassword
        if (NewPassword) {
            if (!OldPassword) {
                return res.status(400).json({ message: "Nhập mật khẩu của bạn!" });
            }

            const q = await pool.request()
                .input("id", sql.Int, id)
                .query("SELECT PassWordUser FROM users WHERE UserID = @id");

            if (q.recordset.length === 0)
                return res.status(404).json({ message: "User không tồn tại!" });

            const currentHash = q.recordset[0].PassWordUser;

            // 1️. Check mật khẩu cũ đúng
            const match = await bcrypt.compare(OldPassword, currentHash);
            if (!match)
                return res.status(401).json({ message: "Mật khẩu cũ không đúng!" });

            // 2️. Check mật khẩu mới trùng mật khẩu cũ
            const isSamePassword = await bcrypt.compare(NewPassword, currentHash);
            if (isSamePassword)
                return res.status(400).json({
                    message: "Mật khẩu mới không được trùng mật khẩu cũ!"
                });

            // 3️. Hash & update
            const newHash = await bcrypt.hash(NewPassword, 10);
            await pool.request()
                .input("id", sql.Int, id)
                .input("newpass", sql.NVarChar, newHash)
                .query("UPDATE users SET PassWordUser = @newpass WHERE UserID = @id");
        }


        // 4) Trả về user đã cập nhật
        const updated = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT UserID, UserName, Email, FullName, PhoneNumber, ImageUser FROM users WHERE UserID = @id");

        res.json({ message: "Cập nhật thành công!", user: updated.recordset[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

/* ==============================
   6. API ĐỔI MẬT KHẨU (riêng nếu cần)
============================== */
route.put('/change-password/:id', async (req, res) => {
    try {
        const { OldPassword, NewPassword } = req.body;
        const { id } = req.params;

        const pool = await poolPromise;

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT PassWordUser FROM users WHERE UserID = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "User không tồn tại!" });
        }

        const user = result.recordset[0];
        const match = await bcrypt.compare(OldPassword, user.PassWordUser);
        if (!match) return res.status(401).json({ message: "Mật khẩu cũ không đúng!" });

        const hashNew = await bcrypt.hash(NewPassword, 10);
        await pool.request()
            .input("id", sql.Int, id)
            .input("newpass", sql.NVarChar, hashNew)
            .query("UPDATE users SET PassWordUser = @newpass WHERE UserID = @id");

        res.json({ message: "Đổi mật khẩu thành công!" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/* ==============================
   7. API UPDATE AVATAR (BASE64) — giữ lại nếu frontend muốn gọi riêng
============================== */
route.put('/avatar/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { ImageUser } = req.body;

        if (!ImageUser || ImageUser.trim() === "") {
            return res.status(400).json({ message: "Không có dữ liệu ảnh Base64!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input("id", sql.Int, id)
            .input("avatar", sql.NVarChar(sql.MAX), ImageUser)
            .query(`
                UPDATE users 
                SET ImageUser = @avatar
                WHERE UserID = @id
            `);

        res.json({
            message: "Cập nhật avatar (Base64) thành công!",
            avatar: ImageUser
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default route;