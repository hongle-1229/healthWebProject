import express from "express";
import cors from "cors";  // Import CORS
import "./config/connect_sql.js";
// import usersRoutes from "./routes/usersRoutes.js";
// import symptomRoutes from "./routes/symptomRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import newsRoutes from "./routes/newsRoutes.js"

const app = express();
app.use(express.json());

// Kích hoạt CORS
app.use(cors({
    origin: "http://localhost:5173"  // Cho phép frontend truy cập API
}));

// use routes
// app.use("/api/users", usersRoutes);
// app.use("/api/symptoms", symptomRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/news", newsRoutes);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});
