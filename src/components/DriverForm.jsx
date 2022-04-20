// NPM package
import { useState } from "react";

// Project files
import form from "../data/driverForm.json";
import { createDocument } from "../scripts/fireStore";
import InputField from "./InputField";

export default function DriverForm({ driversState }) {
  const [drivers, setDrivers] = driversState;

  // Local state
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [imageURL, setImageURL] = useState("");

  async function onCreate(event) {
    event.preventDefault();

    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: imageURL,
      active: false,
    };
    const payload = await createDocument("drivers", newDriver);
    const { data, error } = payload;

    error ? createFail(data) : createSucceed(newDriver, data);
  }

  function createSucceed(driver, id) {
    driver.id = id;
    setDrivers([...drivers, driver]);
  }

  function createFail(error) {
    console.error(error);
    alert("Sorry, we could not add a new driver. Please try again");
    resetForm();
  }

  function resetForm() {
    setName("");
    setNationality("");
    setImageURL("");
  }

  return (
    <form onSubmit={onCreate}>
      <h2>Add a new driver</h2>
      <InputField setup={form.name} state={[name, setName]} />
      <InputField setup={form.country} state={[nationality, setNationality]} />
      <InputField setup={form.imageURL} state={[imageURL, setImageURL]} />
      <button>Submit</button>
      <button onClick={resetForm}>Reset</button>
    </form>
  );
}
