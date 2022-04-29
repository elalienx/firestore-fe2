// NPM package
import { useEffect, useState } from "react";

// Project files
import { readCollection } from "../scripts/fireStore";

import DriverCard from "../components/DriverCard";
import DriverForm from "../components/DriverForm";

export default function Drivers() {
  // Local state
  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Method
  useEffect(() => {
    async function loadData() {
      const data = await readCollection("drivers").catch(onFail);

      if (data) onSuccess(data);
    }

    loadData();
  }, []);

  function onSuccess(data) {
    setDrivers(data);
    setStatus(1);
  }

  function onFail(error) {
    console.error(error.code);
    setStatus(2);
  }

  // Components
  const Cards = drivers.map((item) => (
    <DriverCard
      key={item.id}
      item={item}
      driversState={[drivers, setDrivers]}
    />
  ));

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div id="drivers">
      <h1>Drivers</h1>
      <div className="grid">{Cards}</div>
      <DriverForm driversState={[drivers, setDrivers]} />
    </div>
  );
}
