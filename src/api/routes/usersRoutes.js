// định nghĩa các routes cho users
import express from "express";
import bcrypt from "bcryptjs";
import {sql, poolPromise} from "../config/connect_sql.js";

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT * FROM users");

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({error: err.message});
    }    
})


route.post('/register', async(req, res) =>{
    try {
        const {UserName, PassWordUser, Email} = req.body;

        if (!UserName || !PassWordUser || !Email){
            return res.status(400).json({message: "Vui lòng điển đầy đủ thông tin!"});
        }

        const hashPassword = await bcrypt.hash(PassWordUser, 10);

        const pool = await poolPromise;

        const checkUser = await pool.request()
            .input('email', sql.NVarChar, Email)
            .query("SELECT * FROM users WHERE Email = @email");

        if (checkUser.recordset.length > 0){
            return res.status(409).json({message: "Email đã tồn tại!"});
        }


        await pool.request()
        .input("username", sql.NVarChar, UserName)
        .input("password", sql.NVarChar, hashPassword)
        .input("email", sql.NVarChar, Email)
        .query("INSERT INTO users (UserName, PassWordUser, Email) VALUES (@username, @password, @email)" )

        res.status(201). json({message: "Đăng ký thành công!"});
    } catch (err) {
        console.log(err);
        res.status(500).json({error:err.message});
    }
})


route.post('/login', async(req, res) =>{
    try {
        const {UserName, PassWordUser} = req.body;

        if (!UserName || !PassWordUser){
            return res.status(400).json({message: "Vui lòng nhập tên và mật khẩu để đăng nhập!"});
        }

        const pool = await poolPromise;
        const result = await pool.request()
        .input("username", sql.NVarChar, UserName)
        .query("SELECT * FROM users WHERE UserName = @username");

        if (result.recordset.length ===0){
            return res.status(404).json({message:"Tài khoản không tồn tại!"});
        }

        const user = result.recordset[0];
        const isMatch = await bcrypt.compare(PassWordUser, user.PassWordUser);

        console.log("Check password: ", isMatch);
        
        if (!isMatch){
            return res.status(401).json({message: "Mật khẩu không đúng!"});
        }

        res.status(200).json({
            message:"Đăng nhập thành công!",
            user:{
                id: user.UserID,
                username: user.UserName,
                email: user.Email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});        
    }
});

export default route;