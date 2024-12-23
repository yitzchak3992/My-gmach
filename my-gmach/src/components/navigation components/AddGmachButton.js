
import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { gmachContext } from '../../App';
import { useNavigate } from 'react-router-dom';



const AddGmachButton = () => {
  
  const { setOpenModalSignup, loggedInUser, setLoggedInUser } = useContext(gmachContext);
  const navigate = useNavigate();
  const AddGmach = () => {
    if(!loggedInUser){
      console.log("setLoggedInUser-->",setLoggedInUser);
      setOpenModalSignup(true);
      return;
    }
    navigate("/addGmach");
  }
  
  return (
    <Button
    onClick={AddGmach}
      variant="text" // ללא צבע רקע לכפתור
      sx={{
        // backgroundColor: 'white',
        border: '2px solid #F39C12',
        color: '#F39C12',
        fontSize: '18px',
        borderRadius: '50px', // 
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px', // רווח בין האייקון לטקסט
        '&:hover': {
          // backgroundColor: 'rgba(0, 0, 0, 0.05)', // אפקט מעבר
          backgroundColor: "rgba(255, 255, 255, 0.2)", // set hover color

        },
      }}
    >
      <Box
        sx={{
          border: '2px solid #F39C12',
          color: '#F39C12',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          // backgroundColor: '#27AE60', // עיגול מלא סביב האייקון
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AddIcon sx={{ color: 'primary' }} />
      </Box>
      הוסף גמ"ח
    </Button>
  );
};

export default AddGmachButton;
