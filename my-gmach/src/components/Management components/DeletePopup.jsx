import React, { useState } from "react";
import {
    Alert,
    AlertTitle,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeletePopup = ({ gmachName, open, onClose, onDelete, alertMessage, setAlertMessage }) => {

  const handleDelete = () => {
    onDelete();
    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
 <DialogTitle sx={{ textAlign: "center", position: "relative" }}>
    <Typography variant="h6" component="div">
      מחיקת גמ"ח
    </Typography>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>      <DialogContent>
      <DialogContentText>
  {`האם אתה בטוח שברצונך למחוק את גמ"ח "${gmachName}"? פעולה זו אינה ניתנת לשחזור.`}
</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          ביטול
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          אישור
        </Button>
      </DialogActions>

      {
      alertMessage &&
      <Box sx={{ paddingBottom: 1}} >
      <Box
        sx={{
          padding: 1,
          marginBottom: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "80%",
          margin: "0 auto", // מרכז את האלמנט
        }}
      >
      <Alert severity={alertMessage.success ? "success" : "error"}>
        <AlertTitle>{ alertMessage.success ? "Success" : alertMessage.Error}</AlertTitle>
        {alertMessage.message}
        </Alert>
        </Box>
        </Box>
        }

    </Dialog>
  );
};
export default DeletePopup;
