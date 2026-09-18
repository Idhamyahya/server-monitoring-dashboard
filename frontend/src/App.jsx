import { useEffect, useState } from "react";
import { getPythonProcess } from "./services/monitorService.js";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    async function loadPython() {
      try {
        const result = await getPythonProcess();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
    loadPython();
  }, []);
  return (
    <div>
      <h1>Python Monitoring</h1>
      <pre className="mt-4">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
