function ProcessTable({ title, processes }) {
  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">User</th>

              <th className="px-6 py-3 font-semibold text-slate-600">PID</th>

              <th className="px-6 py-3 font-semibold text-slate-600">CPU</th>

              <th className="px-6 py-3 font-semibold text-slate-600">Memory</th>

              <th className="px-6 py-3 font-semibold text-slate-600">
                Command
              </th>
            </tr>
          </thead>

          <tbody>
            {processes.map((process) => (
              <tr key={process.pid} className="border-t border-slate-100">
                <td className="px-6 py-4">{process.user}</td>

                <td className="px-6 py-4">{process.pid}</td>

                <td className="px-6 py-4">{process.cpu}</td>

                <td className="px-6 py-4">{process.memory}</td>

                <td className="px-6 py-4 font-mono text-xs">
                  {process.command}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ProcessTable;
