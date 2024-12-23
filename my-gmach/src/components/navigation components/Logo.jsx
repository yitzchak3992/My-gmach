// import React from "react";
// import { Link, Navigate } from "react-router-dom";
// import Button from '@mui/material/Button';

// const Logo = () => {
//   const logoStyle = {
//     fontFamily: "'Gluten', cursive",
//     fontWeight: 400,
//     fontVariationSettings: '"slnt" -10',
//     fontSize: "3rem",
//     color: "transparent",
//     WebkitTextStroke: "2px #F39C12",
//     textAlign: "center",
    
//   };

//   return(
//     <Button
//     onClick={()=>Navigate("/My-Gmach")
//     }
//     //   variant="text" // ללא צבע רקע לכפתור
//       sx={{
//         // backgroundColor: 'white',
//         // border: '2px solid #F39C12',
//         // color: '#F39C12',
//         // fontSize: '18px',
//         borderRadius: '50px', // 
//         padding: '6px 16px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: '8px', // רווח בין האייקון לטקסט
//         '&:hover': {
//           // backgroundColor: 'rgba(0, 0, 0, 0.05)', // אפקט מעבר
//           backgroundColor: "rgba(255, 255, 255, 0.2)", // set hover color

//         },
//       }}
//     > 
//       <h1 style={logoStyle}>MY GMACH</h1>;
// </Button>
//   )
// };

// export default Logo;




import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Logo = () => {
  const navigate = useNavigate(); // שימוש ב-hook לניווט

  const logoStyle = {
    fontFamily: "'Gluten', cursive",
    fontWeight: 400,
    fontVariationSettings: '"slnt" -10',
    fontSize: "2rem",
    color: "transparent",
    WebkitTextStroke: "1px #F39C12",
    textAlign: "center",
  };

  return (
    <Button
      onClick={() => navigate("/My-Gmach")} 
      sx={{
        borderRadius: "50px",
        padding: "6px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)", // set hover color
        },
      }}
    >
      <h1 style={logoStyle}>MY GMACH</h1>
    </Button>
  );
};

export default Logo;
