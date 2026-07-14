import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white">
      <div className="text-2xl font-bold p-5 border-b border-slate-700">
        EMS Admin
      </div>

      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Employees
        </NavLink>

        {/* <NavLink
          to="/departments"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Departments
        </NavLink>

        <NavLink
          to="/attendance"
          className="block p-3 rounded hover:bg-slate-700"
        >
          Attendance
        </NavLink>

        <NavLink to="/leave" className="block p-3 rounded hover:bg-slate-700">
          Leave
        </NavLink>

        <NavLink to="/payroll" className="block p-3 rounded hover:bg-slate-700">
          Payroll
        </NavLink> */}
      </nav>
    </aside>
  );
}

export default Sidebar;
