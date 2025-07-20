import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import * as styles from "../styles/CharacterSelectionPanel.styles";

interface CharacterCategory {
  title: string;
  items: string[];
}

const characterCategories: CharacterCategory[] = [
  { title: "Animals", items: ["5 gold", "10 gold", "20 gold"] },
  { title: "Cars",    items: ["50 gold", "100 gold", "200 gold"] },
  { title: "Human",   items: ["ali", "ayşe", "mehmet"] },
];

const CharacterSelectionPanel: React.FC = () => (
  <Paper sx={styles.wrapper}>
    <Typography sx={styles.title}>Select Character</Typography>

    {characterCategories.map((cat, idx) => (
      <Box key={cat.title} sx={{ mb: idx !== characterCategories.length - 1 ? 2 : 0 }}>
        <Typography sx={styles.catTitle}>{cat.title}</Typography>

        <Box sx={styles.itemRow}>
          {cat.items.map(item => (
            <Paper key={item} elevation={0} sx={styles.itemCard}>
              {item}
            </Paper>
          ))}
        </Box>
      </Box>
    ))}
  </Paper>
);

export default CharacterSelectionPanel;
