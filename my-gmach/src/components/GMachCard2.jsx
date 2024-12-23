import React, { useContext } from "react";
import {
  Star,
  MapPin,
  Wrench,
  Phone,
  MessageSquare,
} from "lucide-react";
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, Typography, Box, Fab } from "@mui/material";
import { modalContext } from "./GmachList";

const GmachCard2 = ({ gmach }) => {
  const { setOpenModal, setModalContent } = useContext(modalContext);

  return (
    <Card
      onClick={() => {
        setOpenModal(true);
        setModalContent(gmach);
      }}
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
        <Box display="flex" justifyContent="flex-end">
          <Fab 
            color="secondary"
            aria-label="edit"
            onClick={(e) => e.stopPropagation()} // Prevent the click event from propagating to the parent component
          >
              <EditIcon />
          </Fab>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GmachCard2;
