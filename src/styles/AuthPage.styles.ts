import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  width: "100%",
  height: "98vh",
  boxSizing: "border-box",
  borderRadius: 5,
  alignItems: "center", 
  userSelect: "none",
  p: 3,
  border: "3px solid #184e77",
  backgroundImage:
    `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`,
  bgcolor: "#eaf4fb",
};

export const card: SxProps<Theme> = {
  p: 4,
  mb: 16,
  border: "3px solid #333",
  borderRadius: 4,
  minWidth: 340,
  bgcolor: "#fff",
  fontFamily: "'Handlee', cursive",
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export const title: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontSize: 28,
  mb: 2,
};

export const textField: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
};

export const button: SxProps<Theme> = {
  mt: 1,
  bgcolor: "#3385b6",
  borderRadius: 2,
  fontFamily: "'Handlee', cursive",
  fontSize: 18,
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    bgcolor: "#184e77",
    boxShadow: 2,
  },
};

export const link: SxProps<Theme> = {
  cursor: "pointer",
  color: "#3385b6",
  textDecoration: "underline",
  transition: "color 0.2s",
  "&:hover": { color: "#184e77" },
  fontFamily: "'Handlee', cursive",
  fontSize: 16,
  mt: 2,
  textAlign: "center",
};
