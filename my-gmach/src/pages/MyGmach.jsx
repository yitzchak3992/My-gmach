import React, { useState } from "react";
import ModalSignup from "../components/Modal";
import Filters from "../components/Filters";
import Map from "../components/Map";
import GmachList from "../components/GmachList";

function MyGmach() {

  return (
    <>
      <ModalSignup />
      <div className="min-h-screen flex flex-col bg-light">
        <Filters  />
        <div className="flex flex-1 gap-4 p-4 h-[calc(100vh-8.5rem)]">
          <div className="flex-1 sticky top-4">
            <div className="h-[calc(100vh-8.5rem)]">
              <Map />
            </div>
          </div>
          <GmachList  />
        </div>
      </div>
    </>
  );
}

export default MyGmach;
