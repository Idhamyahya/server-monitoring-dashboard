import DiskCard from "../components/DiskCard";
import Header from "../components/Header";
// import StatusCard from "../components/StatusCard";
// import ProcessCard from "../components/ProcessCard";

function Dashboard() {
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
      <DiskCard usePercent={72} used="72 GB" available="28 GB" />
    </main>
  );
}

export default Dashboard;
