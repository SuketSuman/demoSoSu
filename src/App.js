import React from "react";
import floorplanData from "./floorplanData.json";
import Floorplan from "./Floorplan";

function App() {
  return (
    <div>
      <h1>Floorplan</h1>
      <Floorplan rooms={floorplanData.rooms} />
    </div>
  );
}

export default App;
