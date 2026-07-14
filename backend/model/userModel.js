import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
  empId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
   
  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female"],
    default : "male"
  },
  dob: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  jd: {
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    joiningDate: {
      default: Date.now,
      required: true,
      type: Date,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  address: {
   
    street: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },

    country: {
      required: true,
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
  },
  emergency_contact: {
    contactName: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
