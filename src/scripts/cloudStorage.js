// NPM packages
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Project file
import { cloudStorage } from "./firebase";

// Methods
// -- Create
export async function createFile(filePath, file) {
  const fileReference = ref(cloudStorage, filePath);

  await uploadBytes(fileReference, file); // uploading a file to the server

  return await getDownloadURL(fileReference); // getting the URL
}

// -- Update (replace)
export async function updateFile() {}

// -- Delete
export async function deleteFile() {}
