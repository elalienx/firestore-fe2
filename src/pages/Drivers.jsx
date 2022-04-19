// NPM package
import { useEffect, useState } from "react";

// Project files
import {
  getCollection,
  createDocument,
  deleteDocument,
  updateDocument,
} from "../scripts/fireStore";
import DriverCard from "../components/DriverCard";

export default function Drivers() {
  // Local state
  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [imageURL, setImageURL] = useState("");

  // Properties
  const path = "drivers";

  // Method
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);

      setDrivers(data);
      setStatus(1);
    }

    loadData(path);
  }, []);

  async function onCreate(event) {
    event.preventDefault();

    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: imageURL,
      active: false,
    };
    const documentId = await createDocument(path, newDriver);

    newDriver.id = documentId;
    setDrivers([...drivers, newDriver]);
  }

  async function onUpdate(data) {
    await updateDocument(path, data);

    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === data.id);

    clonedDrivers[index] = data;
    setDrivers(clonedDrivers);
  }

  async function onDelete(id) {
    await deleteDocument(path, id);

    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === id);

    clonedDrivers.splice(index, 1);
    setDrivers(clonedDrivers);
  }

  // Components
  const Cards = drivers.map((item) => (
    <DriverCard
      key={item.id}
      item={item}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  ));

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div id="drivers">
      <h1>Drivers</h1>
      <div className="grid">{Cards}</div>
      <form onSubmit={onCreate}>
        <h2>Add a new driver</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Country"
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
        />
        <input
          placeholder="Paste the image link"
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
