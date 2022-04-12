// NPM package
import { useEffect, useState } from "react";

// Project files
import { getCollection } from "./scripts/fireStore";

export default function App() {
  // Local state
  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Method
  useEffect(() => loadData("drivers"), []);

  async function loadData(path) {
    const data = await getCollection(path);

    setDrivers(data);
    setStatus(1);
  }

  // Components
  const DriverCards = drivers.map((item) => (
    <li key={item.id}>
      <img src={item.imageURL} alt="Driver portrait" />
      <h3>{item.name}</h3>
      <p>From: {item.nationality}</p>
    </li>
  ));

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div className="App">
      <h1>My super fanpage about racing 🏁</h1>
      <h2>Drivers</h2>
      <ul>{DriverCards}</ul>
    </div>
  );
}
