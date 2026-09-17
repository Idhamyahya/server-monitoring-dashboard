function ProcessCard({ title, count, description }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <h2 className="mt-3 text-3xl font-bold text-slate-900">{count}</h2>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default ProcessCard;
