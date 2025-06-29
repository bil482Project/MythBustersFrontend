import { SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  display: "flex",
  justifyContent: "center",
  overflow: "auto",
  width: "100%",
  height: "98vh",
  boxSizing: "border-box",
  borderRadius: 5,
  p: 3,
  border: "3px solid #184e77",
  backgroundImage:
    `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`,
  bgcolor: "#eaf4fb",
};

export const leftPane: SxProps<Theme> = {
  flex: 6,
  minWidth: 250,
  pr: { xs: 0, md: 3 },
  display: "flex",
  flexDirection: "column",
  gap: 2,
  height: "100%",
};

export const welcomePaper: SxProps<Theme> = {
  px: 2,
  py: 1,
  border: "3px solid #333",
  borderRadius: 4,
  minWidth: 180,
  fontFamily: "'Handlee', cursive",
  fontSize: 22,
  bgcolor: "#fff",
  userSelect: "none",
  marginBottom: "15px"
};

export const gameCard: SxProps<Theme> = {
  flex: 1,
  userSelect: "none",
  minHeight: 240,
  border: "3px solid #333",
  borderRadius: 4,
  bgcolor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Handlee', cursive",
  fontSize: 22,
  cursor: "pointer",
  transition: "background .2s, box-shadow .2s",
  "&:hover": {
    bgcolor: "#f0f0fa",
    boxShadow: 4,
  },
  outline: "none",
};

export const flashPaper: SxProps<Theme> = {
  flex: 1,
  userSelect: "none",
  border: "3px solid #333",
  borderRadius: 4,
  bgcolor: "#fff",
  fontFamily: "'Handlee', cursive",
  fontSize: 24,
  cursor: "pointer",
  transition: "background .2s, box-shadow .2s",
  "&:hover": {
    bgcolor: "#f0f0fa",
    boxShadow: 4,
  },
  outline: "none",
};

export const rightPane: SxProps<Theme> = {
  flex: 4,
  minWidth: 200,
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

export const authPaper: SxProps<Theme> = {
  px: 2,
  py: 1,
  border: "3px solid #333",
  borderRadius: 4,
  bgcolor: "#fff",
  userSelect: "none",
  fontFamily: "'Handlee', cursive",
  fontSize: 18,
  mb: 2,
  display: "flex",
  gap: 2,
  marginRight: 1,
  alignItems: "center",
};

export const authLink: SxProps<Theme> = {
  cursor: "pointer",
  transition: "text-decoration 0.2s",
  "&:hover": { textDecoration: "underline" },
};
