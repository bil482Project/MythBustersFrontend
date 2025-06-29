// src/styles/logoutDialogStyles.ts
import { SxProps, Theme } from "@mui/material";

export const dialogPaper: SxProps<Theme> = {
  border: "3px solid #333",
  borderRadius: 4,
  minWidth: 340,
  bgcolor: "#fff",
  fontFamily: "'Handlee', cursive",
  p: 2,
};

export const title: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontWeight: 600,
  fontSize: 24,
  textAlign: "center",
  mb: 1,
  letterSpacing: "0.5px",
};

export const content: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontSize: 18,
  textAlign: "center",
  p: 2,
};

export const actions: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  gap: 2,
  pb: 2,
};

export const button: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontSize: 17,
  borderRadius: 2,
  fontWeight: 500,
  px: 3,
  py: 1,
  textTransform: "none",
  boxShadow: "none",
  border: "2px solid #3385b6",
  bgcolor: "#eaf4fb",
  color: "#184e77",
  "&:hover": {
    bgcolor: "#3385b6",
    color: "#fff",
    border: "2px solid #184e77",
  },
};

export const dangerButton: SxProps<Theme> = {
    fontFamily: "'Handlee', cursive",
    fontSize: 17,
    borderRadius: 2,
    fontWeight: 500,
    px: 3,
    py: 1,
    textTransform: "none",
    boxShadow: "none",
    border: "2px solid #b71c1c",
    bgcolor: "#eaf4fb",
    color: "#b71c1c",
    "&:hover": {
    bgcolor: "#b71c1c",
    color: "#fff",
    border: "2px solid #b71c1c",
    },
};
