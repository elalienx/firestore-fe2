export default function CarCard({ item }) {
  const { model, maker } = item;

  return (
    <article>
      <h2>{model}</h2>
      <p>by: {maker}</p>
    </article>
  );
}
