import express from "express";
import {sql, poolPromise} from '../config/connect_sql.js';

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT NewsID, NewsTitle, ImageNews, NewsDescription, SourceNews, PublishAt FROM news");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;