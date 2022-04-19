export default function DriverCard({ item, onDelete, onUpdate }) {
  const { id, active, name, nationality, imageURL } = item;

  // Method
  function changeActive() {
    const editedItem = { ...item };

    editedItem.active = !editedItem.active;

    onUpdate(editedItem);
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
