import { z } from "zod";

// --- Reusable sub-schemas ---

const phoneRegex = /^[0-9]{10}$/;

const jdSchema = z.object({
  department: z.string().trim().min(1, "Department is required"),
  designation: z.string().trim().min(1, "Designation is required"),
  joiningDate: z.coerce.date().default(() => new Date()),
  salary: z.number().min(0, "Salary cannot be negative"),
});

const addressSchema = z.object({
  street: z.string().trim().min(1, "Street is required"),
  state: z.string().trim().min(1, "State is required"),
  country: z.string().trim().min(1, "Country is required"),
  pincode: z.string().trim().min(1, "Pincode is required"),
});

const emergencyContactSchema = z.object({
  contactName: z.string().trim().min(1, "Emergency contact name is required"),
  relationship: z.string().trim().min(1, "Relationship is required"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Invalid phone number"),
});

// --- Main schema (for creating an employee) ---

export const createEmployeeSchema = z.object({
  empId: z.string().trim().min(3, "Employee ID is required"),

  firstname: z.string().trim().min(1, "Name is Required"),

  lastname: z.string().trim().optional(),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password too long") // bcrypt limit, good practice to cap
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number"),

  phone: z.string().trim().regex(phoneRegex, "Phone number must be 10 digits"),

  gender: z.enum(["male", "female"]),

  dob: z.coerce.date().refine((date) => date < new Date(), {
    message: "Date of birth must be in the past",
  }),

  status: z.enum(["active", "inactive"]).default("active"),

  jd: jdSchema,

  address: addressSchema,

  emergency_contact: emergencyContactSchema,
});

// --- Schema for updates (all fields optional, no password here) ---

export const updateEmployeeSchema = createEmployeeSchema
  .omit({ password: true, empId: true }) // usually immutable / handled separately
  .partial();

