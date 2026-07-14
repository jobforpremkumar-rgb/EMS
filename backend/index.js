import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import employeeRoutes from "./routes/employee.route.js"
import cors from "cors"
import { createEmployeeSchema, updateEmployeeSchema } from "./validation/user.validate.schema.js";
import { validate } from "./middleware/user.validate.middleware.js";
import { authenticate } from "./middleware/auth.middleware.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
dbConnect()
const person = {
  name : "suji" ,
  age : "21"
}
app.get("/", (req, res) => {
  res.json("Welcome to Node JS");
});



app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/employee"   , employeeRoutes)



app.listen(PORT, () => {
  console.log("Server Running Successfully = " + PORT);
});
