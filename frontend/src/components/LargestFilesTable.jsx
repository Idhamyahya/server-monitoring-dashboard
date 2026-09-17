function LargestFilesTable({ files }) {
  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900">Largest Files</h2>

        <p className="mt-1 text-sm text-slate-500">
          Penggunaan disk terbesar pada VPS
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-600">Size</th>

              <th className="px-6 py-3 font-semibold text-slate-600">Path</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file, index) => (
              <tr
                key={`${file.path}-${index}`}
                className="border-t border-slate-100"
              >
                <td className="px-6 py-4 font-semibold">{file.size}</td>

                <td className="px-6 py-4 font-mono text-xs">{file.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default LargestFilesTable;
