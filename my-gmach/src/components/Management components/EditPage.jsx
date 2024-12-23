import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { gmachContext } from "../../App";

// Example usage:
const gmach = {
  id: 1,
  name: "ציוד רפואי",
  description: "ציוד רפואי מיוחד וייחודי",
  address: "הרב שך 10",
  city: "בני ברק",
  phone: "03-6789632",
  email: null,
  rating: null,
  image_url: "/images/medical2-gmach.jpg",
  opening_hours: "24/7 בתיאום מראש",
  created_at: "2024-11-03T13:16:39.000Z",
  updated_at: "2024-11-20T13:49:36.000Z",
  category_id: 1,
  is_primary: 1,
  icon_url: "/icons/medical.svg",
  category: "ציוד רפואי",
};

const EditPage = ({}) => {
  const { selectedGmach } = useContext(gmachContext);
  console.log("selectedGmach:", selectedGmach);


  const [gmachData, setGmachData] = useState(() => ({
    name: selectedGmach?.name || '',
    category: selectedGmach?.category || '',
    description: selectedGmach?.description || '',
    address: selectedGmach?.address || '',
    city: selectedGmach?.city || '',
    phone: selectedGmach?.phone || '',
    email: selectedGmach?.email || '',
    image_url: selectedGmach?.image_url || '',
    opening_hours: selectedGmach?.opening_hours || '',
  }));
  
  const [editFields, setEditFields] = useState({});

  const navigate = useNavigate();
    if (!selectedGmach) {
      navigate("/handleGmach");
      return null;
    }
  

  const handleEdit = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleSave = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: false }));
    // Handle saving to the backend if needed
    console.log(`Saved field ${field}:`, gmachData[field]);
  };

  const handleChange = (field, value) => {
    setGmachData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
      <Typography variant="h5" mb={2} textAlign="center">
        עריכת מידע גמ"ח
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(gmachData).map(([field, value]) => (
          <React.Fragment key={field}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1}>
                <TextField
                  label={field}
                  value={gmachData[field] || ""}
                  fullWidth
                  disabled={!editFields[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                />
                {!editFields[field] ? (
                  <IconButton onClick={() => handleEdit(field)}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSave(field)}
                  >
                    שמור
                  </Button>
                )}
              </Box>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default EditPage;
