import express from "express"
import {sql, poolPromise} from "../config/connect_sql.js";

const route = express.Router();

// lấy toàn bộ câu hỏi bài test
route.get('/all_quizz', async (req, res) => {
    const testId = req.query.testId;
    
    if (isNaN(testId)) {
        return res.status(400).json({ error: "TestID không hợp lệ" });
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("TestID", testId)
            .query("SELECT * FROM first_aid_quizz WHERE TestID = @TestID");

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// lấy danh sách bài test
route.get('/list_test', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT t.TestID, c.Title AS TestTitle, t.Quantity FROM first_aid_test t JOIN first_aid_cases c ON t.FirstAidID = c.FirstAidID ")
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({error: err.message});   
    }
})


export default route;