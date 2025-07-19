import React, { useState, useEffect, useCallback, useRef } from "react";
import { Box, Paper, Typography, Button, IconButton } from "@mui/material";
import { keyframes } from "@emotion/react";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from '@mui/icons-material/Favorite';
import TimerIcon from '@mui/icons-material/Timer';

const popAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(0); opacity: 0; }
`;

interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  options: string[];
}

interface Balloon {
  id: string;
  x: number;
  y: number;
  isPopped: boolean;
  color: string;
}

interface BalloonGameScreenProps {
  mode: string;
  difficulty: string;
  onGoBack: () => void;
  onGoToMain: () => void;
}

const hardcodedQuestions: Question[] = [
    {
        id: "q1",
        text: "Myth or Fact: You must drink at least 8 glasses of water a day to stay healthy.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q2",
        text: "Myth or Fact: Humans only use 10% of their brains.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q3",
        text: "Myth or Fact: Cracking your knuckles will cause you to develop arthritis.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q4",
        text: "Myth or Fact: Eating sugary foods is the primary cause of hyperactivity in children.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q5",
        text: "Myth or Fact: Going out in the cold with wet hair will make you catch a cold.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q6",
        text: "Myth or Fact: You lose the majority of your body heat through your head.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
    {
        id: "q7",
        text: "Myth or Fact: Your body needs regular 'detox' diets or cleanses to remove toxins.",
        correctAnswer: "False",
        options: ["True", "False"],
    },
];

const BALLOON_COLORS = ["#ff6347", "#6a5acd", "#3cb371", "#ffd700", "#1e90ff"];
const BALLOON_BASE_SPEED = 1;
const CONTROL_BAR_HEIGHT_PERCENT = 10;
const RAZOR_HEIGHT_PERCENT = 8;
const BALLOON_SIZE = 50;

const BalloonGameScreen: React.FC<BalloonGameScreenProps> = ({mode, difficulty, onGoBack, onGoToMain}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "paused" | "gameOver" | "won">("playing");
  const [gameOverReason, setGameOverReason] = useState("");
  const [selectedAnswerFeedback, setSelectedAnswerFeedback] = useState<string | null>(null);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getGameSettings = useCallback(() => {
    let speedMultiplier = 1;
    let initialLives = 3;

    if (mode === "Speedrun Mode") speedMultiplier = 1.25;
    if (mode === "Hardcore Mode") speedMultiplier = 1.5;

    switch (difficulty) {
      case "Easy": initialLives = 5; speedMultiplier *= 0.8; break;
      case "Hard": initialLives = 1; speedMultiplier *= 1.2; break;
      default: initialLives = 3; break;
    }
    return { speed: BALLOON_BASE_SPEED * speedMultiplier, initialLives };
  }, [mode, difficulty]);

  const getBalloonAmount = useCallback(() => {
    switch (difficulty) {
      case "Easy": return 3;
      case "Normal": return 4;
      case "Hard": return 5;
      default: return 4;
    }
  }, [difficulty]);

  const generateNewBalloon = useCallback(() => {
    if (!gameAreaRef.current) return null;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    return {
      id: `balloon-${Date.now()}-${Math.random()}`,
      x: Math.random() * (gameAreaWidth - BALLOON_SIZE),
      y: -BALLOON_SIZE,
      isPopped: false,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
    };
  }, []);

  const initializeGame = useCallback(() => {
    const settings = getGameSettings();
    setLives(settings.initialLives);
    
    const numQuestions = getBalloonAmount();
    setQuestions(hardcodedQuestions.slice(0, numQuestions));

    const initialBalloons: Balloon[] = [];
    for (let i = 0; i < numQuestions; i++) {
      const newBalloon = generateNewBalloon();
      if (newBalloon) initialBalloons.push(newBalloon);
    }
    setBalloons(initialBalloons);
  }, [getGameSettings, getBalloonAmount, generateNewBalloon]);

  useEffect(() => {
    if (gameStatus === "playing") {
      initializeGame();
      if (mode === "Speedrun Mode") {
        timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
      }
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameStatus, mode, initializeGame]);

  // Game Loop for balloon movement
  useEffect(() => {
    if (gameStatus !== "playing") return;

    const balloonSpeed = getGameSettings().speed;
    const gameAreaHeight = gameAreaRef.current?.offsetHeight || 0;
    const razorYStart = gameAreaHeight * (1 - (RAZOR_HEIGHT_PERCENT + CONTROL_BAR_HEIGHT_PERCENT) / 100);

    const gameInterval = setInterval(() => {
      setBalloons(prevBalloons =>
        prevBalloons.map(balloon => {
          if (balloon.isPopped) return balloon;
          const newY = balloon.y + balloonSpeed;
          // Hitting the razor ONLY pops the balloon. It does NOT cost a life.
          if ((newY + BALLOON_SIZE) >= razorYStart) {
            return { ...balloon, isPopped: true, y: newY };
          }
          return { ...balloon, y: newY };
        })
      );
    }, 1000 / 60);

    return () => clearInterval(gameInterval);
  }, [gameStatus, getGameSettings]);


  // Check for game over if all balloons are popped before questions are finished
  useEffect(() => {
      if (gameStatus === 'playing' && balloons.length > 0 && balloons.every(b => b.isPopped)) {
          if (currentQuestionIndex < questions.length) {
              setGameOverReason("Balloons got away!");
              setGameStatus('gameOver');
          }
      }
  }, [balloons, gameStatus, currentQuestionIndex, questions.length]);


  const handleAnswer = (selectedAnswer: string) => {
    if (gameStatus !== 'playing') return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setSelectedAnswerFeedback(selectedAnswer);

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
      setBalloons(prevBalloons => {
        const unpoppedBalloons = prevBalloons.filter(b => !b.isPopped);
        if (unpoppedBalloons.length > 0) {
          const highestBalloon = unpoppedBalloons.reduce((max, b) => b.y > max.y ? b : max);
          return prevBalloons.map(b => b.id === highestBalloon.id ? { ...b, isPopped: true } : b);
        }
        return prevBalloons;
      });
    } else {
      // Incorrect answers ALWAYS cost a life, regardless of mode.
      setLives(prevLives => {
          const newLives = prevLives - 1;
          if (newLives <= 0) {
              setGameOverReason("You ran out of lives!");
              setGameStatus("gameOver");
              return 0;
          }
          return newLives;
      });
    }

    setTimeout(() => {
      setSelectedAnswerFeedback(null);
      // Check for win condition
      if (currentQuestionIndex >= questions.length - 1) {
          setGameStatus("won");
      } else {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    }, 300);
  };

  const handleRestartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimer(0);
    setGameOverReason("");
    setBalloons([]);
    setGameStatus("playing");
  };

  const renderGameContent = () => {
    if (gameStatus === "won" || gameStatus === "gameOver") {
        return (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "3px solid #184e77", bgcolor: "#fff", textAlign: "center", fontFamily: "'Handlee', cursive", fontSize: 24, zIndex: 10 }}>
                <Typography variant="h4" sx={{ fontFamily: "'Handlee', cursive", mb: 2 }}>
                    {gameStatus === "won" ? "Congratulations!" : "Game Over"}
                </Typography>
                <Typography sx={{ mb: 1 }}>Your Score: {score}</Typography>
                {mode === "Speedrun Mode" && <Typography sx={{ mb: 1 }}>Your Time: {timer}s</Typography>}
                <Typography sx={{ mb: 2, color: 'red' }}>
                    {gameStatus === "gameOver" ? gameOverReason : "You've busted all the myths!"}
                </Typography>
                <Button variant="outlined" onClick={handleRestartGame} sx={{ fontFamily: "'Handlee', cursive", mt: 2, mr: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Play Again
                </Button>
                <Button variant="outlined" onClick={onGoBack} sx={{ fontFamily: "'Handlee', cursive", mt: 2, mr: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Game Menu
                </Button>
                <Button variant="outlined" onClick={onGoToMain} sx={{ fontFamily: "'Handlee', cursive", mt: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Main Menu
                </Button>
            </Paper>
        );
    }
    
    if (gameStatus === "paused") {
        return (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "3px solid #184e77", bgcolor: "#fff", textAlign: "center", fontFamily: "'Handlee', cursive", fontSize: 24, zIndex: 10 }}>
                <Typography variant="h4" sx={{ fontFamily: "'Handlee', cursive", mb: 2 }}>
                    Game Paused
                </Typography>
                <Typography sx={{ mb: 1 }}>Current Score: {score}</Typography>
                <Button variant="outlined" onClick={() => setGameStatus("playing")} sx={{ fontFamily: "'Handlee', cursive", mt: 2, mr: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Resume
                </Button>
                <Button variant="outlined" onClick={handleRestartGame} sx={{ fontFamily: "'Handlee', cursive", mt: 2, mr: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Restart
                </Button>
                <Button variant="outlined" onClick={onGoToMain} sx={{ fontFamily: "'Handlee', cursive", mt: 2, border: "2px solid #222", borderRadius: 4, fontSize: 20, bgcolor: "#fff", '&:hover': { bgcolor: "#f7f7fa" }}}>
                    Main Menu
                </Button>
            </Paper>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    return (
      <>
        {/* Control Bar */}
        <Paper elevation={0} sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: `${CONTROL_BAR_HEIGHT_PERCENT}%`, border: "3px solid #184e77", borderRadius: "5px", bgcolor: "#eaf4fb", display: "flex", alignItems: "center", justifyContent: "space-between", px: 3, boxSizing: "border-box", zIndex: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                <Paper elevation={0} sx={{ px: 2, py: 1, border: "3px solid #333", borderRadius: 4, bgcolor: "#fff" }}>
                    <Typography sx={{ fontFamily: "'Handlee', cursive", fontSize: 20, color: "#333" }}>
                        Score: {score}
                    </Typography>
                </Paper>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {Array.from({ length: lives }).map((_, i) => <FavoriteIcon key={i} sx={{ color: 'red', fontSize: 30 }} />)}
                </Box>
                {mode === 'Speedrun Mode' && (
                    <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1, border: "3px solid #333", borderRadius: 4, bgcolor: "#fff" }}>
                        <TimerIcon sx={{ fontSize: 24 }} />
                        <Typography sx={{ fontFamily: "'Handlee', cursive", fontSize: 20, color: "#333" }}>
                            {timer}s
                        </Typography>
                    </Paper>
                )}
            </Box>
            <Typography sx={{ fontFamily: "'Handlee', cursive", fontSize: 28, fontWeight: 700, color: "#184e77", userSelect: "none", textAlign: "center", flexGrow: 1 }}>
                MythPoppers
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton aria-label="pause" sx={{ width: 40, height: 40, borderRadius: "5px", border: "2px solid #333", bgcolor: "#fff", "&:hover": { bgcolor: "#eee" }}} onClick={() => setGameStatus("paused")}>
                    <PauseIcon sx={{ fontSize: 28, color: "#333" }} />
                </IconButton>
                <Box sx={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#fff" }}>
                    <PersonOutlineIcon sx={{ fontSize: 28, color: "#333" }} />
                </Box>
            </Box>
        </Paper>

        {/* Razors */}
        <Box sx={{ position: "absolute", top: `${CONTROL_BAR_HEIGHT_PERCENT}%`, left: 0, width: "100%", height: `${RAZOR_HEIGHT_PERCENT}%`, display: "flex", justifyContent: "space-around", alignItems: "flex-end", p: 1, boxSizing: "border-box", zIndex: 3, overflow: "hidden" }}>
          {[...Array(Math.floor(window.innerWidth / 70))].map((_, i) => (
            <svg key={i} width="60" height="45" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: -5 }}>
              <rect x="0" y="0" width="60" height="30" fill="#999" stroke="#555" strokeWidth="2"/>
              <polygon points="0,30 5,45 10,30 15,45 20,30 25,45 30,30 35,45 40,30 45,45 50,30 55,45 60,30" fill="#999" stroke="#555" strokeWidth="2"/>
            </svg>
          ))}
        </Box>

        {/* Balloons */}
        {balloons.map(balloon => (
          <Box key={balloon.id} sx={{ position: "absolute", left: balloon.x, bottom: balloon.y, width: BALLOON_SIZE, height: BALLOON_SIZE + 20, opacity: balloon.isPopped ? 0 : 1, animation: balloon.isPopped ? `${popAnimation} 0.3s forwards` : 'none', transition: 'none', display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", zIndex: 2 }}>
            <Box sx={{ width: BALLOON_SIZE, height: BALLOON_SIZE, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", bgcolor: balloon.color, border: `2px solid ${balloon.color}`, boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.2)`, position: "relative" }}>
              <Box sx={{ position: "absolute", top: "10%", left: "20%", width: "30%", height: "30%", borderRadius: "50%", bgcolor: "rgba(255,255,255,0.5)", filter: "blur(5px)" }} />
            </Box>
            <Box sx={{ width: 2, height: 20, bgcolor: "#888", position: "relative", top: -2 }} />
          </Box>
        ))}

        {/* Avatar and Platform */}
        <Box sx={{ position: "absolute", bottom: "15%", left: "50%", transform: "translateX(-50%)", width: 200, height: 60, bgcolor: "#a0522d", borderRadius: "30px 30px 0 0", border: "3px solid #8b4513", zIndex: 4, display: "flex", justifyContent: "center", alignItems: "flex-start", boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}>
          <svg width="60" height="100" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: -90, zIndex: 5 }}>
            <circle cx="50" cy="20" r="15" stroke="#000" strokeWidth="3" fill="#fff"/>
            <line x1="50" y1="35" x2="50" y2="80" stroke="#000" strokeWidth="3"/>
            <line x1="50" y1="45" x2="30" y2="65" stroke="#000" strokeWidth="3"/>
            <line x1="50" y1="45" x2="70" y2="65" stroke="#000" strokeWidth="3"/>
            <line x1="50" y1="80" x2="40" y2="120" stroke="#000" strokeWidth="3"/>
            <line x1="50" y1="80" x2="60" y2="120" stroke="#000" strokeWidth="3"/>
          </svg>
        </Box>

        {/* Sea/Water */}
        <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "20%", bgcolor: "#ADD8E6", borderTop: "3px solid #6495ED", boxSizing: "border-box", zIndex: 1, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,174.16-41.07,65.86-11.72,109.86-6.5,155.18,5.64,72.13,18.5,112.13,31.82,163.78,34.87,56.35,3.34,101.43-3.26,156.68-18.44,46.37-14.08,85.1-27.42,113.15-37.44L1200,0V120H0V47.21C321.39,56.44,321.39,56.44,321.39,56.44Z' fill='%236495ED'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: "repeat-x", backgroundSize: "1200px 120px", backgroundPosition: "bottom" }} />

        {/* Question and Answer Section */}
        <Box sx={{ position: "absolute", bottom: "2%", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, zIndex: 6, width: "70%", maxWidth: 450 }}>
          <Paper elevation={0} sx={{ px: 1.5, py: 1, border: "3px solid #333", borderRadius: 4, bgcolor: "#fff", fontFamily: "'Handlee', cursive", fontSize: 14, textAlign: "center", width: "100%", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
            Question {currentQuestionIndex + 1}/{questions.length}
            <br />
            {currentQuestion.text}
          </Paper>
          <Box display="flex" flexWrap="wrap" justifyContent="center" gap={0.5}>
            {currentQuestion.options.map(option => (
              <Button key={option} variant="outlined" onClick={() => handleAnswer(option)} sx={{ fontFamily: "'Handlee', cursive", border: `2px solid ${ selectedAnswerFeedback === option ? (option === currentQuestion.correctAnswer ? "green" : "red") : "#222" }`, borderRadius: 4, fontSize: 12, p: 0.6, bgcolor: selectedAnswerFeedback === option ? (option === currentQuestion.correctAnswer ? "#e8f5e9" : "#ffebee") : "#fff", fontWeight: 600, '&:hover': { bgcolor: selectedAnswerFeedback === option ? (option === currentQuestion.correctAnswer ? "#dcedc8" : "#ffcdd2") : "#f7f7fa", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }, width: "calc(50% - 2.5px)", minWidth: 80, transition: "background .2s, box-shadow .2s, border-color .2s" }}>
                {option}
              </Button>
            ))}
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box ref={gameAreaRef} sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", width: "100%", height: "98vh", boxSizing: "border-box", borderRadius: 5, p: 3, border: "3px solid #184e77", backgroundImage: `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`, bgcolor: "#eaf4fb", position: "relative" }}>
      {renderGameContent()}
    </Box>
  );
};

export default BalloonGameScreen;