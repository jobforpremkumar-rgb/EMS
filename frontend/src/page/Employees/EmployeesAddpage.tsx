import { useState, useRef } from "react";

type Gender = "Male" | "Female" | "Other" | "Prefer not to say";
type Status = "Active" | "Inactive" | "On Leave" | "Terminated";

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender | "";
  dob: string;
  designation: string;
  department: string;
  salary: string;
  joiningDate: string;
  status: Status | "";
  profileImage: string;
  address: Address;
  emergencyContact: EmergencyContact;
}

const DEPARTMENTS = [
  "Engineering", "Product", "Design", "Marketing",
  "Sales", "Finance", "HR", "Operations", "Legal", "Customer Success"
];

const DESIGNATIONS = [
  "Intern", "Junior Developer", "Developer", "Senior Developer",
  "Lead", "Manager", "Senior Manager", "Director", "VP", "C-Suite"
];

const initialEmployee: Employee = {
  employeeId: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  dob: "",
  designation: "",
  department: "",
  salary: "",
  joiningDate: "",
  status: "",
  profileImage: "",
  address: { street: "", city: "", state: "", zip: "", country: "" },
  emergencyContact: { name: "", relationship: "", phone: "" },
};

function Avatar({ src, name }: { src: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover rounded-full"
      />
    );
  }
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-semibold tracking-wide">
      {initials || "?"}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
        {label}
        {required && <span className="text-violet-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition";

const selectCls =
  "w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition appearance-none cursor-pointer";

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-lg">{icon}</span>
      <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">{title}</h2>
      <div className="flex-1 h-px bg-slate-100 ml-1" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-emerald-100 text-emerald-700",
    Inactive: "bg-slate-100 text-slate-500",
    "On Leave": "bg-amber-100 text-amber-700",
    Terminated: "bg-red-100 text-red-600",
  };
  if (!status) return null;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${map[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

export default function Employees() {
  const [emp, setEmp] = useState<Employee>(initialEmployee);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof Employee, value: string) =>
    setEmp((e) => ({ ...e, [key]: value }));

  const setAddr = (key: keyof Address, value: string) =>
    setEmp((e) => ({ ...e, address: { ...e.address, [key]: value } }));

  const setEC = (key: keyof EmergencyContact, value: string) =>
    setEmp((e) => ({ ...e, emergencyContact: { ...e.emergencyContact, [key]: value } }));

  const handleImage = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => set("profileImage", e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const fullName = [emp.firstName, emp.lastName].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-violet-50 to-slate-100 font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-slate-400 leading-none">HR Portal</p>
            <h1 className="text-sm font-bold text-slate-800 leading-tight">Employee Profile</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {fullName && <StatusBadge status={emp.status} />}
          {fullName && (
            <span className="text-sm font-medium text-slate-600 hidden sm:block">{fullName}</span>
          )}
          <button
            form="emp-form"
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition shadow-sm shadow-violet-200 active:scale-95"
          >
            {saved ? "✓ Saved" : "Save"}
          </button>
        </div>
      </header>

      <form id="emp-form" onSubmit={handleSubmit}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">

          {/* Profile card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* Avatar */}
              <div className="relative group flex-shrink-0">
                <div className="w-24 h-24 rounded-full ring-4 ring-violet-100 overflow-hidden">
                  <Avatar src={emp.profileImage} name={fullName} />
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </div>

              {/* ID + name preview */}
              <div className="flex-1 min-w-0">
                <p className="text-2xl font-bold text-slate-800 truncate">
                  {fullName || <span className="text-slate-300">Full Name</span>}
                </p>
                <p className="text-sm text-slate-400 mt-0.5">
                  {emp.designation || "Designation"} {emp.department ? `· ${emp.department}` : ""}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {emp.employeeId && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-mono">
                      ID: {emp.employeeId}
                    </span>
                  )}
                  {emp.email && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full truncate max-w-xs">
                      {emp.email}
                    </span>
                  )}
                  {emp.joiningDate && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">
                      Joined {new Date(emp.joiningDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  )}
                </div>
              </div>

              {/* Status pill */}
              <div className="flex flex-col gap-2 items-end">
                <Field label="Status">
                  <select className={selectCls} value={emp.status} onChange={(e) => set("status", e.target.value)}>
                    <option value="">Select</option>
                    {(["Active", "Inactive", "On Leave", "Terminated"] as Status[]).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon="👤" title="Personal Information" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Employee ID" required>
                <input className={inputCls} placeholder="e.g. EMP-001" value={emp.employeeId} onChange={(e) => set("employeeId", e.target.value)} />
              </Field>
              <Field label="First Name" required>
                <input className={inputCls} placeholder="John" value={emp.firstName} onChange={(e) => set("firstName", e.target.value)} />
              </Field>
              <Field label="Last Name" required>
                <input className={inputCls} placeholder="Doe" value={emp.lastName} onChange={(e) => set("lastName", e.target.value)} />
              </Field>
              <Field label="Email" required>
                <input type="email" className={inputCls} placeholder="john@company.com" value={emp.email} onChange={(e) => set("email", e.target.value)} />
              </Field>
              <Field label="Phone">
                <input type="tel" className={inputCls} placeholder="+1 555 000 0000" value={emp.phone} onChange={(e) => set("phone", e.target.value)} />
              </Field>
              <Field label="Gender">
                <select className={selectCls} value={emp.gender} onChange={(e) => set("gender", e.target.value)}>
                  <option value="">Select</option>
                  {(["Male", "Female", "Other", "Prefer not to say"] as Gender[]).map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </Field>
              <Field label="Date of Birth">
                <input type="date" className={inputCls} value={emp.dob} onChange={(e) => set("dob", e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon="💼" title="Job Details" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Department" required>
                <select className={selectCls} value={emp.department} onChange={(e) => set("department", e.target.value)}>
                  <option value="">Select department</option>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Designation" required>
                <select className={selectCls} value={emp.designation} onChange={(e) => set("designation", e.target.value)}>
                  <option value="">Select designation</option>
                  {DESIGNATIONS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </Field>
              <Field label="Joining Date">
                <input type="date" className={inputCls} value={emp.joiningDate} onChange={(e) => set("joiningDate", e.target.value)} />
              </Field>
              <Field label="Salary (USD)">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
                  <input
                    type="number"
                    min={0}
                    className={inputCls + " pl-7"}
                    placeholder="0"
                    value={emp.salary}
                    onChange={(e) => set("salary", e.target.value)}
                  />
                </div>
              </Field>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon="📍" title="Address" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="sm:col-span-2 lg:col-span-3">
                <Field label="Street Address">
                  <input className={inputCls} placeholder="123 Main Street, Apt 4B" value={emp.address.street} onChange={(e) => setAddr("street", e.target.value)} />
                </Field>
              </div>
              <Field label="City">
                <input className={inputCls} placeholder="New York" value={emp.address.city} onChange={(e) => setAddr("city", e.target.value)} />
              </Field>
              <Field label="State / Province">
                <input className={inputCls} placeholder="NY" value={emp.address.state} onChange={(e) => setAddr("state", e.target.value)} />
              </Field>
              <Field label="ZIP / Postal Code">
                <input className={inputCls} placeholder="10001" value={emp.address.zip} onChange={(e) => setAddr("zip", e.target.value)} />
              </Field>
              <Field label="Country">
                <input className={inputCls} placeholder="United States" value={emp.address.country} onChange={(e) => setAddr("country", e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <SectionHeader icon="🚨" title="Emergency Contact" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <Field label="Contact Name">
                <input className={inputCls} placeholder="Jane Doe" value={emp.emergencyContact.name} onChange={(e) => setEC("name", e.target.value)} />
              </Field>
              <Field label="Relationship">
                <input className={inputCls} placeholder="Spouse, Parent, Sibling…" value={emp.emergencyContact.relationship} onChange={(e) => setEC("relationship", e.target.value)} />
              </Field>
              <Field label="Phone">
                <input type="tel" className={inputCls} placeholder="+1 555 000 0000" value={emp.emergencyContact.phone} onChange={(e) => setEC("phone", e.target.value)} />
              </Field>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pb-8">
            <button
              type="button"
              onClick={() => { setEmp(initialEmployee); setSaved(false); }}
              className="px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold shadow-sm shadow-violet-200 transition active:scale-95"
            >
              {saved ? "✓ Profile Saved" : "Save Profile"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}