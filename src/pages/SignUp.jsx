// NPM packages
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import { createDocument, createDocumentWithId } from "../scripts/fireStore";
import { createUser } from "../scripts/firebaseAuth";
import { useUID } from "../state/UIDContext";
import form from "../data/signUpForm.json";
import InputField from "../components/InputField";

export default function SignUp({ uidState }) {
  const { setUID } = useUID();
  const navigation = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  async function onSignUp(event) {
    event.preventDefault();

    const uid = await createUID();
    let user = null;

    if (uid) {
      user = await createDocument(uid);
    }

    if (user) {
      setUID(uid);
      navigation("/dashboard");
    }
  }

  async function createUID() {
    const payload = await createUser(email, password);
    const { data, error } = payload;

    if (error) {
      onFailure(data);
      return;
    } else return data;
  }

  async function createDocument(uid) {
    const user = { name: name, age: age, city: city };
    const payload = await createDocumentWithId("users", uid, user);
    const { data, error } = payload;

    if (error) {
      onFailure(data);
      return;
    } else return data;
  }

  function onFailure(errorText) {
    console.error(errorText);
    alert(`Sorry something happened: ${errorText}`);
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
