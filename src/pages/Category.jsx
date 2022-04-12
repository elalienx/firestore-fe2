// NPM packages
import { useEffect, useState } from "react";

// Project files
import { getCollection } from "../scripts/fireStore";
import CarCard from "../components/CarCard";

export default function Category() {
  // Local state
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error

  // Methods
  useEffect(() => {
    async function loadData(path) {
      const f1 = await getCollection("vehicles/vehicle/f1");
      const rally = await getCollection("vehicles/vehicle/rally");

      setList([...f1, ...rally]);
      setStatus(1);
    }

    loadData("categories");
  }, []);

  // Components
  const Cards = list.map((item) => <CarCard key={item.id} item={item} />);

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div className="category">
      <h1>@Title@</h1>
      <p>@Description@</p>
      <a href="f1/">Formula 1 Cars 🏎</a>
      <br />
      <a href="rally/">Rally Cars 🚙</a>

      {Cards}
    </div>
  );
}
