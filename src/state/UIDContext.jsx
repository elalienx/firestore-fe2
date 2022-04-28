// NPM packages
import { createContext, useContext, useState } from "react";

// Properties
const Context = createContext(null);

// This is for App.jsx
export function UIDProvider({ children }) {
  // Local state
  const [uid, setUID] = useState(null);

  // Properties
  const value = { uid, setUID };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// This is for every component that needs the user state
export function useUID() {
  const context = useContext(Context);
  const errorText =
    "To use useUID(), wrap the parent component with <UIDProvider/>";

  // Safeguards
  if (!context) throw new Error(errorText);

  return context;
}
