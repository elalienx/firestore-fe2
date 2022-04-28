// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import { createDocumentWithId } from "../scripts/fireStore";
import { createUser } from "../scripts/firebaseAuth";
import { useUID } from "../state/UIDContext";
import form from "../data/signUpForm.json";
import InputField from "../components/InputField";

export default function SignUp() {
  const { setUID } = useUID();
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  async function onSignUp(event) {
    event.preventDefault();

    // 1 Create UID
    const newUID = await createUser(email, password);

    // 2 Create user document
    const newUser = {
      name: name,
      age: age,
      city: city,
    };
    const payload = await createDocumentWithId("users", newUID, newUser);

    // If it works i will navigate to the dashboard page
    // Else i will show an error message
    if (payload.error) alert("Could not create user");
    else {
      setUID(newUID);
      navigation("/dashboard");
    }
  }

  return (
    <div id="sign-up">
      <h1>Create an account</h1>
      <p>Create an account with us to be able to add and edit drivers.</p>
      <form onSubmit={onSignUp}>
        <InputField setup={form.name} state={[name, setName]} />
        <InputField setup={form.email} state={[email, setEmail]} />
        <InputField setup={form.age} state={[age, setAge]} />
        <InputField setup={form.city} state={[city, setCity]} />
        <InputField setup={form.password} state={[password, setPassword]} />
        <button>Submit</button>
      </form>
    </div>
  );
}
