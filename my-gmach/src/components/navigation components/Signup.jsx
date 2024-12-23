import * as React from "react";
import { useState, useRef, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  Stack,
} from "@mui/material";
import { gmachContext } from "../../App";

export default function SignupForm() {
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { setLoggedInUser, setOpenModalSignup } = useContext(gmachContext);

  const [isSigningUp, setIsSigningUp] = useState(true);
  const [showAlert, setShowAlert] = useState({ error: "", message: "" });
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const userName = isSigningUp ? userNameRef.current?.value.trim() : ""; // if signing up, userName is required
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    
    const newErrors = {
      ...(isSigningUp && { userName: !userName ? "שם משתמש נדרש" : "" }), // if logging in, userName is not required
      email: !email ? "אימייל נדרש" : "",
      password: !password ? "סיסמה נדרשה" : "",
    };
    
    
    setErrors(newErrors);
    
    // check if there are any errors
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    
    fetch(`http://localhost:3005/${isSigningUp ? "signup" : "login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        
        if (data.error) {
          setShowAlert({ error: data.error });
        } else {
          const { userId, userName, userType, token } = data;

          localStorage.setItem("my-gmach-token", token);
          setLoggedInUser({ userId, userName ,userType });
          setShowAlert({ message: "הכניסה בוצעה בהצלחה" });
          setTimeout(() => setOpenModalSignup(false), 700);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={8}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
          marginTop: 2,
        }}
      >
        <Button
          variant="outlined"
          disabled={isSigningUp}
          sx={{ minWidth: 100 }}
          onClick={() => setIsSigningUp(true)}
        >
          הרשמה
        </Button>
        <Button
          variant="outlined"
          disabled={!isSigningUp}
          sx={{ minWidth: 100 }}
          onClick={() => setIsSigningUp(false)}
        >
          התחברות
        </Button>
      </Stack>

      <Paper
        elevation={3}
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          {isSigningUp ? "הרשמה" : "התחברות"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 1 }}
        >
          {isSigningUp && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="שם משתמש"
              name="userName"
              autoComplete="userName"
              autoFocus
              variant="outlined"
              inputRef={userNameRef}
              error={!!errors.userName}
              helperText={errors.userName}
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            variant="outlined"
            inputRef={emailRef}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            inputRef={passwordRef}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleSubmit}
          >
            {isSigningUp ? "הרשמה" : "התחברות"}
          </Button>

          {showAlert.error && <Alert severity="error">{showAlert.error}</Alert>}
          {showAlert.message && (
            <Alert severity="success">{showAlert.message}</Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}
