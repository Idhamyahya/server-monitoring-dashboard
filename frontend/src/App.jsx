import { useEffect, useState } from "react";
import { getHealth } from "./services/healthService.js";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function loadHealth() {
      try {
        const result = await getHealth("/health");
        setMessage(result.message);
      } catch (error) {
        setMessage(error.message);
      }
    }
    loadHealth();
  }, []);
  return (
    <div>
      <h1>VPS Monitoring Dashboard</h1>

      <p>API: {import.meta.env.VITE_API_URL}</p>
      <p>Health: {message}</p>
    </div>
  );
}

export default App;
