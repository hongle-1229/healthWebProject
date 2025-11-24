import express from "express";
import cors from "cors";  // Import CORS
import "./config/connect_sql.js";
import usersRoutes from "./routes/usersRoutes.js";
// import symptomRoutes from "./routes/symptomRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import newsRoutes from "./routes/newsRoutes.js"
import firstAidRoutes from "./routes/firstAidRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());

// Kích hoạt CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// use routes
app.use("/api/users", usersRoutes);
// app.use("/api/symptoms", symptomRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/first_aid", firstAidRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/cart", cartRoutes);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
});
