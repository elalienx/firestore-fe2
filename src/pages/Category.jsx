// NPM packages
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Project file
import { readCollection, readDocument } from "../scripts/fireStore";

// Green Page 🟢
export default function Category() {
  const { categoryId } = useParams();

  // Local state
  const [document, setDocument] = useState({});
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(0);

  // Methods
  useEffect(() => {
    async function loadData() {
      const documentData = await readDocument("categoriesLong", categoryId);
      const listData = await readCollection(
        `categoriesLong/${categoryId}/content/`
      );

      setDocument(documentData);
      setList(listData);
      setStatus(1);
    }
    loadData();
  }, []);

  // Safeguard
  if (status === 0) return <p>Loading</p>;

  // Components
  const Links = list.map((item) => (
    <li key={item.id}>
      <Link to={`/category/${categoryId}/${item.id}`}>{item.title}</Link>
    </li>
  ));

  return (
    <div className="category">
      <h1>{document.title}</h1>
      <p>{document.description}</p>
      <ul>{Links}</ul>
    </div>
  );
}
