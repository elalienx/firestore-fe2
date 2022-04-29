// NPM package
import { useState } from "react";

// Project files
import form from "../data/driverForm.json";
import firebaseErrors from "../data/firebaseErrors.json";
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

    const filePath = `drivers/driver-${name}-${nationality}.png`;
    const imageURL = await createFile(filePath, file).catch(onFail);
    const driver = {
      name: name,
      nationality: nationality,
      imageURL: imageURL,
      active: false,
    };
    const documentId = await createDocument("drivers", driver).catch(onFail);

    if (documentId) onSuccess(driver, documentId);
    resetForm();
  }

  function onSuccess(driver, id) {
    driver.id = id;
    setDrivers([...drivers, driver]);
  }

  function onFail(error) {
    const message = firebaseErrors[error.code] || firebaseErrors["default"];

    console.error(error.code);
    alert(message);
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
