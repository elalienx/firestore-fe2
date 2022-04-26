// NPM packages
import { Link } from "react-router-dom";

export default function NotLogged() {
  return (
    <div id="not-logged">
      <h1>Sorry, you are not logg in</h1>
      <p>
        Please don't forget to login or create an account to access our content
      </p>
      <Link to="/sign-up">Sign up</Link>
    </div>
  );
}
