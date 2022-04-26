// NPM packages
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="dashboard">
      <h1>My super fanpage about racing 🏁</h1>

      <Link to="/drivers">Drivers 👦</Link>
      <br />
      <Link to="/category/vehicles">Vehicles 🏎</Link>
      <br />
      <Link to="/category/companies">Companies 🏙</Link>
    </div>
  );
}
