// NPM packages
import { useState } from "react";

// Project files
import InputField from "../components/InputField";
import signUpForm from "../data/signUpForm.json";
import { createUser } from "../scripts/firebaseAuth";
import { createDocumentWithId } from "../scripts/fireStore";

export function SignUp() {
  const [name, setName] = useState("Eduardo");
  const [email, setEmail] = useState("el_alienx@hotmail.com");
  const [age, setAge] = useState("35");
  const [city, setCity] = useState("Stockholm");
  const [password, setPassword] = useState("12345678");

  async function onSignUp(event) {
    event.preventDefault();

    // 1 Create UID
    const UID = await createUser(email, password);

    // 2 Create user document
    const newUser = {
      name: name,
      age: age,
      city: city,
    };
    await createDocumentWithId("users", UID, newUser);
    console.log("user created?");
  }

  return (
    <div id="sign-up">
      <h1>Create an account</h1>
      <p>Create an account with us to be able to add and edit drivers.</p>
      <form onSubmit={onSignUp}>
        <InputField setup={signUpForm.name} state={[name, setName]} />
        <InputField setup={signUpForm.email} state={[email, setEmail]} />
        <InputField setup={signUpForm.age} state={[age, setAge]} />
        <InputField setup={signUpForm.city} state={[city, setCity]} />
        <InputField
          setup={signUpForm.password}
          state={[password, setPassword]}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
