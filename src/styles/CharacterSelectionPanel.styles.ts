// src/game/CharacterSelectionPanel.styles.ts
import { SxProps, Theme } from "@mui/material";

export const wrapper: SxProps<Theme> = {
  borderRadius: 5,
  p: 4,
  gap: 1,
  mt: 2.5,
  height: "80%",
  border: "3px solid #333",
  bgcolor: "#fff",
  display: "flex",
  width: "30%",
  flexDirection: "column",
  userSelect: "none",
};

export const title: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontWeight: 700,
  fontSize: 28,
  borderBottom: "2px solid #333",
  pb: 1,
  mb: 2,
  textAlign: "center",
};

export const catTitle: SxProps<Theme> = {
  fontFamily: "'Handlee', cursive",
  fontSize: 20,
  fontWeight: 600,
  mb: 1,
};

export const itemRow: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  mb: 1,
};

export const itemCard: SxProps<Theme> = {
  border: "2px solid #444",
  borderRadius: 4,
  minHeight: 68,
  minWidth: 90,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "'Handlee', cursive",
  fontSize: 16,
  bgcolor: "#fff",
  cursor: "pointer",
  userSelect: "none",
  "&:hover": {
    bgcolor: "#f7f7fa",
    borderColor: "#3375b6",
  },
};
