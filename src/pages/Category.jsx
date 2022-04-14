import { useEffect } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocument } from "../scripts/fireStore";

// Green Page 🟢
export default function Category() {
  const { categoryId } = useParams();
  const [document, setDocument] = useState({});
  const [status, setStatus] = useState(0);

  useEffect(() => {
    async function loadData() {
      const data = await getDocument("categories", categoryId);

      setDocument(data);
      setStatus(1);
    }
    loadData();
  }, []);

  // Safeguard
  if (status === 0) return <p>Loading</p>;

  // Components
  const Links = document.subCategories.map((item, index) => (
    <li key={index}>
      <Link to={`/categories/${categoryId}/${item.type}/`}>{item.label}</Link>
    </li>
  ));

  return (
    <div className="category">
      <h1>{document.title}</h1>
      <ul>{Links}</ul>
    </div>
  );
}
