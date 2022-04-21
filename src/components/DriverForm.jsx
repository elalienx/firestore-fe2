// NPM package
import { useState } from "react";

// Project files
import form from "../data/driverForm.json";
import { createDocument } from "../scripts/fireStore";
import { createFile } from "../scripts/cloudStorage";
import readFile from "../scripts/resize-image/readFile";
import resizeImage from "../scripts/resize-image/resizeImage";
import InputField from "./InputField";

export default function DriverForm({ driversState }) {
  const [drivers, setDrivers] = driversState;

  // Local state
  const [name, setName] = useState("Eduardo");
  const [nationality, setNationality] = useState("Ecuador");
  const [file, setFile] = useState(null);

  async function onCreate(event) {
    event.preventDefault();

    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: "",
      active: false,
    };

    // #4 Validate the form
    if (name === "") return;
    if (nationality === "") return;
    if (file === null) return;

    // #5 Upload to CloudStorage and get the URL
    const path = "drivers/";
    const fileName = `driver-${name}-${nationality}.png`;
    const filePath = path + fileName;
    const imageURL = await createFile(filePath, file);

    // #6 Add the URL into the driver object
    newDriver.imageURL = imageURL;

    // #7 Send the whole driver object to FireStore
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

  async function onImageChoose(event) {
    const file = event.target.files[0];
    const imageImage = await readFile(file);
    const resizedImage = await resizeImage(imageImage, 250, 250);

    setFile(resizedImage);
  }

  function resetForm() {
    setName("");
    setNationality("");
    setFile(null);
  }

  return (
    <form onSubmit={onCreate}>
      <h2>Add a new driver</h2>
      {/* #1 Fill the form */}
      <InputField setup={form.name} state={[name, setName]} />
      <InputField setup={form.country} state={[nationality, setNationality]} />

      {/* #2 Press the choose file button */}
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={onImageChoose}
      />

      {/* #3 Press the submit button */}
      <button>Submit</button>
      <button onClick={resetForm}>Reset</button>
    </form>
  );
}
