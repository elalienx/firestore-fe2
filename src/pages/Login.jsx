// NPM packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import firebaseErrors from "../data/firebaseErrors.json";
import form from "../data/loginForm.json";
import { loginUser } from "../scripts/firebaseAuth";
import { useUID } from "../state/UIDContext";

export default function Login() {
  const { setUID } = useUID();
  const navigation = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Method
  async function onLogin(event) {
    event.preventDefault();

    const payload = await loginUser(email, password);
    const { data, error } = payload;

    error === true ? onFailure(data) : onSucess(data);
  }

  function onSucess(data) {
    setUID(data);
    navigation("/dashboard");
  }

  function onFailure(errorCode) {
    const message = firebaseErrors[errorCode] || firebaseErrors["default"];

    console.error(errorCode);
    alert(message);
  }

  return (
    <div id="login">
      <h1>Welcome back racing</h1>
      <p>Please login to access all our content</p>
      <form onSubmit={onLogin}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Submit</button>
      </form>
      <p>
        Did you forget your password? Then{" "}
        <Link to="/recover-password">click here</Link>
      </p>
    </div>
  );
}
