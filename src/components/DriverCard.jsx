export default function DriverCard({ item }) {
  const { name, nationality, imageURL } = item;

  return (
    <article>
      <img src={imageURL} alt="Driver portrait" />
      <h3>{name}</h3>
      <p>From: {nationality}</p>
    </article>
  );
}