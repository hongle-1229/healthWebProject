// định nghĩa các routes cho users
import express from "express";
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

export default route;