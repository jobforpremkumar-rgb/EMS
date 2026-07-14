import Modal from "../../Components/Modal";
import Input from "../../Components/Input";
import { useEffect, useRef, useState } from "react";
import Button from "../../Components/Button/Button";
import moment from "moment";

import Pagination from "../../Components/Pagination";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";

const GENDERS = ["Male", "Female", "Other"];

const statusStyles = {
  Active: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Inactive: "bg-slate-100 text-slate-600 border border-slate-200",
  "On Leave": "bg-amber-100 text-amber-700 border border-amber-200",
  Terminated: "bg-rose-100 text-rose-700 border border-rose-200",
};

const StatusDot = ({ status }) => {
  const colors = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    "On Leave": "bg-amber-500",
    Terminated: "bg-rose-500",
  };
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${colors[status]}`}
    />
  );
};

const COLS = [
  { key: "employeeId", label: "Emp ID" },
  { key: "name", label: "Employee" },
  { key: "department", label: "Department" },
  { key: "designation", label: "Designation" },
  { key: "phone", label: "Phone" },
  { key: "joiningDate", label: "Joined" },
  { key: "salary", label: "Salary" },
  { key: "status", label: "Status" },
];

// Sample data for UI display

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

interface FormErrors {
  [key: string]: string;
}

interface FormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
}
const apiURL = import.meta.env.VITE_API_URL;

interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  department: string;
  designation: string;
  joiningDate: string;
  salary: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function Employees() {
  const [addModal, setAddModal] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [employees, setEmployees] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleCloseModal = () => {
    setAddModal(false);
    setErrors({});
  };
  const handleopenModal = () => {
    setAddModal(true);
  };
  const [search, setSearch] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPage, setCurrent] = useState<number>(1);
  const [totalPageNumber, setToatalPageNumber] = useState<number>(1);

  // Form Code
  
  
  const [formData, setFormData] = useState<FormData>({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: 0,
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
  });
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal Info
    if (!formData.employeeId.trim())
      newErrors.employeeId = "Employee ID is required";
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim())
      newErrors.password = "password number is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";

    // Job Details
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.joiningDate)
      newErrors.joiningDate = "Joining date is required";
    if (!formData.salary) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0) {
      newErrors.salary = "Please enter a valid salary amount";
    }

    // Address
    if (!formData.streetAddress.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State/Province is required";
    if (!formData.zipCode.trim())
      newErrors.zipCode = "ZIP/Postal code is required";
    if (!formData.country.trim()) newErrors.country = "Country is required";

    // Emergency Contact
    if (!formData.emergencyName.trim())
      newErrors.emergencyName = "Emergency contact name is required";
    if (!formData.emergencyRelationship.trim())
      newErrors.emergencyRelationship = "Relationship is required";
    if (!formData.emergencyPhone.trim())
      newErrors.emergencyPhone = "Emergency phone is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Mark field as touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  // Handle blur to validate field
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateForm();
  };
  // Handle form submission

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateForm()) {
      const {
        employeeId,
        firstName,
        lastName,
        email,
        password,
        phone,
        gender,
        dateOfBirth,
        department,
        designation,
        joiningDate,
        salary,
        streetAddress,
        state,
        country,
        zipCode,
        emergencyName,
        emergencyRelationship,
        emergencyPhone,
      } = formData;
      console.log(typeof salary);

      const formatData = {
        empId: employeeId,
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        phone,
        gender,
        dob: dateOfBirth,
        status: "active",

        jd: {
          department,
          designation,
          joiningDate,
          salary: Number(salary),
        },

        address: {
          street: streetAddress,
          state,
          country,
          pincode: zipCode,
        },

        emergency_contact: {
          contactName: emergencyName,
          relationship: emergencyRelationship,
          phone: emergencyPhone,
        },
      };

      try {
        const response = await fetch(`${apiURL}/employee/create`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formatData),
        });
        const data = await response.json();

        if (!response.ok) {
          console.log(response);
          throw Error(data.message);
        }
        toast.success(data.message);
        handleCloseModal();
        resetForm();
        getData();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message || error?.message);
      }
    } else {
      console.log("Form has errors");
    }
  };

  // reset Form

  const resetForm = () => {
    setFormData({
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      department: "",
      designation: "",
      joiningDate: "",
      salary: "",
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
    });
    setErrors({});
    setTouched({});
  };

  // Get employees data

  const getData = async (): promises<void> => {
    try {
      setLoading(true);
      const res: Response = await fetch(
        `${apiURL}/employee?search=${search}&gender=${gender}&page=${pageNumber}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      setLoading(false);

      if (data?.success) {
        setEmployees(data?.data || []); 
        setCurrent(parseInt(data?.meta?.page))

        setToatalPageNumber(data?.meta?.totalPages);

      } else {
        // Handle unsuccessful response
        console.warn("API returned success: false", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [search, gender , pageNumber]);

  const confirmDelete = () => {
    const confirm = window.confirm();
    return confirm;
  };
  const handleDelete = async (id: string) => {
    if (confirmDelete()) {
      try {
        const response = await fetch(`${apiURL}/employee/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data?.message);
          getData();
        } else {
          toast.error(data.message);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }
  };

  const getPageNumber = (number: number) => {
    setPageNumber(number);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Employees
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">8 total · 6 active</p>
          </div>
          <Button
            className="flex items-center gap-2 "
            onClick={handleopenModal}
            variant="primary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Employee
          </Button>
        </div>
      </div>

      <div className="py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total",
              value: "47",
              color: "text-slate-700",
              bg: "bg-white",
            },
            {
              label: "Active",
              value: "32",
              color: "text-emerald-600",
              bg: "bg-white",
            },
            {
              label: "On Leave",
              value: "8",
              color: "text-amber-600",
              bg: "bg-white",
            },
            {
              label: "Departments",
              value: "7",
              color: "text-indigo-600",
              bg: "bg-white",
            },
          ].map((s) => (
            <div
              key={s.label}
              className={`${s.bg} rounded-xl border border-slate-200 px-5 py-4 shadow-sm`}
            >
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                {s.label}
              </p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, ID, email, department…"
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Button
            className={`flex items-center gap-2 `}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="reset"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h18M7 12h10M11 20h2"
              />
            </svg>
            Filters
          </Button>
        </div>

        {/* Filter Panel */}

        {isFilterOpen && (
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 flex gap-4 flex-wrap shadow-sm">
            <div className="flex flex-col gap-1 min-w-32">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Gender
              </label>
              <select
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All Genders</option>
                {genderOptions.map((g) => (
                  <option key={g.label} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {/* <Table columns= {COLS} data={sampleEmployees} /> */}
            {loading ? (
              <Loader />
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {COLS.map((col) => (
                      <th
                        key={col.key}
                        className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none whitespace-nowrap"
                      >
                        {col.label}
                        <span className="ml-1 text-slate-300 text-xs">↕</span>
                      </th>
                    ))}
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.length > 0 ? (
                    employees.map((emp) => (
                      <tr
                        key={emp?.empId}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-slate-500 font-medium">
                          {emp?.empId}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={emp?.profileImage}
                              alt=""
                              className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0"
                            />
                            <div>
                              <p className="font-semibold text-slate-800">
                                {emp?.firstname} {emp?.lastname}
                              </p>
                              <p className="text-xs text-slate-400">
                                {emp?.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md font-medium">
                            {emp?.jd?.department}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {emp?.jd?.designation}
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {emp?.phone}
                        </td>
                        <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                          {moment(emp.jd?.joiningDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-700">
                          ₹{emp?.jd?.salary}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[emp.status]}`}
                          >
                            <StatusDot status={"Active"} />
                            {emp?.status || "Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {/* <Button
                            className="text-indigo-600 hover:text-indigo-800 text-xs font-medium hover:underline mr-3 "
                            variant="reset"
                          >
                            View
                          </Button> */}
                          <Button
                            className="text-slate-400  text-xs font-medium hover:bg-red-500 cursor-pointer"
                            variant="danger"
                            onClick={() => handleDelete(emp?._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-center">
                        No data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between w-full">
            <Pagination
              currentPage={currentPage}
              getPageNumber={getPageNumber}
              totalPage={totalPageNumber}
            />
          </div>
        </div>
      </div>

      {/* Add Employee Modal */}
      <Modal open={addModal} onClose={handleCloseModal}>
        <form id="emp-form" onSubmit={handleSubmit}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6 max-h-[80vh] overflow-auto">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">👤</span>
                <h3 className="text-lg font-semibold text-slate-800">
                  Personal Information
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Input
                  label="Employee ID"
                  placeholder="e.g. EMP-001"
                  required
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.employeeId ? errors.employeeId : ""}
                />
                <Input
                  label="First Name"
                  placeholder="John"
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName ? errors.firstName : ""}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName ? errors.lastName : ""}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email ? errors.email : ""}
                />
                <Input
                  label="password"
                  type="text"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password ? errors.password : ""}
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone ? errors.phone : ""}
                />
                <Input
                  label="Gender"
                  type="select"
                  required
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.gender ? errors.gender : ""}
                  options={genderOptions}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  required
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dateOfBirth ? errors.dateOfBirth : ""}
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💼</span>
                <h3 className="text-lg font-semibold text-slate-800">
                  Job Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Input
                  label="Department"
                  required
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.department ? errors.department : ""}
                />
                <Input
                  label="Designation"
                  required
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.designation ? errors.designation : ""}
                />
                <Input
                  label="Joining Date"
                  type="date"
                  required
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.joiningDate ? errors.joiningDate : ""}
                />
                <Input
                  label="Salary (INR)"
                  type={"number"}
                  placeholder="0"
                  required
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.salary ? errors.salary : ""}
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">📍</span>
                <h3 className="text-lg font-semibold text-slate-800">
                  Address
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="sm:col-span-2 lg:col-span-3">
                  <Input
                    label="Street Address"
                    placeholder="123 Main Street, Apt 4B"
                    required
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.streetAddress ? errors.streetAddress : ""}
                  />
                </div>
                <Input
                  label="City"
                  placeholder="New York"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city ? errors.city : ""}
                />
                <Input
                  label="State / Province"
                  type={"number"}
                  placeholder="NY"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state ? errors.state : ""}
                />
                <Input
                  label="ZIP / Postal Code"
                  placeholder="10001"
                  required
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipCode ? errors.zipCode : ""}
                />
                <Input
                  label="Country"
                  placeholder="United States"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.country ? errors.country : ""}
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🚨</span>
                <h3 className="text-lg font-semibold text-slate-800">
                  Emergency Contact
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <Input
                  label="Contact Name"
                  placeholder="Jane Doe"
                  required
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emergencyName ? errors.emergencyName : ""}
                />
                <Input
                  label="Relationship"
                  placeholder="Spouse, Parent, Sibling…"
                  required
                  name="emergencyRelationship"
                  value={formData.emergencyRelationship}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.emergencyRelationship
                      ? errors.emergencyRelationship
                      : ""
                  }
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 555 000 0000"
                  required
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emergencyPhone ? errors.emergencyPhone : ""}
                />
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end pb-8">
              <Button type="button" variant="reset" onClick={resetForm}>
                Reset
              </Button>
              <Button type="submit" variant="secondary">
                Save Profile
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
