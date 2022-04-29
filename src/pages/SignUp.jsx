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

  const [name, setName] = useState("e");
  const [email, setEmail] = useState("el_alienx@hotmail.com");
  const [age, setAge] = useState("35");
  const [city, setCity] = useState("Quito");
  const [password, setPassword] = useState("12345678");

  async function onSignUp(event) {
    event.preventDefault();

    const uid = await createUID();
    let user;

    if (uid) user = await createDocument(uid);
    if (user) onSuccess(uid);
  }

  async function createUID() {
    const { data, error } = await createUser(email, password);

    if (error) onFailure(data);
    else return data;
  }

  async function createDocument(uid) {
    const user = { name: name, age: age, city: city };
    const { data, error } = await createDocumentWithId("users", uid, user);

    if (error) onFailure(data);
    else return data;
  }

  function onSuccess(uid) {
    setUID(uid);
    navigation("/dashboard");
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
