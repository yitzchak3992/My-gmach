import "./App.css";
import { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./MOItheme";
import AppRoutes from "./routes/AppRoutes";
import AddGmachStepper from "./components/navigation components/AddGmachStepper";
import AddGmach from "./pages/AddGmach";

export const gmachContext = createContext();

function App() {
  const [gmachList, setGmachList] = useState([]);
  const [selectedGmach, setSelectedGmach] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [openModalSignup, setOpenModalSignup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <gmachContext.Provider
      value={{
        gmachList,
        setGmachList,
        selectedGmach,
        setSelectedGmach,
        userLocation,
        setUserLocation,
        openModalSignup,
        setOpenModalSignup,
        loggedInUser,
        setLoggedInUser,
      }}
    >
      <ThemeProvider theme={theme}>

        <AppRoutes />

      </ThemeProvider>
    </gmachContext.Provider>
  );
}
export default App;
