// NPM packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Project file
import { getDocument } from "../scripts/fireStore";

// Green Page 🟢
export default function Category() {
  const { categoryId } = useParams();

  // Local state
  const [document, setDocument] = useState({});
  const [status, setStatus] = useState(0);

  // Methods
  useEffect(() => {
    async function loadData() {
      const data = await getDocument("categoriesLong", categoryId);

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
      <Link to={`/category/${categoryId}/${item.type}`}>{item.label}</Link>
    </li>
  ));

  return (
    <div className="category">
      <h1>{document.title}</h1>
      <ul>{Links}</ul>
    </div>
  );
}
