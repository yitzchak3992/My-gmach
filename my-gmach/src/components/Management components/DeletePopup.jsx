import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DeletePopup = ({ gemachName, open, onClose, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        מחיקת גמ"ח
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
      </DialogTitle>
      <DialogContent>
      <DialogContentText>
  {`האם אתה בטוח שברצונך למחוק את גמ"ח "${gemachName}"? פעולה זו אינה ניתנת לשחזור.`}
</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeletePopup;
