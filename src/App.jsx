// Project files
import { getCollection } from "./scripts/fireStore";

export default function App() {
  getCollection("drivers");

  return (
    <div className="App">
      <h1>My super fanpage about racing 🏁</h1>
    </div>
  );
}
