export default function CarCard({ item }) {
  const { model, maker, year, imageURL } = item;

  return (
    <article>
      <ul>
        <li>
          <b>Model:</b> {model}
        </li>
        <li>
          <b>Maker:</b> {maker}
        </li>
        <li>
          <b>Year:</b> {year}
        </li>
      </ul>
      <img src={imageURL} alt="The vehicle thumb" />
    </article>
  );
}
