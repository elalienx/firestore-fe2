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
      const payload = await readCollection("drivers");
      const { data, error } = payload;

      error ? loadFail(data) : loadSucceed(data);
    }

    loadData();
  }, []);

  function loadSucceed(data) {
    setDrivers(data);
    setStatus(1);
  }

  function loadFail(error) {
    console.error(error);
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
