export default function DriverCard({ item, onDelete }) {
  const { id, name, nationality, imageURL } = item;

  return (
    <article className="driver-card">
      <img src={imageURL} alt="Driver portrait" />
      <h3>{name}</h3>
      <p>From: {nationality}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
    </article>
  );
}
