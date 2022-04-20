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

  async function onUpdate(editedItem) {
    const payload = await updateDocument("drivers", editedItem);
    const { data, error } = payload;

    error ? updateFail(data) : updateSucceed(editedItem);
  }

  function updateSucceed(editedItem) {
    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === editedItem.id);

    clonedDrivers[index] = editedItem;
    setDrivers(clonedDrivers);
    alert("Updated succeesfully");
  }

  function updateFail(data) {
    console.error(data);
    alert("Sorry we cannot update your driver. Try again");
  }

  async function onDelete(id) {
    const payload = await deleteDocument("drivers", id);
    const { data, error } = payload;

    error ? deleteFail(data) : deleteSucceed();
  }

  function deleteSucceed() {
    const clonedDrivers = [...drivers];
    const index = clonedDrivers.findIndex((item) => item.id === id);

    clonedDrivers.splice(index, 1);
    setDrivers(clonedDrivers);
    alert("Deleted succeesfully");
  }

  function deleteFail(error) {
    console.log(error);
    alert("We could not modify the driver. Try again");
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
