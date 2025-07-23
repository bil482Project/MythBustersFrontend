// src/game/GameScreen.tsx
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CharacterSelectionPanel from "./CharacterSelection";
import LeaderBoard from "../main/LeaderBoard";
import * as styles from "../styles/GameScreen.styles";
import BalloonGameScreen from "../game/BalloonGameScreen"
import CarRaceGameScreen from "../game/CarRaceGameScreen";
import HangmanGameScreen from "./HangmanGameScreen";
import axios from "axios";
import { userInfo } from "node:os";
type User = {
  username: string;
  avatar: string;
  coin: number;
};

interface GameScreenProps {
  title: string;
  onGoToMain: () => void;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

const GAME_MODES = ["Speedrun Mode", "Normal Mode", "Hardcore Mode"];
const GAME_DIFFICULT = ["Easy", "Normal", "Hard"];

const gameScreenMap: { [key: string]: React.ComponentType<any> } = {
    "Balloon Popping": BalloonGameScreen,
    "Car Race": CarRaceGameScreen,
    "Hangman": HangmanGameScreen,
};

const GameScreen: React.FC<GameScreenProps> = ({ title, onGoToMain, user, setUser, point, setPoint}) => {
    const [modeIndex, setModeIndex]     = useState(0);
    const [difficult, setDifficult]     = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [avatar, setAvatar] = useState("🚗");

    const prevIndex = (i: number, len: number) => (i === 0 ? len - 1 : i - 1);
    const nextIndex = (i: number, len: number) => (i === len - 1 ? 0 : i + 1);

    const handleStartGame = () => {
        setIsGameStarted(true);
    };
    const GameComponent = gameScreenMap[title];

    return isGameStarted ?
    (<GameComponent
    mode={GAME_MODES[modeIndex]}
    difficulty={GAME_DIFFICULT[difficult]}
    onGoBack={() => setIsGameStarted(false)}
    onGoToMain = {onGoToMain}
    avatar={avatar}
    point={point}
    setPoint={setPoint}
    user={user}
    />)
    :
    (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.layout}>
          <CharacterSelectionPanel user={user} setUser={setUser} avatar={avatar} setAvatar={setAvatar}/>

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

            <Button variant="outlined" onClick={handleStartGame} sx={styles.mainBtn}>
              Start Game
            </Button>

            <Button variant="outlined" onClick={onGoToMain} sx={styles.mainBtn}>
              Main Menu
            </Button>
          </Box>

          <LeaderBoard />
        </Box>
      </Box>
    </>
  );
};
//buna useEffect coin ekle
export default GameScreen;