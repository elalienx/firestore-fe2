// NPM packages
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Project files
import { getCollection } from "../scripts/fireStore";
import CarCard from "../components/CarCard";

// Blue Page 🔵
export default function SubCategory() {
  const { categoryId, subId } = useParams();

  // Local state
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await getCollection(`categories/${categoryId}/content`);

      setList(data);
      setStatus(1);
    }
    loadData();
  }, []);

  // Safeguard
  if (status === 0) return <p>Loading</p>;

  // Property
  const filteredList = list.filter((item) => item.type === subId);

  // Components
  const Cards = filteredList.map((item) => (
    <CarCard key={item.id} item={item} />
  ));

  return (
    <div className="category">
      <h1>{subId}</h1>
      <div className="grid">{Cards}</div>
    </div>
  );
}
