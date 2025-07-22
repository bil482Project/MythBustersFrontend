import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import * as styles from "../styles/AuthPage.styles";
import axios from "axios";

interface RegisterPageProps {
  onNavigateToLogin: () => void;
  onRegisterSucces: (user: { username: string, avatar: string, coin: number, }) => void;
}

export default function RegisterPage({ onNavigateToLogin, onRegisterSucces }: RegisterPageProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    
    try {
        const response = await axios.post("http://localhost:8080/api/profiles", {
          username,
          email,
          password,
        })

        const userObj = {
          username: response.data.username,
          avatar: response.data.profilePhoto,
          coin: response.data.coin || 50, // Default to 50 if coin is not provided
        };

        onRegisterSucces(userObj);
        } catch (e: any) {
          if (e.response && e.response.data && e.response.data.message) {
            setError(e.response.data.message);
          } else {
            setError("Giriş başarısız! Bilgileri kontrol edin.");
          }
        } finally {
          setLoading(false);
        }
  };

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.card}>
        <Typography sx={styles.title}>Sign Up</Typography>

        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={username}
          onChange={e => setUsername(e.target.value)}
          sx={styles.textField}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
          sx={styles.textField}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="new-password"
          sx={styles.textField}
        />

        {error && (
          <Typography color="error" fontSize={14} mb={1}>{error}</Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          sx={styles.button}
          fullWidth
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Kaydediliyor..." : "Sign Up"}
        </Button>

        <Box
          component="span"
          sx={styles.link}
          onClick={onNavigateToLogin}
        >
          Already have an account? Login
        </Box>
      </Paper>
    </Box>
  );
}
