import { useEffect, useState } from "react";
import { getLargestFiles } from "./services/monitorService.js";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function loadPython() {
      try {
        const result = await getLargestFiles();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    loadPython();
  }, []);
  return (
    <div>
      <h1>Largest Monitoring</h1>
      <pre className="mt-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
