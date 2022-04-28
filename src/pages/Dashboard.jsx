// NPM packages
import { Link } from "react-router-dom";

// Project file
import { useUID } from "../state/UIDContext";

export default function Dashboard() {
  const { setUID } = useUID();

  return (
    <div id="dashboard">
      <h1>My super fanpage about racing 🏁</h1>

      <Link to="/drivers">Drivers 👦</Link>
      <br />
      <Link to="/category/vehicles">Vehicles 🏎</Link>
      <br />
      <Link to="/category/companies">Companies 🏙</Link>
      <br />
      <button onClick={() => setUID(null)}>Logout</button>
    </div>
  );
}
