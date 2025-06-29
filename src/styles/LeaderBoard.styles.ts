// src/main/LeaderBoard.styles.ts
import { SxProps, Theme } from "@mui/material";

export const wrapper: SxProps<Theme> = {
  userSelect: "none",
  bgcolor: "#fff",
  p: 2,
  border: "3px solid #333",
  borderRadius: 4,
  mt: 2.5,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  width: "90%",
  height: "75vh",
};

export const title: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  mb: 2,
  textAlign: "center",
  fontWeight: 500,
};

export const filterBar: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  justifyContent: "center",
  mb: 2,
  width: "100%",
};

export const filterBtn = (active: boolean, bg: string): SxProps<Theme> => ({
  bgcolor: active ? bg : "#fff",
  borderRadius: 2,
  border: "2px solid #bbb",
  minWidth: 80,
  color: "#223",
  fontFamily: "'Handlee', cursive",
  fontSize: 17,
  boxShadow: 0,
  textTransform: "none",
  fontWeight: 500,
  "&:hover": { bgcolor: bg },
  transition: "background 0.1s",
});


export const listBox: SxProps<Theme> = {
  width: "100%",
  flex: 1,
  overflowY: "auto",
  minHeight: 0,
  pr: 0.5,
};

export const emptyMsg: SxProps<Theme> = {
  textAlign: "center",
  mt: 3,
  color: "#888",
  fontFamily: "'Handlee', cursive",
};

export const row: SxProps<Theme> = {
  p: 1,
  mb: 1,
  bgcolor: "#f5f6fa",
  borderRadius: 2,
  border: "1.5px solid #e5e5e5",
  boxShadow: "0 1px 4px 0 rgba(44, 62, 80, 0.05)",
};

export const nameText: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontSize: 18,
  fontWeight: 500,
};
