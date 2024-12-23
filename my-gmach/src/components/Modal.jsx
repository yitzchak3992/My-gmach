import React, { useContext } from 'react'
import { 
  Button, 
  Dialog, 
  DialogActions, 
  Avatar 
} from '@mui/material';
import { gmachContext } from '../App';
import SignupForm from '../components/navigation components/Signup';

export default function ModalSignup() {

  const {openModalSignup, setOpenModalSignup } = useContext(gmachContext);

  return (
    <React.Fragment>
      <Dialog
        // fullWidth={}
        // maxWidth={}
        open={openModalSignup}
        onClose={()=> setOpenModalSignup(false)}
      >

          <SignupForm/>

        <DialogActions>
          <Button  variant="outlined" color="primary" onClick={() => setOpenModalSignup(false)}> סגור </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
