// import DiskCard from "../components/DiskCard";
import Header from "../components/Header";
// import StatusCard from "../components/StatusCard";
// import ProcessCard from "../components/ProcessCard";
// import ProcessTable from "../components/ProcessTable";

function Dashboard() {
  //   const javaProcesses = [
  //     {
  //       user: "root",
  //       pid: 1234,
  //       cpu: "2.5",
  //       memory: "4.2",
  //       command: "java -jar app.jar",
  //     },
  //     {
  //       user: "root",
  //       pid: 5678,
  //       cpu: "1.2",
  //       memory: "2.8",
  //       command: "java -jar service.jar",
  //     },
  //   ];
  return (
    <main className="min-h-screen flex flex-col gap-1 bg-slate-100 ">
      <Header />
      {/* <StatusCard
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
      /> */}
      {/* <DiskCard usePercent={72} used="72 GB" available="28 GB" /> */}
      {/* <ProcessTable title="Java Processes" processes={javaProcesses} /> */}
    </main>
  );
}

export default Dashboard;
