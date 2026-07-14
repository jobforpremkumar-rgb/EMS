// seeders/index.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedEmployees } from "./employeeSeeder.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await seedEmployees(100);

await mongoose.disconnect();

console.log("Seeding completed.");