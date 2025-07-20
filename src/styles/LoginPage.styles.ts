// src/auth/LoginPage.styles.ts
import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  minHeight: "100vh",
  bgcolor: "#eaf4fb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const card: SxProps<Theme> = {
  p: 4,
  border: "3px solid #333",
  borderRadius: 4,
  minWidth: 340,
  bgcolor: "#fff",
  fontFamily: "'Handlee', cursive",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const button: SxProps<Theme> = {
  mt: 1,
  bgcolor: "#3385b6",
  borderRadius: 2,
  fontFamily: "'Handlee', cursive",
  fontSize: 18,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": { bgcolor: "#184e77", boxShadow: 2 },
};

export const link: SxProps<Theme> = {
  cursor: "pointer",
  color: "#3385b6",
  textDecoration: "underline",
  transition: "color 0.2s",
  "&:hover": { color: "#184e77" },
  fontFamily: "'Handlee', cursive",
  fontSize: 16,
};
