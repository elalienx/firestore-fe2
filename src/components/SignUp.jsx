/**
 * NOTE THIS IS PSEUDO CODE (FAKE CODE)
 * IS JUST FOR ILLUSTRATION PURPOSES
 * TOMORROW WE WILL CODE THE REAL THING
 */
import { useState } from "react";

export function SignUp() {
  const [name, setName] = useState("");
  let email;
  let age;
  let password;
  let city;

  async function onCreate() {
    // 1 Create UID
    const newUID = await createUser(email, password); // fiuewiuhfwehiufihuwe

    // 2 Create user documnet
    const newUser = { name: name, age: age, city: city};
    await createDocumentWithId("users", newUser, newUID);
  }

  return (
    <form onSubmit={onCreate}>
      <input placeholder="name" />
      <input placeholder="email" />
      <input placeholder="password" />
      <input placeholder="city" />
      <button>Submit</button>
    </form>
  );
}
