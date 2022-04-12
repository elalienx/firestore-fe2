// NPM package
import { useEffect, useState } from "react";

// Project files
import { getCollection } from "../scripts/fireStore";
import DriverCard from "../components/DriverCard";

export default function Drivers() {
  // Local state
  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Method
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);

      setDrivers(data);
      setStatus(1);
    }

    loadData("drivers");
  }, []);

  // Components
  const Cards = drivers.map((item) => <DriverCard key={item.id} item={item} />);

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div id="drivers">
      <h1>Drivers</h1>
      {Cards}
    </div>
  );
}
