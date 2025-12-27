import express from "express";
import { sql, poolPromise } from "../config/connect_sql.js";

const router = express.Router();


// ===============================
// 1) GET lịch sử làm test
// ===============================
router.get("/test", async (req, res) => {
    const { userID } = req.query;

    if (!userID) {
        return res.status(400).json({ message: "Missing userID" });
    }

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input("User", sql.Int, userID)
            .query(`
                SELECT
                    utr.TestOrder,
                    fac.Title AS TestName,
                    utr.Score,
                    utr.SubmitAt
                FROM user_test_result utr
                JOIN first_aid_test fat ON utr.TestID = fat.TestID
                JOIN first_aid_cases fac ON fat.FirstAidID = fac.FirstAidID
                WHERE utr.UserID = @User
                ORDER BY utr.TestOrder DESC
            `);

        return res.json(result.recordset);

    } catch (err) {
        console.error("API error (history test): ", err);
        return res.status(500).json({ message: "Server error" });
    }
});



// ===============================
// 2) POST lưu kết quả làm test
// ===============================
router.post("/save_test_result", async (req, res) => {
    const { userID, testID, score } = req.body;

    if (!userID || !testID || score === undefined) {
        return res.status(400).json({ message: "Missing data" });
    }

    try {
        const vnTime = new Date(Date.now() + 7 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        const pool = await poolPromise;

        await pool.request()
            .input("U", sql.Int, userID)
            .input("T", sql.Int, testID)
            .input("S", sql.Float, score)
            .input("SubmitAt", sql.DateTime, vnTime)
            .query(`
                INSERT INTO user_test_result (UserID, TestID, Score, SubmitAt, TestOrder)
                SELECT
                    @U,
                    @T,
                    @S,
                    @SubmitAt,
                    ISNULL(MAX(TestOrder), 0) + 1
                FROM user_test_result
                WHERE UserID = @U
            `);

        return res.json({ message: "Saved successfully" });

    } catch (err) {
        console.error("API error (save_test_result): ", err);
        return res.status(500).json({ message: "Server error" });
    }
});



/* =============================
   POST: Lưu lịch sử tra cứu
============================= */
router.post("/save_lookup", async (req, res) => {
    console.log("🔥 save_lookup hit:", req.body);

    try {
        const { UserID, SelectedSymptoms, Results, HighlightedSymptoms } = req.body;

        if (!UserID) {
            return res.status(400).json({ message: "Missing UserID" });
        }

        const vnTime = new Date(Date.now() + 7 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        const pool = await poolPromise;

        await pool.request()
            .input("UserID", sql.Int, UserID)
            .input("SelectedSymptoms", sql.NVarChar(sql.MAX), JSON.stringify(SelectedSymptoms || []))
            .input("Results", sql.NVarChar(sql.MAX), JSON.stringify(Results || []))
            .input("HighlightedSymptoms", sql.NVarChar(sql.MAX), JSON.stringify(HighlightedSymptoms || []))
            .input("CreatedAt", sql.DateTime, vnTime)
            .query(`
                INSERT INTO lookup_history
                (UserID, SelectedSymptoms, Results, HighlightedSymptoms, CreatedAt, LookupOrder)
                SELECT
                    @UserID,
                    @SelectedSymptoms,
                    @Results,
                    @HighlightedSymptoms,
                    @CreatedAt,
                    ISNULL(MAX(LookupOrder), 0) + 1
                FROM lookup_history
                WHERE UserID = @UserID
            `);

        return res.json({ message: "Saved successfully" });

    } catch (err) {
        console.error("❌ Error save_lookup:", err);
        return res.status(500).json({ error: err.message });
    }
});



/* =============================
   GET: Lấy lịch sử tra cứu theo UserID
============================= */
router.get("/get_lookup/:userId", async (req, res) => {
    console.log("🔥 get_lookup hit:", req.params);

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input("UserID", sql.Int, req.params.userId)
            .query(`
                SELECT
                    LookupOrder,
                    SelectedSymptoms,
                    Results,
                    HighlightedSymptoms,
                    CreatedAt
                FROM lookup_history
                WHERE UserID = @UserID
                ORDER BY LookupOrder DESC
            `);

        return res.json(result.recordset);

    } catch (err) {
        console.error("❌ Error get_lookup:", err);
        return res.status(500).json({ error: err.message });
    }
});


export default router;
