import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRouter from "./Auth/ProtectedRouter";
import Layout from "./Layout/Layout";
import PublicRoute from "./Auth/PublicRoute";

const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const Dashboard = lazy(() => import("./page/Dashboard/Dashboard"));
const Employees = lazy(() => import("./page/Employees/Employees"));

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          removeDelay: 1000,

          // Default options for specific types
          error: {
            duration: 3000,
            iconTheme: {
              primary: "red",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRouter />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
