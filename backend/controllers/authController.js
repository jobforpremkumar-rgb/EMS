import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import Employee from "../model/userModel.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body.email);
    console.log(req.body.password);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Find user
    const user = await Employee.findOne({ email });


    if (user === null) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES},
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user Already Exist!" });
    }
    // if (!name) {
    //   return res.status(300).json({ message: "Name is missing " });
    // }
    if (!email) {
      return res.status(300).json({ message: "email is missing " });
    }

    if (!password) {
      return res.status(300).json({ message: "password is missing " });
    }
    if (!confirmPassword) {
      return res.status(300).json({ message: "confirmPassword is missing " });
    }
    if (password != confirmPassword) {
      return res.status.json({
        message: "Password and Confim password must be same",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).json({
      message: "Successfully Registered",
    });
  } catch (error) {
   if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }
  }
};
