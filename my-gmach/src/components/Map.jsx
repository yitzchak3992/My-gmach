import React from "react";
import MapGoogle from "./MapGoogle";

function Map() {
  return (
    <div
      className="h-full w-full bg-white rounded-lg shadow-md"
      // style={{ backgroundColor: "chartreuse" }}
    >
      <MapGoogle />
    </div>
  );
}

export default Map;
