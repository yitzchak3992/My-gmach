import React, { useEffect, useState } from "react";
import GmachCard from "./GmachCard";



function GmachList({gmachList, setGmachList}) {
  
  const fetchAllGmach = ()=>{  fetch("http://localhost:3005/all-gmach")  
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((gmachObjectList) => {      
      setGmachList(gmachObjectList);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  
useEffect(fetchAllGmach,[])


  return (
    <div
      dir="rtl"
      className="basis-2/3	 bg-white rounded-lg shadow-md overflow-y-auto"
      style={{ backgroundColor: " rgb(249, 249, 12)" }}
    >
      GmachList
      {gmachList.map((obj) => (
        <GmachCard gmach={obj} />
      ))}
    </div>
  );
}

export default GmachList;
