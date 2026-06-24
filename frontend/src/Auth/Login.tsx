import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  type formData = {
    email: string;
    password: string;
  };
  type errors = {
    email?: String;
    password?: String;
  };
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
  });
  const [errorState, setErrorState] = useState<errors>({});

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let error: errors = {};
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = formData;
    if (!email.trim()) {
      error.email = "Email is required";
    } else if (!emailRegx.test(email)) {
      error.email = "Email format should be abc@gmail.com";
    }
    if (!password.trim()) {
      error.password = "password is required";
    }
    if (password.trim().length <= 3) {
      error.password = "password must be min 3 letter required";
    }
    return error;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
 
    setErrorState(errors);

    console.log(errors);

    if (Object.keys(errors).length === 0) {
      console.log(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handlechange}
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
              onChange={handlechange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorState?.password && (
              <span className="text-red-400">{errorState?.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          <p className="text-primary curor-poiter">Forget Password ?</p>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 flex justify-center">
          Dont Have Account ?
          <Link to={"/register"} className="text-primary ps-2">
            {" "}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
