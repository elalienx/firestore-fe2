// NPM package
import { useEffect, useState } from "react";

// Project files
import {
  getCollection,
  createDocument,
  deleteDocument,
} from "../scripts/fireStore";
import DriverCard from "../components/DriverCard";

export default function Drivers() {
  // Local state
  const [drivers, setDrivers] = useState([]);
  const [status, setStatus] = useState(0); // 0: loading, 1: loaded, 2: error
  const [name, setName] = useState("Eduardo");
  const [nationality, setNationality] = useState("Ecuador");
  const [imageURL, setImageURL] = useState(
    "https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-05/210521-Hayden-Swank-al-1155-3dcaf9.jpg"
  ); // https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2021-05/210521-Hayden-Swank-al-1155-3dcaf9.jpg

  // Method
  useEffect(() => {
    async function loadData(path) {
      const data = await getCollection(path);

      setDrivers(data);
      setStatus(1);
    }

    loadData("drivers");
  }, []);

  async function onCreate(event) {
    event.preventDefault();

    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: imageURL,
    };
    const documentId = await createDocument("drivers", newDriver);

    newDriver.id = documentId;
    setDrivers([...drivers, newDriver]);
  }

  async function onDelete(id) {
    await deleteDocument("drivers", id);

    const clonedDrivers = [...drivers]; // [ {id:9u, name: Eduardo}, {id:Gm, name:Niki}, {id: Gn, name: Michael} ];
    const index = clonedDrivers.findIndex((item) => item.id === id);

    clonedDrivers.splice(index, 1);
    setDrivers(clonedDrivers);
  }

  // Components
  const Cards = drivers.map((item) => (
    <DriverCard key={item.id} item={item} onDelete={onDelete} />
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
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={nationality}
          onChange={(event) => setNationality(event.target.value)}
        />
        <input
          type="text"
          placeholder="Paste the image link"
          value={imageURL}
          onChange={(event) => setImageURL(event.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
