// NPM package
import { useEffect, useState } from "react";

// Project files
import { getCollection, addDocument } from "../scripts/fireStore";
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

  async function onSubmit(event) {
    // 1. We stop the form from reloading the page
    event.preventDefault();

    // 2. We group our state variables to send them as a single object
    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: imageURL,
    };

    // 3. We send the object to firebase AND wait until firebase returns the id
    const documentId = await addDocument("drivers", newDriver);

    // 4. We add the id to our object
    newDriver.id = documentId;

    // 5. update the drivers array state
    setDrivers([...drivers, newDriver]);
  }

  // Components
  const Cards = drivers.map((item) => <DriverCard key={item.id} item={item} />);

  // Safeguard
  if (status === 0) return <p>Loading... 🕕</p>;
  if (status === 2) return <p>Error... ❌</p>;

  return (
    <div id="drivers">
      <h1>Drivers</h1>
      <div className="grid">{Cards}</div>
      <form onSubmit={onSubmit}>
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
