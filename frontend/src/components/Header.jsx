function Header() {
  return (
    <header className="flex flex-col gap-4  bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          VPS Monitoring Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor server VPS dari browser
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
        <span className="h-3 w-3 rounded-full bg-emerald-500" />

        <span className="text-sm font-semibold text-emerald-700">ONLINE</span>
      </div>
    </header>
  );
}

export default Header;
