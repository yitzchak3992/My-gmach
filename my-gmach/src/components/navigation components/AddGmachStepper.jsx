import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const steps = ["מידע כללי", "פרטי קשר", "כתובת", "פרטים נוספים"];

export default function AddGmachStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [formData, setFormData] = React.useState({
    gmach_name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    opening_hours: "",
    image_url: "",
  });

  const totalSteps = () => steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setFormData({
      gmach_name: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      opening_hours: "",
      image_url: "",
    });
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              label='שם הגמ\"ח'
              value={formData.gmach_name}
              onChange={handleChange("gmach_name")}
              margin="normal"
            />
            <TextField
              fullWidth
              label="תיאור"
              value={formData.description}
              onChange={handleChange("description")}
              margin="normal"
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              label="טלפון"
              value={formData.phone}
              onChange={handleChange("phone")}
              margin="normal"
            />
            <TextField
              fullWidth
              label="אימייל"
              value={formData.email}
              onChange={handleChange("email")}
              margin="normal"
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              fullWidth
              label="כתובת"
              value={formData.address}
              onChange={handleChange("address")}
              margin="normal"
            />
            <TextField
              fullWidth
              label="עיר"
              value={formData.city}
              onChange={handleChange("city")}
              margin="normal"
            />
          </>
        );
      case 3:
        return (
          <>
            <TextField
              fullWidth
              label="שעות פתיחה"
              value={formData.opening_hours}
              onChange={handleChange("opening_hours")}
              margin="normal"
            />
            <TextField
              fullWidth
              label="קישור לתמונה"
              value={formData.image_url}
              onChange={handleChange("image_url")}
              margin="normal"
            />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ width: "95%", bgcolor: "#FDFEFE", color: "#212F3C", p: 3 }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{
          mb: 3,
          height: "48px",
          //   bgcolor: '#1A5276',
          borderRadius: "50px",
          border: "2px solid #1A5276", //#F39C12
          "& .MuiStepLabel-label": { color: "#1A5276" },
          "& .MuiStepConnector-line": { borderColor: "#1A5276" },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              כל השלבים הושלמו - ניתן להגיש
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1 }}>
              איפוס
            </Button>
          </>
        ) : (
          <>
            {renderStepContent(activeStep)}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                חזרה
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                הבא
              </Button>
              {activeStep !== steps.length && (
                <Button onClick={handleComplete}>
                  {completed[activeStep] ? "הושלם" : "סיום שלב"}
                </Button>
              )}
            </Box>
          </>
        )}
      </div>
    </Box>
  );
}
