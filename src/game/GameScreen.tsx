import React from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CharacterSelectionPanel from "./CharacterSelection";
import LeaderBoard from "../main/LeaderBoard";

interface GameScreenProps {
    title: string;
    onGoToMain: () => void;
}

const GAME_MODES = ["Speedrun Mode", "Normal Mode", "Hardcore Mode"];
const GAME_DIFFICULT = ["Easy", "Normal", "Hard"];

const GameScreen: React.FC<GameScreenProps> = ({ title, onGoToMain }) => {
    const [modeIndex, setModeIndex] = React.useState(0);
    const [difficult, setDifficult] = React.useState(0);

    const handlePrevMode = () => {
        setModeIndex((prev) => (prev === 0 ? GAME_MODES.length - 1 : prev - 1));
    };
    const handleNextMode = () => {
        setModeIndex((prev) => (prev === GAME_MODES.length - 1 ? 0 : prev + 1));
    };

    const handlePrevDifficult = () => {
        setDifficult((prev) => (prev === 0 ? GAME_DIFFICULT.length - 1 : prev - 1));
    };
    const handleNextDifficult = () => {
        setDifficult((prev) => (prev === GAME_DIFFICULT.length - 1 ? 0 : prev + 1));
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                overflow: "auto",
                width: "100%",
                height: "98vh",
                boxSizing: "border-box",
                borderRadius: 5,
                p: 3,
                border: "3px solid #184e77",
                backgroundImage: `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`,
                bgcolor: "#eaf4fb",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                }}
            >
                <CharacterSelectionPanel />

                <Box
                    sx={{
                        width: "30vw",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 3,
                    }}
                >
                    <Typography
                        align="center"
                        sx={{
                            fontFamily: "'Handlee', cursive",
                            fontWeight: 700,
                            fontSize: 42,
                            mb: 2,
                        }}
                    >
                        {title}
                    </Typography>
                    <Paper
                        sx={{
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
                        }}
                    >
                        <IconButton onClick={handlePrevMode} sx={{ p: 0.7 }}>
                            <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                            Gamemode<br />
                            <span style={{ fontSize: 22 }}>{GAME_MODES[modeIndex]}</span>
                        </Box>
                        <IconButton onClick={handleNextMode} sx={{ p: 0.7 }}>
                            <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                    </Paper>
                    <Paper
                        sx={{
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
                        }}
                    >
                        <IconButton onClick={handlePrevDifficult} sx={{ p: 0.7 }}>
                            <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                            Difficulty<br />
                            <span style={{ fontSize: 22 }}>{GAME_DIFFICULT[difficult]}</span>
                        </Box>
                        <IconButton onClick={handleNextDifficult} sx={{ p: 0.7 }}>
                            <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                        </IconButton>
                    </Paper>
                    <Button
                        variant="outlined"
                        sx={{
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
                            '&:hover': {
                                bgcolor: "#f7f7fa"
                            }
                        }}
                    >
                        Start Game
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={onGoToMain}
                        sx={{
                            fontFamily: "'Handlee', cursive",
                            border: "2px solid #222",
                            borderRadius: 4,
                            fontSize: 32,
                            width: 260,
                            p: 1.2,
                            bgcolor: "#fff",
                            fontWeight: 600,
                            mt: 2,
                            '&:hover': {
                                bgcolor: "#f7f7fa"
                            }
                        }}
                    >
                        Main Menu
                    </Button>
                </Box>
                <LeaderBoard />
            </Box>
        </Box>
    );
};

export default GameScreen;
