function StatusCard({ title, value, description, status = false }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <div className="mt-3 flex items-center gap-2">
        {status && <span className="h-3 w-3 rounded-full bg-emerald-500" />}

        <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
      </div>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default StatusCard;
