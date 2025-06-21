import express from "express";
import {sql, poolPromise} from '../config/connect_sql.js';


// lấy sản phẩm theo danh mục
const router = express.Router();
router.get('/category/:value', async (req, res) => {
    try {
        const {value} = req.params;
        const pool = await poolPromise;
        
        let sqlQuery = "SELECT NameFood, ImageFood, PriceFoods, Rating, Sold, Discount FROM functional_food";
        if (value) {
            sqlQuery += ` WHERE TypeID = @type`; // Sử dụng tham số tránh SQL Injection
        }

        const request = pool.request();
        if (value) {
            request.input("type", sql.Int, value);
        }

        const result = await request.query(sqlQuery);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// lấy toàn bộ sản phẩm
router.get('/all', async (req, res) => {
    try {
        const pool = await poolPromise;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = req.query.pageSize ? parseInt (req.query.pageSize) : null;

        const sortBy = req.query.sortBy || "PriceFoods";
        const sortOrder = req.query.sortOrder || "DESC";

        const allowedColumns = ["TypeID", "PriceFoods", "Rating", "Sold", "Discount"];
        const allowedOrders = ["ASC", "DESC"];

        if (!allowedColumns.includes(sortBy) || !allowedOrders.includes(sortOrder.toUpperCase())) {
            return res.status(400).json({ message: "Tham số sắp xếp không hợp lệ. Vui lòng nhập lại" });
        }

        console.log("sortOrder:", sortOrder);
        console.log("sortBy: ", sortBy);

        let query=(`SELECT t.TypeID AS TypeID, FunctionalFoodsID, NameFood, ImageFood, PriceFoods, Rating, Sold, Discount FROM functional_food f
                    JOIN  functional_food_type t
                    ON f.TypeID = t.TypeID
                    ORDER BY ${sortBy} ${sortOrder}`);
        const request = pool.request();
        
                if (pageSize) {
                    const offset = (pageNumber - 1) * pageSize;
                    query += ` OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`;
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
                res.status(500).json({ error: err.message });
            }
});

// lấy toàn bộ chi tiết sản phẩm
router.get('/all_infor', async (req, res) => {
    try {
        const pool = await poolPromise;
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : null;
        const id = req.query.id; 

        const sortBy = req.query.sortBy || "PriceFoods";
        const sortOrder = req.query.sortOrder || "DESC";

        const allowedColumns = ["TypeID", "PriceFoods", "Rating", "Sold", "Discount"];
        const allowedOrders = ["ASC", "DESC"];

        if (!allowedColumns.includes(sortBy) || !allowedOrders.includes(sortOrder.toUpperCase())) {
            return res.status(400).json({ message: "Tham số sắp xếp không hợp lệ. Vui lòng nhập lại" });
        }

        let query = `
            SELECT t.TypeID AS TypeID, FunctionalFoodsID, NameFood, ImageFood, PriceFoods, Rating, Sold, Discount, Benefit, Instructions, Alert
            FROM functional_food f
            JOIN functional_food_type t ON f.TypeID = t.TypeID
        `;

        const request = pool.request();

        if (id) {
            query += ` WHERE FunctionalFoodsID = @id`;
            request.input("id", sql.Int, id);
        }

        query += ` ORDER BY ${sortBy} ${sortOrder}`;

        if (pageSize) {
            const offset = (pageNumber - 1) * pageSize;
            query += ` OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY`;
            request.input("offset", sql.Int, offset);
            request.input("pageSize", sql.Int, pageSize);
        }

        const result = await request.query(query);

        res.json({
            page: pageNumber,
            pageSize: pageSize || "all",
            data: result.recordset
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// top 3
router.get('/productThree', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT TOP 3 NameFood, ImageFood, PriceFoods, Rating, Sold, Discount FROM functional_food");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
})


// lấy danh mục sản phẩm
router.get('/type', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query("SELECT TypeID, NameType FROM functional_food_type");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send("Lỗi khi lấy danh mục sản phẩm!");
    }
});

//thêm sản phẩm mới
router.post('/add', (req, res) => {
  const {
    NameFood,
    ImageFood,
    Benefit,
    Instructions,
    Alert,
    TypeID,
    PriceFoods,
    Rating,
    Sold,
    Discount
  } = req.body;

  const sql = `
    INSERT INTO functional_food 
    (NameFood, ImageFood, Benefit, Instructions, Alert, TypeID, PriceFoods, Rating, Sold, Discount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    NameFood,
    ImageFood,
    Benefit,
    Instructions,
    Alert,
    TypeID,
    PriceFoods,
    Rating,
    Sold,
    Discount
  ], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Thêm sản phẩm thất bại', error: err });
    }
    res.json({ message: 'Thêm sản phẩm thành công', id: result.insertId });
  });
});


export default router;
