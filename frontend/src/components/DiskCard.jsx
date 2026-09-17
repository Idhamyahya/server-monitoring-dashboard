function DiskCard({ usePercent, used, available }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Disk Usage</h2>

          <p className="mt-1 text-sm text-slate-500">
            Penggunaan penyimpanan VPS
          </p>
        </div>

        <span className="text-2xl font-bold text-slate-900">{usePercent}%</span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-500"
          style={{ width: `${usePercent}%` }}
        />
      </div>

      <div className="mt-4 flex justify-between text-sm text-slate-500">
        <span>Used: {used}</span>
        <span>Available: {available}</span>
      </div>
    </section>
  );
}

export default DiskCard;
