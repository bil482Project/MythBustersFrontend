import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Fade } from '@mui/material';

interface HangmanQuestion {
  id: string;
  phrase: string;
  hint: string;
}

interface HangmanGameScreenProps {
  mode: string;
  difficulty: string;
  onGoBack: () => void;
  onGoToMain: () => void;
}

// A large, hardcoded list of questions for the game
const hardcodedQuestions: HangmanQuestion[] = [
    { id: "q1", phrase: "EIGHT GLASSES", hint: "The mandatory daily water intake amount, according to a popular myth." },
    { id: "q2", phrase: "CARROTS", hint: "This vegetable is rumored to improve your vision." },
    { id: "q3", phrase: "SUGAR RUSH", hint: "The supposed effect of sweets on children's energy levels." },
    { id: "q4", phrase: "BODY HEAT", hint: "Myth says you lose most of this through your head." },
    { id: "q5", phrase: "DETOX", hint: "A popular but medically unnecessary process to 'cleanse' your body." },
    { id: "q6", phrase: "ORGANIC FOOD", hint: "This type of food is often mistakenly believed to be inherently more nutritious." },
    { id: "q7", phrase: "MICROWAVES", hint: "This kitchen appliance is falsely accused of zapping nutrients from your meal." },
    { id: "q8", phrase: "COMMON COLD", hint: "You can't catch this just by being out in chilly weather." },
    { id: "q9", phrase: "SPIDERS", hint: "Myth claims you swallow several of these creepy crawlies in your sleep each year." },
    { id: "q10", phrase: "DOGS MOUTH", hint: "This animal's mouth is rumored to be cleaner than a human's, which is untrue." },
    { id: "q11", phrase: "TEN PERCENT", hint: "The mythical percentage of the brain humans supposedly use." },
    { id: "q12", phrase: "AN APPLE A DAY", hint: "This fruity phrase suggests a simple way to avoid medical visits." },
    { id: "q13", phrase: "STARVE A FEVER", hint: "The second part of an old adage about how to treat illnesses." },
    { id: "q14", phrase: "MSG", hint: "This flavor enhancer has a bad, and largely undeserved, reputation." },
    { id: "q15", phrase: "GLUTEN FREE", hint: "A diet essential for celiacs, but not inherently healthier for others." },
    { id: "q16", phrase: "VITAMIN C", hint: "Taking large doses of this vitamin won't cure a common cold." },
    { id: "q17", phrase: "DEODORANT", hint: "This personal hygiene product is falsely linked to causing cancer." },
    { id: "q18", phrase: "CHOCOLATE", hint: "This sweet treat is often blamed for causing acne." },
    { id: "q19", phrase: "FIVE SECOND RULE", hint: "The 'rule' that says dropped food is safe to eat if picked up quickly." },
    { id: "q20", phrase: "SWIMMING", hint: "An activity you're told to wait 30 minutes after eating to do." },
    { id: "q21", phrase: "KNUCKLE CRACKING", hint: "This noisy habit is incorrectly thought to cause arthritis." },
    { id: "q22", phrase: "GUM", hint: "It's a myth that this chewy substance stays in your stomach for seven years." },
    { id: "q23", phrase: "VACCINES", hint: "Falsely linked to causing autism, these are crucial for public health." },
    { id: "q24", phrase: "WET HAIR", hint: "Going outside with this won't make you sick, despite what your grandmother said." },
    { id: "q25", phrase: "CAFFEINE", hint: "This popular stimulant is often accused of stunting growth in children." },
    { id: "q26", phrase: "ALUMINUM", hint: "Cookware made from this metal is falsely believed to cause Alzheimer's disease." },
    { id: "q27", phrase: "NATURAL", hint: "A label on food that doesn't automatically mean it's healthy." },
    { id: "q28", phrase: "TOOTHACHE", hint: "An old wives' tale suggests putting aspirin directly on this." },
    { id: "q29", phrase: "READING IN DIM LIGHT", hint: "This can strain your eyes but won't permanently damage your vision." },
    { id: "q30", phrase: "SHAVING", hint: "This hair removal method does not make hair grow back thicker or darker." },
    { id: "q31", phrase: "FINGERNAILS", hint: "These do not continue to grow after a person dies." },
    { id: "q32", phrase: "BLUE LIGHT", hint: "While it can disrupt sleep, it's not proven to cause permanent eye damage." },
    { id: "q33", phrase: "EGGS", hint: "Once demonized for their cholesterol, they are now considered a healthy source of protein." },
    { id: "q34", phrase: "LEFTOVERS", hint: "It's a myth that you must cool these completely before refrigerating." },
    { id: "q35", phrase: "COLON CLEANSE", hint: "An unnecessary and potentially harmful procedure for most people." },
    { id: "q36", phrase: "JUICE CLEANSE", hint: "A popular 'detox' method that is not supported by scientific evidence." },
    { id: "q37", phrase: "ARTIFICIAL SWEETENERS", hint: "Despite concerns, major health bodies consider them safe in moderation." },
    { id: "q38", phrase: "RED WINE", hint: "Often touted for health benefits, but moderation is key and it's not a magic elixir." },
    { id: "q39", phrase: "STRETCHING", hint: "Doing this before exercise is not proven to prevent injury." },
    { id: "q40", phrase: "ANTIBIOTICS", hint: "These are ineffective against viruses like the common cold or flu." },
    { id: "q41", phrase: "HAND SANITIZER", hint: "It's not more effective than washing hands with soap and water." },
    { id: "q42", phrase: "VEGAN DIET", hint: "While it can be healthy, it's not automatically healthier than any other balanced diet." },
    { id: "q43", phrase: "GMO", hint: "Genetically modified organisms that are widely considered safe to eat." },
    { id: "q44", phrase: "ACIDIC FOODS", hint: "Myth states these foods disrupt the body's pH balance, but the body regulates its own pH." },
    { id: "q45", phrase: "FREQUENT MEALS", hint: "Eating these is claimed to boost metabolism, but evidence is weak." },
    { id: "q46", phrase: "DAIRY", hint: "Often blamed for causing mucus production, but this is not supported by research." },
    { id: "q47", phrase: "RAW FOOD DIET", hint: "The belief that cooking food destroys all its nutrients is an exaggeration." },
    { id: "q48", phrase: "CELLPHONES", hint: "There is no solid evidence that these devices cause brain cancer." },
    { id: "q49", phrase: "WATER", hint: "Drinking this during a meal will not dilute your digestive juices." },
    { id: "q50", phrase: "MICROWAVE POPCORN", hint: "The lung disease 'popcorn lung' was linked to a chemical no longer used in this product." }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const HangmanGameScreen: React.FC<HangmanGameScreenProps> = ({mode, difficulty, onGoBack, onGoToMain}) => {
  const [questions, setQuestions] = useState<HangmanQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(0);
  const [gameStatus, setGameStatus] = useState<"playing" | "paused" | "gameOver" | "won">("playing");
  const [gameOverReason, setGameOverReason] = useState("");
  const timerRef = useRef<number | null>(null);
  const [guessFeedback, setGuessFeedback] = useState<'correct' | 'incorrect' | 'idle'>('idle');

  const getGameSettings = useCallback(() => {
    let initialLives = 3;
    let maxWrongGuesses = 6;

    if (mode === "Speedrun Mode") maxWrongGuesses = 4;
    if (mode === "Hardcore Mode") maxWrongGuesses = 3;

    switch (difficulty) {
      case "Easy":
        initialLives = 5;
        maxWrongGuesses = 8;
        break;
      case "Hard":
        initialLives = 1;
        maxWrongGuesses = 4;
        break;
      default:
        initialLives = 3;
        maxWrongGuesses = 6;
        break;
    }
    return { initialLives, maxWrongGuesses };
  }, [mode, difficulty]);

  const getQuestionCount = useCallback(() => {
    switch (difficulty) {
      case "Easy": return 3;
      case "Normal": return 5;
      case "Hard": return 7;
      default: return 5;
    }
  }, [difficulty]);

  const initializeGame = useCallback(() => {
    const settings = getGameSettings();
    setLives(settings.initialLives);

    const numQuestions = getQuestionCount();
    const shuffledQuestions = [...hardcodedQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions.slice(0, numQuestions));
    setCurrentPhrase(shuffledQuestions[0]?.phrase.toUpperCase() || "");
    setGuessedLetters(new Set());
    setWrongGuesses(0);
  }, [getGameSettings, getQuestionCount]);

  const showFeedback = (status: 'correct' | 'incorrect') => {
    setGuessFeedback(status);
    setTimeout(() => {
      setGuessFeedback('idle');
    }, 750);
  };

  const handleWin = useCallback(() => {
      showFeedback('correct');
      setScore(prevScore => prevScore + 25); // Bonus for completing word
      setTimeout(() => {
          const nextQuestionIndex = currentQuestionIndex + 1;
          if (nextQuestionIndex >= questions.length) {
              setGameStatus("won");
          } else {
              setCurrentQuestionIndex(nextQuestionIndex);
              setCurrentPhrase(questions[nextQuestionIndex]?.phrase.toUpperCase() || "");
              setGuessedLetters(new Set());
              setWrongGuesses(0);
          }
      }, 1500);
  }, [currentQuestionIndex, questions]);

  useEffect(() => {
    if (gameStatus === "playing") {
      initializeGame();
      if (mode === "Speedrun Mode") {
        timerRef.current = window.setInterval(() => setTimer(t => t + 1), 1000);
      }
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [gameStatus, mode, initializeGame]);


  useEffect(() => {
      if (!currentPhrase || gameStatus !== 'playing') return;

      const isComplete = currentPhrase.split("").every(char =>
          char === " " || guessedLetters.has(char)
      );

      if (isComplete) {
          handleWin();
      }
  }, [guessedLetters, currentPhrase, gameStatus, handleWin]);

  const handleLetterGuess = (letter: string) => {
    if (gameStatus !== 'playing' || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set(guessedLetters);
    newGuessedLetters.add(letter);
    setGuessedLetters(newGuessedLetters);

    if (currentPhrase.includes(letter)) {
      setScore(prevScore => prevScore + 5);
    } else {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      const settings = getGameSettings();
      if (newWrongGuesses >= settings.maxWrongGuesses) {
        const newLives = lives - 1;
        setLives(newLives);

        showFeedback('incorrect');

        if (newLives <= 0) {
          setGameOverReason("No more lives!");
          setGameStatus('gameOver');
        } else {
          setTimeout(() => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            if (nextQuestionIndex >= questions.length) {
              setGameOverReason("You ran out of questions after losing a life!");
              setGameStatus('gameOver');
            } else {
              setCurrentQuestionIndex(nextQuestionIndex);
              setCurrentPhrase(questions[nextQuestionIndex]?.phrase.toUpperCase() || "");
              setGuessedLetters(new Set());
              setWrongGuesses(0);
            }
          }, 1500);
        }
      }
    }
  };

  const displayPhrase = () => {
    return currentPhrase.split("").map((char) => {
      if (char === " ") return " ";
      return guessedLetters.has(char) ? char : "_";
    }).join(" ");
  };

  const handleUseHint = () => {
    const unguessedChars = currentPhrase
        .split('')
        .filter(char => char !== ' ' && !guessedLetters.has(char));

    if (unguessedChars.length === 0) return;

    const randomHintLetter = unguessedChars[Math.floor(Math.random() * unguessedChars.length)];

    setGuessedLetters(new Set(guessedLetters).add(randomHintLetter));
    setScore(prevScore => Math.max(0, prevScore - 10));
  };

  const handleRestartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setTimer(0);
    setGameOverReason("");
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  const renderHangman = () => {
    const { maxWrongGuesses } = getGameSettings();

    const parts = [
        <circle key="head" cx="100" cy="50" r="20" stroke="black" strokeWidth="4" fill="none" />, // Head
        <line key="body" x1="100" y1="70" x2="100" y2="130" stroke="black" strokeWidth="4" />,   // Body
        <line key="left-arm" x1="100" y1="90" x2="70" y2="110" stroke="black" strokeWidth="4" />, // Left Arm
        <line key="right-arm" x1="100" y1="90" x2="130" y2="110" stroke="black" strokeWidth="4" />, // Right Arm
        <line key="left-leg" x1="100" y1="130" x2="80" y2="170" stroke="black" strokeWidth="4" />, // Left Leg
        <line key="right-leg" x1="100" y1="130" x2="120" y2="170" stroke="black" strokeWidth="4" />, // Right Leg
    ];

    if (maxWrongGuesses > 6) {
        parts.push(<line key="left-foot" x1="80" y1="170" x2="70" y2="170" stroke="black" strokeWidth="4" />); // Left Foot
        parts.push(<line key="right-foot" x1="120" y1="170" x2="130" y2="170" stroke="black" strokeWidth="4" />); // Right Foot
    }

    const partsToShow = Math.ceil((wrongGuesses / maxWrongGuesses) * (maxWrongGuesses > 6 ? 8 : 6));

    return (
        <Box sx={{ width: 200, height: 250, position: 'relative' }}>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
                Wrong: {wrongGuesses}/{maxWrongGuesses}
            </Typography>
            <svg viewBox="0 0 200 250" style={{ width: '100%', height: '100%' }}>
                {/* Gallows */}
                <line x1="20" y1="230" x2="180" y2="230" stroke="black" strokeWidth="4" />
                <line x1="50" y1="230" x2="50" y2="20" stroke="black" strokeWidth="4" />
                <line x1="50" y1="20" x2="100" y2="20" stroke="black" strokeWidth="4" />
                <line x1="100" y1="20" x2="100" y2="30" stroke="black" strokeWidth="4" />

                {/* Conditionally rendered parts */}
                {parts.slice(0, partsToShow)}
            </svg>
        </Box>
    );
  };

  const renderGameContent = () => {
    if (gameStatus === "won" || gameStatus === "gameOver") {
      return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "3px solid #184e77", bgcolor: "#fff", textAlign: "center", fontFamily: "'Handlee', cursive", fontSize: 24, zIndex: 10 }}>
          <Typography variant="h4" sx={{ mb: 2, color: gameStatus === "won" ? "#4caf50" : "#f44336" }}>
            {gameStatus === "won" ? "🎉 Congratulations! 🎉" : "💀 Game Over 💀"}
          </Typography>

          {gameStatus === "gameOver" && (<Typography variant="h6" sx={{ mb: 2, color: "#666" }}>{gameOverReason}</Typography>)}

          <Typography variant="h5" sx={{ mb: 2 }}>Final Score: {score}</Typography>

          {mode === "Speedrun Mode" && (<Typography variant="h6" sx={{ mb: 2 }}>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Typography>)}

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 3 }}>
            <Button variant="contained" onClick={handleRestartGame} sx={{ bgcolor: "#28a745", "&:hover": { bgcolor: "#218838" } }}>Play Again</Button>
            <Button variant="outlined" onClick={onGoBack} sx={{ borderColor: "#6c757d", color: "#6c757d" }}>Back to Selection</Button>
            <Button variant="outlined" onClick={onGoToMain} sx={{ borderColor: "#007bff", color: "#007bff" }}>Main Menu</Button>
          </Box>
        </Paper>
      );
    }

    if (gameStatus === "paused") {
      return (
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, border: "3px solid #184e77", bgcolor: "#fff", textAlign: "center", fontFamily: "'Handlee', cursive", fontSize: 24 }}>
          <Typography variant="h4" sx={{ mb: 3 }}>Game Paused</Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="contained" onClick={() => setGameStatus("playing")} sx={{ bgcolor: "#28a745", "&:hover": { bgcolor: "#218838" } }}>Resume</Button>
            <Button variant="outlined" onClick={onGoBack}>Back to Selection</Button>
          </Box>
        </Paper>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return null;

    const isHintPossible = currentPhrase.split('').some(char => char !== ' ' && !guessedLetters.has(char));

    const feedbackBoxStyles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 100,
        height: 100,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        color: 'white',
        fontSize: '4rem',
        fontWeight: 'bold'
    };

    return (
      <>
        <Box sx={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 5 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="h6" sx={{ color: "#184e77", fontFamily: "'Handlee', cursive" }}>Score: {score}</Typography>
            <Typography variant="h6" sx={{ color: "#184e77", fontFamily: "'Handlee', cursive" }}>Lives: {lives}</Typography>
            {mode === "Speedrun Mode" && (<Typography variant="h6" sx={{ color: "#184e77", fontFamily: "'Handlee', cursive" }}>Time: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Typography>)}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => setGameStatus("paused")}>Pause</Button>
            <Button variant="outlined" size="small" onClick={onGoBack}>Back</Button>
          </Box>
        </Box>

        <Box sx={{ position: "absolute", top: 80, left: 20, right: 20, zIndex: 5 }}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: "'Handlee', cursive" }}>Question {currentQuestionIndex + 1} of {questions.length}</Typography>
          <LinearProgress variant="determinate" value={((currentQuestionIndex + 1) / questions.length) * 100} sx={{ height: 8, borderRadius: 4 }} />
        </Box>

        <Fade in={guessFeedback === 'correct'}>
          <Box sx={{ ...feedbackBoxStyles, bgcolor: 'rgba(76, 175, 80, 0.8)' }}>
            ✓
          </Box>
        </Fade>
        <Fade in={guessFeedback === 'incorrect'}>
          <Box sx={{ ...feedbackBoxStyles, bgcolor: 'rgba(244, 67, 54, 0.8)' }}>
            ✗
          </Box>
        </Fade>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%', maxWidth: '800px', zIndex: 2 }}>
          {renderHangman()}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ mb: 2, fontFamily: "'Courier New', monospace", letterSpacing: 4, color: "#184e77" }}>
              {displayPhrase()}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: "#007bff", fontStyle: "italic", fontFamily: "'Handlee', cursive" }}>
              Hint: {currentQuestion.hint}
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))", gap: 1, width: '100%', maxWidth: 650 }}>
            {ALPHABET.map(letter => (
              <Button key={letter} variant={guessedLetters.has(letter) ? "contained" : "outlined"} disabled={guessedLetters.has(letter)} onClick={() => handleLetterGuess(letter)} sx={{ minWidth: 40, height: 40, fontFamily: "'Courier New', monospace", bgcolor: guessedLetters.has(letter) ? (currentPhrase.includes(letter) ? "#4caf50" : "#f44336") : "transparent", "&:hover": { bgcolor: guessedLetters.has(letter) ? (currentPhrase.includes(letter) ? "#4caf50" : "#f44336") : "#e3f2fd" }}}>
                {letter}
              </Button>
            ))}
          </Box>

          <Button variant="outlined" onClick={handleUseHint} disabled={!isHintPossible} sx={{ color: "#ffc107", borderColor: "#ffc107", "&:hover": { bgcolor: "#fff3cd" }, "&:disabled": { color: 'grey', borderColor: 'lightgrey' } }}>
            Reveal Letter (-10 points)
          </Button>
        </Paper>
      </>
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", width: "100%", height: "98vh", boxSizing: "border-box", borderRadius: 5, p: 3, border: "3px solid #184e77", backgroundImage: `url("data:image/svg+xml;utf8,<svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' fill='none'/><path d='M0 0L40 40ZM40 0L0 40Z' stroke='%233385b6' stroke-width='0.5'/></svg>")`, bgcolor: "#eaf4fb", position: "relative" }}>
      {renderGameContent()}
    </Box>
  );
};

export default HangmanGameScreen;