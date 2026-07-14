import {
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
  FaWallet,
} from "react-icons/fa";
import Pagination from "../../Components/Pagination";

export default function Dashboard() {

const cards = [
  {
    title: "Total Employees",
    value: 245,
    icon: FaUsers,
    color: "bg-blue-500",
  },
  {
    title: "Total Departments",
    value: 12,
    icon: FaBuilding,
    color: "bg-violet-500",
  },
  {
    title: "Today's Attendance",
    value: "221 / 245",
    icon: FaCalendarCheck,
    color: "bg-emerald-500",
  },
  {
    title: "Monthly Payroll",
    value: "$82,500",
    icon: FaWallet,
    color: "bg-amber-500",
  },
];
  return (
    <div className="space-y-6">

      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
              >
                <Icon size={28} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Second Row */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Attendance */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-5">
            Attendance
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Present</span>
              <span className="font-bold text-green-600">
                221
              </span>
            </div>

            <div className="flex justify-between">
              <span>Absent</span>
              <span className="font-bold text-red-500">
                18
              </span>
            </div>

            <div className="flex justify-between">
              <span>On Leave</span>
              <span className="font-bold text-orange-500">
                6
              </span>
            </div>

          </div>
        </div>

        {/* Leave */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-5">
            Leave Requests
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Pending</span>
              <span className="text-yellow-500 font-bold">
                15
              </span>
            </div>

            <div className="flex justify-between">
              <span>Approved</span>
              <span className="text-green-600 font-bold">
                42
              </span>
            </div>

            <div className="flex justify-between">
              <span>Rejected</span>
              <span className="text-red-500 font-bold">
                4
              </span>
            </div>

          </div>
        </div>

        {/* Payroll */}

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-5">
            Payroll
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>Monthly Cost</span>
              <span className="font-bold">
                $82,500
              </span>
            </div>

            <div className="flex justify-between">
              <span>Paid</span>
              <span className="text-green-600 font-bold">
                230
              </span>
            </div>

            <div className="flex justify-between">
              <span>Pending</span>
              <span className="text-red-500 font-bold">
                15
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Employee Table */}

      <div className="bg-white rounded-xl shadow">

        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Recent Employees
          </h2>
        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Employee</th>

              <th className="text-left p-4">Department</th>

              <th className="text-left p-4">Designation</th>

              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-4">Prem Kumar</td>

              <td className="p-4">IT</td>

              <td className="p-4">
                React Developer
              </td>

              <td className="p-4">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </td>

            </tr>

            <tr className="border-t">

              <td className="p-4">John</td>

              <td className="p-4">HR</td>

              <td className="p-4">HR Manager</td>

              <td className="p-4">
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  On Leave
                </span>
              </td>

            </tr>

          </tbody>

        </table>

        <div className="px-6 py-4">

        {/* <Pagination /> */}
        </div>

      </div>

    </div>
  );
}