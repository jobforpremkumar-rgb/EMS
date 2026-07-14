import ApiError from "../util/ApiError.js";
import ApiResponse from "../util/ApiResponse.js";
import Employee from "../model/userModel.js";
import { duplicateKeyError } from "../util/mongoDuplicateError.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
export const createEmployee = async (req, res, next) => {
  try {
    const { password, ...data } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const emp = await Employee.create({ ...data, password: hashedPassword });
    console.log(emp);

    return res.status(201).json(
      new ApiResponse({
        statusCode: 201,
        message: "Employee created successfully",
        data: emp,
      }),
    );

    // ApiResponse(201, "Employee created successfully", data, res);
  } catch (err) {
    console.log(err);

    if (err.code === 11000 || err.code == 409) {
      const error = duplicateKeyError(err);

      return res.status(error.statusCode).json(error);
    } else {
      console.log(err);

      res.status(500).json({ message: err.message });
    }
  }
};

export const getEmployee = async (req, res) => {
  try {
    console.log(req.query);
    
    const page = req.query.page || 1;
    const search = req.query.search || "";
    const limit = req.query.limit || 10;
    const gender = req.query.gender || "";
    const skip = (page - 1) * limit;
    console.log(search);
    
    let filter = {};
    if (search)
     filter.$or = [
    {
      firstname: {
        $regex: search,
        $options: "i",
      },
    },
    {
      lastName: {
        $regex: search,
        $options: "i",
      },
    },
    {
      email: {
        $regex: search,
        $options: "i",
      },
    },
  ];
    if (gender) {
      filter.gender = gender.toLowerCase();
    }

    const data = await Employee.find(filter).limit(limit).skip(skip).select("-password");

      const totalUsers = await Employee.countDocuments(filter);

      const totalPages = Math.ceil(totalUsers / limit);
      
    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee Fetched successfully",
        data:data,
        meta : {
          limit : limit,
          page : page,
          totalUsers :totalUsers,
          totalPages :totalPages,
        }
       ,
      }),
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(400, "Invalid employee ID");
    }

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: "Employee deleted successfully",
      }),
    );
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json(error);
    }

    return res.status(500).json({ message: error.message });
  }
};
