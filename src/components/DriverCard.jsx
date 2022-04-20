// Project files
import { deleteDocument, updateDocument } from "../scripts/fireStore";

export default function DriverCard({ item, driversState }) {
  const { id, active, name, nationality, imageURL } = item;
  const [drivers, setDrivers] = driversState;

  // Method
  function changeActive() {
    const editedItem = { ...item };

    editedItem.active = !editedItem.active;

    onUpdate(editedItem);
  }

  async function onUpdate(data) {
    await updateDocument("drivers", data);

    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === data.id);

    clonedDrivers[index] = data;
    setDrivers(clonedDrivers);
  }

  async function onDelete(id) {
    await deleteDocument("drivers", id);

    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === id);

    clonedDrivers.splice(index, 1);
    setDrivers(clonedDrivers);
  }

  return (
    <article className="driver-card">
      <img src={imageURL} alt="Driver portrait" />
      <h3>{name}</h3>
      <p>From: {nationality}</p>
      <label>
        Is currently driving?
        <input type="checkbox" checked={active} onChange={changeActive} />
      </label>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}
