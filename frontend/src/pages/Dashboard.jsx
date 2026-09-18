import { useEffect, useState } from "react";

import { getHealth } from "../services/healthService.js";

import {
  getJavaProcess,
  getPythonProcess,
  getDiskProcess,
  getLargestFiles,
} from "../services/monitorService.js";

function Dashboard() {
  const [health, setHealth] = useState(null);

  const [java, setJava] = useState([]);
  const [python, setPython] = useState([]);

  const [disk, setDisk] = useState(null);

  const [largestFiles, setLargestFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [lastUpdated, setLastUpdated] = useState(null);

  async function loadMonitoringData() {
    try {
      setLoading(true);
      setError("");

      const [healthResult, javaResult, pythonResult, diskResult, filesResult] =
        await Promise.all([
          getHealth(),
          getJavaProcess(),
          getPythonProcess(),
          getDiskProcess(),
          getLargestFiles(),
        ]);

      setHealth(healthResult);

      setJava(javaResult.data || []);

      setPython(pythonResult.data || []);

      setDisk(diskResult.data || null);

      setLargestFiles(filesResult.data || []);

      setLastUpdated(new Date());
    } catch (error) {
      console.error(error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadMonitoringData();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              VPS Monitoring Dashboard
            </h1>

            <p className="mt-1 text-slate-500">Monitor VPS dari browser</p>
          </div>

          <button
            type="button"
            onClick={loadMonitoringData}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </header>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <p className="font-semibold">Terjadi kesalahan</p>

            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {/* LAST UPDATED */}
        <div className="mb-6 text-sm text-slate-500">
          Last updated: {lastUpdated ? lastUpdated.toLocaleString() : "-"}
        </div>

        {/* HEALTH */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Server Status
          </h2>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">API Status</p>

                <p className="mt-1 text-xl font-bold text-slate-900">
                  {health?.success ? "ONLINE" : "OFFLINE"}
                </p>
              </div>

              <div
                className={`h-4 w-4 rounded-full ${
                  health?.success ? "bg-green-500" : "bg-red-500"
                }`}
              />
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Running Processes
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* JAVA */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Java</h3>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                  {java.length} process
                </span>
              </div>

              {java.length === 0 ? (
                <p className="text-sm text-slate-500">Tidak ada proses Java.</p>
              ) : (
                <div className="space-y-3">
                  {java.map((process) => (
                    <div
                      key={process.pid}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-500">User</p>

                          <p className="font-medium text-slate-900">
                            {process.user}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">PID</p>

                          <p className="font-medium text-slate-900">
                            {process.pid}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">CPU</p>

                          <p className="font-medium text-slate-900">
                            {process.cpu}%
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">Memory</p>

                          <p className="font-medium text-slate-900">
                            {process.memory}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-slate-500">Command</p>

                        <p className="mt-1 break-all text-sm text-slate-700">
                          {process.command}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* PYTHON */}
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Python</h3>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {python.length} process
                </span>
              </div>

              {python.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Tidak ada proses Python.
                </p>
              ) : (
                <div className="space-y-3">
                  {python.map((process) => (
                    <div
                      key={process.pid}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-500">User</p>

                          <p className="font-medium text-slate-900">
                            {process.user}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">PID</p>

                          <p className="font-medium text-slate-900">
                            {process.pid}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">CPU</p>

                          <p className="font-medium text-slate-900">
                            {process.cpu}%
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-500">Memory</p>

                          <p className="font-medium text-slate-900">
                            {process.memory}%
                          </p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs text-slate-500">Command</p>

                        <p className="mt-1 break-all text-sm text-slate-700">
                          {process.command}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* DISK */}
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Disk Usage
          </h2>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            {disk ? (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Filesystem</p>

                    <p className="font-semibold text-slate-900">
                      {disk.filesystem}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Usage</p>

                    <p className="text-2xl font-bold text-slate-900">
                      {disk.usePercent}%
                    </p>
                  </div>
                </div>

                <div className="mb-4 h-4 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full ${
                      disk.usePercent >= 90
                        ? "bg-red-500"
                        : disk.usePercent >= 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${disk.usePercent}%`,
                    }}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-slate-500">Size</p>

                    <p className="font-semibold">{disk.size}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Used</p>

                    <p className="font-semibold">{disk.used}</p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Available</p>

                    <p className="font-semibold">{disk.available}</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-slate-500">Data disk belum tersedia.</p>
            )}
          </div>
        </section>

        {/* LARGEST FILES */}
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-800">
            Largest Files
          </h2>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            {largestFiles.length === 0 ? (
              <div className="p-6">
                <p className="text-sm text-slate-500">
                  Tidak ada data file terbesar.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-slate-700">
                        #
                      </th>

                      <th className="px-6 py-3 font-semibold text-slate-700">
                        Size
                      </th>

                      <th className="px-6 py-3 font-semibold text-slate-700">
                        Path
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {largestFiles.map((file, index) => (
                      <tr
                        key={`${file.path}-${index}`}
                        className="border-t border-slate-100"
                      >
                        <td className="px-6 py-4 text-slate-500">
                          {index + 1}
                        </td>

                        <td className="px-6 py-4 font-medium text-slate-900">
                          {file.size}
                        </td>

                        <td className="break-all px-6 py-4 text-slate-600">
                          {file.path}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
