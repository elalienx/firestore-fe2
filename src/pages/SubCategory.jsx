import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCollection } from "../scripts/fireStore";

// Blue Page 🔵
export default function SubCategory() {
  const { categoryId, subId } = useParams();
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0);

  console.log("categoryId", categoryId);
  console.log("subId", subId);

  useEffect(() => {
    async function loadData() {
      const data = await getCollection(`categories/${categoryId}/content`);

      console.log("Sub category", data);

      setList(data);
      setStatus(1);
    }
    loadData();
  }, []);

  // Components

  // Safeguard
  if (status === 0) return <p>Loading</p>;

  return (
    <div className="category">
      <h1>{subId}</h1>
      <div className="grid"></div>
    </div>
  );
}
