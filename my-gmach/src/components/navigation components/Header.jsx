import React, { useContext } from "react";
import ProfileButton from "./ProfileButton";
import AddGmachButton from "./AddGmachButton";
import Logo from "./Logo";
import EditButton from "./EditButton";
import { gmachContext } from "../../App";
import ReportsButton from "./ReportsButton";

function Header() {
  const { loggedInUser } = useContext(gmachContext);
  

  return (
    <div className="w-full h-16 bg-primary shadow-md flex items-center  justify-between ">
      <ProfileButton />
      <AddGmachButton />
      {
      loggedInUser && (loggedInUser.userType === "gmach_manager" || loggedInUser.userType === "admin") && 
      (
        <EditButton />
      )}
      {
      loggedInUser && loggedInUser.userType === "admin" && 
      (
        <ReportsButton />
      )}
      <Logo />
    </div>
  );
}

export default Header;
