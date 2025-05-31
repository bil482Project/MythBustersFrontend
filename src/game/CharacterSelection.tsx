import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface CharacterCategory {
    title: string;
    items: string[];
}

const characterCategories: CharacterCategory[] = [
    {
        title: "Animals",
        items: ["5 gold", "10 gold", "20 gold"]
    },
    {
        title: "Cars",
        items: ["50 gold", "100 gold", "200 gold"]
    },
    {
        title: "Human",
        items: ["ali", "ayşe", "mehmet"]
    }
];

const CharacterSelectionPanel: React.FC = () => (
    <Paper
        sx={{
            borderRadius: 5,
            p: 4,
            gap: 3,
            mt: 2.5,
            height: "80%",
            border: "3px solid #333",
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            userSelect: "none"
        }}
    >
        <Typography
            align="center"
            sx={{
                fontFamily: "'Handlee', cursive",
                fontWeight: 700,
                fontSize: 28,
                borderBottom: "2px solid #333",
                pb: 1,
                mb: 2,
            }}
        >
            Select Character
        </Typography>
        {characterCategories.map((cat, idx) => (
            <Box key={cat.title} sx={{ mb: idx !== characterCategories.length - 1 ? 2 : 0 }}>
                <Typography
                    sx={{
                        fontFamily: "'Handlee', cursive",
                        fontSize: 20,
                        fontWeight: 600,
                        mb: 1,
                    }}
                >
                    {cat.title}
                </Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    mb: 1,
                }}>
                    {cat.items.map((item) => (
                        <Paper
                            key={item}
                            elevation={0}
                            sx={{
                                border: "2px solid #444",
                                borderRadius: 4,
                                minHeight: 68,
                                minWidth: 90,
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: "'Handlee', cursive",
                                fontSize: 20,
                                bgcolor: "#fff",
                                cursor: "pointer",
                                userSelect: "none",
                                "&:hover": {
                                    bgcolor: "#f7f7fa",
                                    borderColor: "#3375b6"
                                }
                            }}
                        >
                            {item}
                        </Paper>
                    ))}
                </Box>
            </Box>
        ))}
    </Paper>
);

export default CharacterSelectionPanel;
