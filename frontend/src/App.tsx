import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(()=> import("./Auth/Login"))
const Register = lazy(()=> import("./Auth/Register"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
    </Routes>
  );
}


export default App;