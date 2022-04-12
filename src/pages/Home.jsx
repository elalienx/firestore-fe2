// NPM packages
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div id="home">
      <h1>My super fanpage about racing 🏁</h1>

      <Link to="drivers/">Drivers 👦</Link>
      <br />
      <Link to="vehicles/">Vehicles 🏎</Link>
    </div>
  );
}
