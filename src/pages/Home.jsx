// NPM packages
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div id="home">
      <h1>My super fanpage about racing 🏁</h1>
      <p>Please login or create an account to access our content</p>

      <Link to="/sign-up">Sign up</Link>
    </div>
  );
}
