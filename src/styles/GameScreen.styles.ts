// src/game/GameScreen.styles.ts
import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  width: "100%",
  height: "100vh",
  boxSizing: "border-box",
  p: 3,
  border: "3px solid #184e77",
  backgroundImage:
    `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`,
  bgcolor: "#eaf4fb",
};

export const layout: SxProps<Theme> = {
  display: "flex",
  gap: 4,
};

export const centerCol: SxProps<Theme> = {
  width: "30vw",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  userSelect: "none",
  gap: 3,
};

export const heading: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontWeight: 700,
  fontSize: 42,
  mb: 2,
};

export const selectorPaper: SxProps<Theme> = {
  p: 2,
  borderRadius: 4,
  border: "2px solid #222",
  mb: 1,
  fontFamily: "'Handlee', cursive",
  fontSize: 26,
  width: 300,
  textAlign: "center",
  bgcolor: "#fff",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
};

export const mainBtn: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  border: "2px solid #222",
  borderRadius: 4,
  fontSize: 32,
  width: 260,
  p: 1.2,
  bgcolor: "#fff",
  fontWeight: 600,
  mt: 2,
  boxShadow: "0 2px 10px 0 rgba(44, 62, 80, 0.07)",
  "&:hover": { bgcolor: "#f7f7fa" },
};
