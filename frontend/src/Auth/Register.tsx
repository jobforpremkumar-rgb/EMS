import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  interface registerType {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  type ErrorState = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };

  const [formData, setFormData] = useState<registerType>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorState, setErrorState] = useState<ErrorState>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      errors.fullName = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrorState(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.keys(validateForm()).length > 0) {
      return;
    } else {
      console.log(formData);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onFocus={validateForm}
              onBlur={validateForm}
              placeholder="Enter Full Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorState?.fullName && (
              <span className="text-red-400">{errorState?.fullName}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorState?.email && (
              <span className="text-red-400">{errorState?.email}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorState?.password && (
              <span className="text-red-400">{errorState?.password}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorState?.confirmPassword && (
              <span className="text-red-400">
                {errorState?.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
            <Link to={"/login"}> Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
