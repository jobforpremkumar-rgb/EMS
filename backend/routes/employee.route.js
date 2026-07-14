import express from "express";
import { createEmployee, deleteEmployee, getEmployee } from "../controllers/employee.controller.js";
import { validate } from "../middleware/user.validate.middleware.js";
import { createEmployeeSchema } from "../validation/user.validate.schema.js";

const router = express.Router()

router.get("/" ,  getEmployee)
router.post("/create" , validate(createEmployeeSchema) ,  createEmployee)
router.delete("/:id" ,  deleteEmployee)



export default router