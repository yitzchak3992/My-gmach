import React, { createContext, useContext, useEffect, useState } from "react";
import GmachCard from "../GmachCard";
import GmachModal from "../GmachModal";
import GmachModal2 from "../GmachModal";
import { gmachContext } from "../../App";


export const modalContext = createContext()


function GmachList() {
  
  const { gmachList, setGmachList } = useContext(gmachContext);
  const [openModal, setOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState(false)


  const fetchAllGmach = () => {
    fetch("http://localhost:3005/all-gmach")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((gmachObjectList) => {
        // console.log("gmachObjectList:", gmachObjectList);
        gmachObjectList.forEach((gmach) => {
          gmach.latitude = parseFloat(gmach.latitude);
          gmach.longitude = parseFloat(gmach.longitude);
          gmach.rating = parseFloat(gmach.rating);
        });
        setGmachList(gmachObjectList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(fetchAllGmach, []);

  return (
    <div
      dir="rtl"
      className="basis-2/3	 BackgroundDark rounded-lg shadow-md overflow-y-auto"
      // style={{ backgroundColor: " rgb(249, 249, 12)" }}
    >
      <modalContext.Provider value={{openModal, setOpenModal, modalContent, setModalContent}}>
        {/* <GmachModal/> */}
        <GmachModal2/>
      {gmachList.map((obj, i) => (
        <GmachCard gmach={obj} key={i} />
      ))}
      </modalContext.Provider>
    </div>
  );
}

export default GmachList;
