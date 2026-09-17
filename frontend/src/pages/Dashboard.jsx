import Header from "../components/Header.jsx";
import StatusCard from "../components/StatusCard.jsx";
import ProcessCard from "../components/ProcessCard.jsx";
import DiskCard from "../components/DiskCard.jsx";
import ProcessTable from "../components/ProcessTable.jsx";
import LargestFilesTable from "../components/LargestFilesTable.jsx";

function Dashboard() {
  const javaProcesses = [
    {
      user: "root",
      pid: 1234,
      cpu: "2.5%",
      memory: "4.2%",
      command: "java -jar app.jar",
    },
    {
      user: "root",
      pid: 5678,
      cpu: "1.2%",
      memory: "2.8%",
      command: "java -jar service.jar",
    },
  ];
  const pythonProcesses = [
    {
      user: "root",
      pid: 4321,
      cpu: "1.5%",
      memory: "2.1%",
      command: "python app.py",
    },
  ];

  const largestFiles = [
    {
      size: "2.4G",
      path: "/var/lib/docker",
    },
    {
      size: "1.8G",
      path: "/var/log",
    },
    {
      size: "850M",
      path: "/home/app",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header />
        <p className="text-sm text-slate-500">
          Last updated: 17 September 2026 14:00
        </p>
        <section className="grid gap-4 md:grid-cols-3">
          <StatusCard
            title="VPS Status"
            value="ONLINE"
            description="Server dapat diakses"
            status={true}
          />

          <ProcessCard
            title="Java"
            count={3}
            description="Java processes running"
          />

          <ProcessCard
            title="Python"
            count={2}
            description="Python processes running"
          />
        </section>

        <DiskCard usePercent={72} used="72 GB" available="28 GB" />

        <ProcessTable title="Java Processes" processes={javaProcesses} />
        <ProcessTable title="Python Processes" processes={pythonProcesses} />

        <LargestFilesTable files={largestFiles} />
      </div>
    </main>
  );
}

export default Dashboard;
