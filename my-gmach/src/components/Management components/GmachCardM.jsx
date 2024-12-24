import React, { useContext, useState } from "react";
import {
  Star,
  MapPin,
  Wrench,
  Phone,
  MessageSquare,
} from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardContent, Typography, Box, Fab, Tooltip } from "@mui/material";
// import { modalContext } from "./GmachList";
import { useNavigate } from 'react-router-dom';
import { gmachContext } from "../../App";
import DeletePopup from "./DeletePopup";



const GmachCardM = ({ gmach, onDelete }) => {


    const {setSelectedGmach} = useContext(gmachContext)
    //   const { setOpenModal, setModalContent } = useContext(modalContext);
    const navigate = useNavigate();


  // DeletePopup component 
    const [popupOpen, setPopupOpen] = useState(false);

    const handleOpen = () => setPopupOpen(true);
    const handleClose = () => setPopupOpen(false);
    const handleDelete = async () => {

      console.log("Delete button clicked:", gmach.id);
      console.log("gmach:", gmach);
      
    try {
      const response = await fetch('http://localhost:3005/DeleteGmach', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: gmach.id }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete gmach');
      }
  
      const result = await response.json();
      console.log('Gmach deleted successfully:', result.message);
      alert('Gmach deleted successfully');
    } catch (error) {
      console.error('Error deleting gmach:', error.message);
      alert(`Error deleting gmach: ${error.message}`);
    }

      handleClose();
    }
  

  return (
    <>
      <DeletePopup
        gemachName={gmach.name}
        gmachId={gmach.id}
        open={popupOpen}
        onClose={handleClose}
        onDelete={handleDelete}
      />

      
    <Card
    //   onClick={() => {
    //     setOpenModal(true);
    //     setModalContent(gmach);
    //   }}
      sx={{
        border: "1px solid",
        borderColor: "primary.main",
        bgcolor: "#FDFEFE",
        borderRadius: 2,
        boxShadow: 2,
        p: 2,
        mb: 2,
        "&:hover": {
          boxShadow: 4,
        },
        cursor: "pointer",
        transition: "box-shadow 0.3s",
      }}
    >
      <CardContent>
        {/* מיקום וקטגוריה */}
        <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color="text.secondary"
          >
            <Wrench size={16} />
            <Typography variant="body2">{gmach.category}</Typography>
          </Box>
        </Box>

        {/* Header - שם וציון */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" color="secondary">
            {gmach.name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            bgcolor="primary.light"
            px={1}
            py={0.5}
            borderRadius={1}
          >
            <Star size={16} style={{ fill: "#FFD700", stroke: "#FFD700" }} />
            <Typography variant="body2" fontWeight="medium">
              {gmach.rating}
            </Typography>
          </Box>
        </Box>

        {/* מיקום */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          color="text.secondary"
          mb={2}
        >
          <MapPin size={16} />
          <Typography variant="body2">
            {gmach.city}, {gmach.address}
          </Typography>
        </Box>

        {/* פרטי התקשרות */}
        <Box display="flex" gap={2} mb={2}>
          {gmach.phone && (
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="text.secondary"
            >
              <Phone size={16} />
              <Typography variant="body2" dir="ltr">
                {gmach.phone}
              </Typography>
            </Box>
          )}
          {gmach.WhatsAppNumber && (
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              color="success.main"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M17.472 14.382..." />
              </svg>
              <Typography variant="body2" dir="ltr">
                {gmach.WhatsAppNumber}
              </Typography>
            </Box>
          )}
        </Box>

        {/* פריטים זמינים */}
        <Box mb={2}>
          <Typography variant="subtitle2" color="text.primary" mb={1}>
            פריטים זמינים:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {gmach.description}
          </Typography>
        </Box>

        {/* מספר תגובות */}
        {gmach.reviews && gmach.reviews.length > 0 && (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            color="text.secondary"
          >
            <MessageSquare size={16} />
            <Typography variant="body2">
              {gmach.reviews.length} תגובות
            </Typography>
          </Box>
        )}

        {/* כפתורים */}
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Tooltip title="ערוך">
            <Fab
              size="small"
              color="secondary"
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedGmach(gmach);
                navigate("/EditPage");

                console.log("Edit clicked");
              }}
            >
              <EditIcon />
            </Fab>
          </Tooltip>

          <Tooltip title="מחק">
            <Fab
              size="small"
              color="error"
              aria-label="delete"
              onClick={handleOpen}
              // onClick={(e) => {
                // e.stopPropagation();
                // setSelectedGmach(gmach);
                // onDelete(gmach.id);
              // }}
            >
              <DeleteIcon />
            </Fab>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
    </>
  );
};


export default GmachCardM;

