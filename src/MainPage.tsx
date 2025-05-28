import React from "react";
import { Box, Paper, Typography, Button, Stack, IconButton } from "@mui/material";
import LeaderBoard from "./main/LeaderBoard";

interface MainPageProps {
    onSelectGame: () => void;
}

const games = [
    { label: "Racing Game", onClick: () => alert("Racing Game") },
    { label: "Balloon Popping", onClick: () => alert("Balloon Popping") },
    { label: "Hangman?", onClick: () => alert("Hangman?") },
];

function MainPage({ onSelectGame }: MainPageProps) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
                p: 10,
            }}
        >
            <Paper
                sx={{
                    width: "100%",
                    maxWidth: 1100,
                    minHeight: 550,
                    borderRadius: 5,
                    p: 3,
                    mx: "auto",
                    border: "3px solid #184e77",
                    boxShadow: "0 8px 24px 0 rgba(44, 62, 80, 0.07)",
                    display: "flex",
                    gap: 2,
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`,
                    backgroundRepeat: "repeat",
                    bgcolor: "#eaf4fb",
                    alignItems: "stretch",
                }}
            >
                <Box flex={6} minWidth={400} pr={3} display="flex" flexDirection="column" gap={2} sx={{ height: "100%" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Paper
                            elevation={0}
                            sx={{
                                px: 2,
                                py: 1,
                                border: "3px solid #333",
                                borderRadius: 4,
                                minWidth: 270,
                                fontFamily: "'Handlee', cursive",
                                fontSize: 22,
                                bgcolor: "#fff",
                                userSelect: "none",
                            }}
                        >
                            Welcome to MythBusters!
                        </Paper>

                    </Box>
                    <Box display="flex" gap={3} mb={2}>
                        {games.map(game => (
                            <Paper
                                key={game.label}
                                component="button"
                                onClick={game.onClick}
                                sx={{
                                    flex: 1,
                                    userSelect: "none",
                                    minHeight: 120,
                                    border: "3px solid #333",
                                    borderRadius: 4,
                                    bgcolor: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: "'Handlee', cursive",
                                    fontSize: 28,
                                    cursor: "pointer",
                                    transition: "background .2s, box-shadow .2s",
                                    "&:hover": {
                                        bgcolor: "#f0f0fa",
                                        boxShadow: 4,
                                    },
                                    outline: "none",
                                }}
                            >
                                {game.label}
                            </Paper>
                        ))}
                    </Box>
                    <Paper
                        elevation={0}
                        component="button"
                        onClick={() => alert('FlashCard Tıklandı')}
                        sx={{
                            flex: 1,
                            minHeight: 300,
                            userSelect: "none",
                            border: "3px solid #333",
                            borderRadius: 4,
                            bgcolor: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'Handlee', cursive",
                            fontSize: 32,
                            cursor: "pointer",
                            transition: "background .2s, box-shadow .2s",
                            "&:hover": {
                                bgcolor: "#f0f0fa",
                                boxShadow: 4,
                            },
                            outline: "none",
                        }}
                    >
                        Learn - FlashCards
                    </Paper>

                </Box>
                <Box
                    flex={4}
                    minWidth={320}
                    display="flex"
                    flexDirection="column"
                >
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        gap={1}
                        width="100%"
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                px: 2,
                                py: 1,
                                border: "3px solid #333",
                                borderRadius: 4,
                                bgcolor: "#fff",
                                userSelect: "none",
                                fontFamily: "'Handlee', cursive",
                                fontSize: 18,
                                mb: 2,
                            }}
                        >
                            Login / Sign In
                        </Paper>
                    </Box>
                    <LeaderBoard />
                </Box>
            </Paper>
        </Box>
    );
};

export default MainPage;
