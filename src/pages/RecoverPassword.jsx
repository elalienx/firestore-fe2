// NPM packages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Project files
import InputField from "../components/InputField";
import firebaseErrors from "../data/firebaseErrors.json";
import form from "../data/recoverPasswordForm.json";
import { recoverUser } from "../scripts/firebaseAuth";

export default function RecoverPassword() {
  const navigation = useNavigate();

  // Local state
  const [email, setEmail] = useState("");

  // Method
  async function onRecover(event) {
    event.preventDefault();

    const result = await recoverUser(email).catch(onFail);

    if (result) onSuccess(email);
  }

  function onSuccess(email) {
    alert(`We sent an email to ${email}. Check you spam folder as well.`);
    navigation("/login");
  }

  function onFail(error) {
    const message = firebaseErrors[error.code] || firebaseErrors["default"];

    console.error(error.code);
    alert(message);
  }

  return (
    <div id="recover-password">
      <h1>Sorry to hear you have problems</h1>
      <p>
        Please write the email you used to created your account so we can send
        you an email with instructions on how to reset and create a new
        password.
      </p>
      <p>
        <b>🚨 Note:</b>
        Don't forget to check every inbox including the spam folder.
      </p>
      <form onSubmit={onRecover}>
        <InputField setup={form.email} state={[email, setEmail]} />
        <button>Submit</button>
      </form>
      <p>
        Did you remembered your password?
        <Link to="/login">Click here</Link> to go back the login page.
      </p>
    </div>
  );
}
