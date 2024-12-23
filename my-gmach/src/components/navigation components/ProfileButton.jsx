import React, { useContext, useEffect } from "react";
import { gmachContext } from "../../App";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

function tokenIsValid(token) {
  if (!token) return [false, null]; // token doesn't exist = expired
  try {
    // Splitting the token and getting the expiration date
    const payloadBase64 = token.split(".")[1];
    // Decodes the payload by UTF-8 so that it supports Hebrew
    const payload = JSON.parse(
      decodeURIComponent(
        atob(payloadBase64)
          .split("")
          .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
          .join("")
      )
    );

    const userName = payload.userName || null;
    const userId = payload.userId || null;
    const userType = payload.userType || null;
    

    // Checking the expiration date
    const currentTime = Math.floor(Date.now() / 1000); // The current time in UNIX timestamp
    const tokenValid = payload.exp < currentTime; // If the current time is greater than exp, the token is expired

    return [tokenValid, { userName, userId, userType }];
  } catch (e) {
    console.error("Invalid token", e);
    return [false, null]; // An invalid token is considered expired
  }
}

function ProfileButton() {
  const { setOpenModalSignup, loggedInUser, setLoggedInUser } =
    useContext(gmachContext);

  useEffect(() => {
    const token = localStorage.getItem("my-gmach-token");
    const [tokenValid, userInfo] = tokenIsValid(token);
    if (tokenValid) return;
    userInfo && setLoggedInUser(userInfo);
  }, []);

  return (
    <IconButton
      sx={{
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)", // set hover color
        },
      }}
      onClick={() => setOpenModalSignup(true)}
    >
      <Avatar
        alt="User"
        src=""
        sx={{
          ...(loggedInUser && { bgcolor: "#F39C12" }),
          color: "white",
        }}
      >
        {loggedInUser &&
          loggedInUser.userName &&
          loggedInUser.userName.slice(0, 2)}
      </Avatar>
    </IconButton>
  );
}

export default ProfileButton;
