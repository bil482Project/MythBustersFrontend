// src/game/GameScreen.tsx
import React, { useState } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CharacterSelectionPanel from "./CharacterSelection";
import LeaderBoard from "../main/LeaderBoard";
import * as styles from "../styles/GameScreen.styles";

interface GameScreenProps {
  title: string;
  onGoToMain: () => void;
}

const GAME_MODES = ["Speedrun Mode", "Normal Mode", "Hardcore Mode"];
const GAME_DIFFICULT = ["Easy", "Normal", "Hard"];

const GameScreen: React.FC<GameScreenProps> = ({ title, onGoToMain }) => {
  const [modeIndex, setModeIndex]     = useState(0);
  const [difficult, setDifficult]     = useState(0);

  const prevIndex = (i: number, len: number) => (i === 0 ? len - 1 : i - 1);
  const nextIndex = (i: number, len: number) => (i === len - 1 ? 0 : i + 1);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.layout}>
        <CharacterSelectionPanel />

        <Box sx={styles.centerCol}>
          <Typography align="center" sx={styles.heading}>
            {title}
          </Typography>

          <Paper sx={styles.selectorPaper}>
            <IconButton onClick={() => setModeIndex(prev => prevIndex(prev, GAME_MODES.length))} sx={{ p: 0.7 }}>
              <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              Gamemode<br />
              <span style={{ fontSize: 22 }}>{GAME_MODES[modeIndex]}</span>
            </Box>
            <IconButton onClick={() => setModeIndex(prev => nextIndex(prev, GAME_MODES.length))} sx={{ p: 0.7 }}>
              <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Paper>

          <Paper sx={styles.selectorPaper}>
            <IconButton onClick={() => setDifficult(prev => prevIndex(prev, GAME_DIFFICULT.length))} sx={{ p: 0.7 }}>
              <ArrowBackIosNewIcon sx={{ fontSize: 24 }} />
            </IconButton>
            <Box sx={{ flex: 1 }}>
              Difficulty<br />
              <span style={{ fontSize: 22 }}>{GAME_DIFFICULT[difficult]}</span>
            </Box>
            <IconButton onClick={() => setDifficult(prev => nextIndex(prev, GAME_DIFFICULT.length))} sx={{ p: 0.7 }}>
              <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Paper>

          <Button variant="outlined" sx={styles.mainBtn}>
            Start Game
          </Button>

          <Button variant="outlined" onClick={onGoToMain} sx={styles.mainBtn}>
            Main Menu
          </Button>
        </Box>

        <LeaderBoard />
      </Box>
    </Box>
  );
};

export default GameScreen;
