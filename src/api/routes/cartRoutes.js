import express from "express"
import {sql, poolPromise} from "../config/connect_sql.js";

const router = express.Router();

// thêm sản phẩm vào giỏ hàng, nếu đã có thì tăng số lượng
router.post('/add', async (req, res) => {
    const {cartId, productId} = req.body;
    console.log("Thêm vào giỏ:", cartId, productId);

    try {
        const pool = await poolPromise;

        // kiểm tra CartID có tồn tại không
        const cartCheck = await pool.request()
        .input("CartID", cartId)
        .query("SELECT 1 FROM carts WHERE CartID = @CartID");

        if (cartCheck.recordset.length === 0) {
        return res.status(400).json({ error: "Giỏ hàng không tồn tại!" });
        }

        await pool.request()
        .input("CartID", cartId)
        .input("FunctionalFoodsID", productId)
        .query(`
            IF EXISTS (
                SELECT 1 FROM cart_item
                WHERE CartID = @CartID AND FunctionalFoodsID = @FunctionalFoodsID
            )
            BEGIN
                UPDATE cart_item
                SET Quantity = Quantity + 1
                WHERE CartID = @CartID AND FunctionalFoodsID = @FunctionalFoodsID
            END
            ELSE
            BEGIN
                DECLARE @price FLOAT;
                SELECT @price = PriceFoods FROM functional_food WHERE FunctionalFoodsID = @FunctionalFoodsID;
                INSERT INTO cart_item (CartID, FunctionalFoodsID, Quantity, Price)
                VALUES (@CartID, @FunctionalFoodsID, 1, @price);
            END
            `)
        res.json({success: true})
    } catch (err) {
        console.error("Lỗi khi thêm vào giỏ hàng:", err);
        res.status(500).json({error: err.message});
    }    
})

// lấy toàn bộ giỏ hàng
router.get('/:cartId', async (req, res) => {
    const cartId = parseInt(req.params.cartId);

    try {
        const pool = await poolPromise;
        const rerult = await pool.request()
        .input("CartID", cartId)
        .query(`SELECT 
          ci.CartItemID, ci.Quantity, ci.Price,
          f.FunctionalFoodsID, f.NameFood, f.ImageFood, f.PriceFoods, f.Discount
        FROM cart_item ci
        JOIN functional_food f ON ci.FunctionalFoodsID = f.FunctionalFoodsID
        WHERE ci.CartID = @CartID
        `)
        res.json(rerult.recordset);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

// cập nhật số lượng sản phẩm trong giỏ
router.put('/update', async (req, res) => {
    const {cartItemId, quantity} = req.body;
    
    try {
        const pool = await poolPromise;
        await pool.request()
            .input("CartItemID", cartItemId)
            .input("Quantity", quantity)
            .query("UPDATE cart_item SET Quantity = @Quantity WHERE CartItemID = @CartItemID");

            res.json({success: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

//xoá sản phẩm khỏi giỏ
router.delete("/delete", async (req, res) => {
    const {cartItemId} = req.body;

    try {
        const pool = await poolPromise;
        await pool.request()
            .input("CartItemID", cartItemId)
            .query("DELETE FROM cart_item WHERE CartItemID = @CartItemID");

            res.json({success: true});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})
export default router;