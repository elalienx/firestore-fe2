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

  // Properties
  const imageFormats = "image/png, image/jpeg";

  // Methods
  async function onCreate(event) {
    event.preventDefault();

    const newDriver = {
      name: name,
      nationality: nationality,
      imageURL: "",
      active: false,
    };

    // Upload to CloudStorage and get the URL
    const filePath = `drivers/driver-${name}-${nationality}.png`;
    const imageURL = await createFile(filePath, file).catch(onFail);

    // Add the URL into the driver object
    newDriver.imageURL = imageURL;

    // Send the whole driver object to FireStore
    const driver = await createDocument("drivers", newDriver).catch(onFail);

    if (driver) onSuccess(driver, driver.id);
    resetForm();
  }

  function onSuccess(driver, id) {
    driver.id = id;
    setDrivers([...drivers, driver]);
  }

  function onFail(error) {
    console.error(error.code);
    alert("Sorry, we could not add a new driver. Please try again");
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
      <InputField setup={form.name} state={[name, setName]} />
      <InputField setup={form.country} state={[nationality, setNationality]} />
      <input type="file" accept={imageFormats} onChange={onImageChoose} />
      <button>Submit</button>
      <button onClick={resetForm}>Reset</button>
    </form>
  );
}
