function Header() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold">
        Employee Management System
      </h2>

      <div className="flex items-center gap-4">
        🔔
        👤 Admin
      </div>
    </header>
  );
}

export default Header;