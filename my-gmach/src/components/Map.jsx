import React from "react";
import GoogleMap from "./GoogleMap";

function Map() {
  return (
    <div
      className="h-full w-full bg-white rounded-lg shadow-md"
      style={{ backgroundColor: "chartreuse" }}
    >
      Map
      <GoogleMap />
    </div>
  );
}

export default Map;
