import React, { useState } from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import * as styles from "../styles/AuthPage.styles";
import axios from "axios";

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onLoginSuccess: (user: { username: string; avatar: string; coin: number; }) => void;
}

export default function LoginPage({ onNavigateToRegister, onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/profiles/login", {
        email,
        password,
      });

      const userObj = {
        username: response.data.username,
        avatar: response.data.profilePhoto,
        coin: response.data.coin || 50, // Default to 0 if coin is not provided
      };

      onLoginSuccess(userObj);
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
        <Typography sx={styles.title}>Login</Typography>

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
          autoComplete="current-password"
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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Giriş yapılıyor..." : "Login"}
        </Button>

        <Box
          component="span"
          sx={styles.link}
          onClick={onNavigateToRegister}
        >
          Don't have an account? Sign Up
        </Box>
      </Paper>
    </Box>
  );
}
