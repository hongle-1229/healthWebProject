import sql from "mssql";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { type } from "os";
import { data } from "framer-motion/m";

// Xác định đường dẫn tuyệt đối đến thư mục gốc dự án
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Debug: Kiểm tra giá trị biến môi trường
console.log("🟢 DB_SERVER:", process.env.DB_SERVER);
console.log("🟢 DB_USER:", process.env.DB_USER);
console.log("🟢 DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("🟢 DB_DATABASE:", process.env.DB_DATABASE);

const config = {
    server: 'localhost\\SQLEXPRESS',
    port: 1433,
    authentication:{
        type:'default',
        options:{
            userName: process.env.DB_USER ,
            password: process.env.DB_PASSWORD 
        }
    },
    options:{
        database: process.env.DB_DATABASE,
        encrypt: false,
        trustServerCertificate: true
    }
};

sql.connect(config)
.then(() => console.log("Connected success"))
.catch(err => console.log("Connect failed", err));



const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("✅ Connected to SQL Server successfully!");
        return pool;
    })
    .catch(err => {
        console.error("❌ DB connect failed:", err);
    });

export { sql, poolPromise };
