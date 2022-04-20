// NPM package
import { useEffect, useState } from "react";

// Project files
import {
  readCollection,
  createDocument,
  deleteDocument,
  updateDocument,
} from "../scripts/fireStore";
import InputField from "../components/InputField";
import DriverCard from "../components/DriverCard";
import form from "../data/driverForm.json";

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
      const data = await readCollection(path);

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
    <DriverCard key={item.id} item={item} actions={[onUpdate, onDelete]} />
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
        <InputField setup={form.name} state={[name, setName]} />
        <InputField
          setup={form.nationality}
          state={[nationality, setNationality]}
        />
        <InputField setup={form.imageURL} state={[imageURL, setImageURL]} />
        <button>Submit</button>
      </form>
    </div>
  );
}
