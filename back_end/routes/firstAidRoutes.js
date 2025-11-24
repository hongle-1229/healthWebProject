import express from "express";
import { sql, poolPromise } from '../config/connect_sql.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const pageNumber = parseInt(req.query.pageNumber) || 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;

    let query = 'SELECT * FROM first_aid_cases';
    const request = pool.request();

    if (pageSize) {
      const offset = (pageNumber - 1) * pageSize;
      query += ' ORDER BY Title OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY';
      request.input("offset", sql.Int, offset);
      request.input("pageSize", sql.Int, pageSize);
    }

    const result = await request.query(query);

    res.json({
      page: pageNumber,
      pageSize: pageSize || "all",
      data: result.recordset
    });

    console.log(result.recordset); 
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
