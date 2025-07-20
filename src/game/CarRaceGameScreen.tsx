import React, { useState, useEffect, useRef } from 'react';
import './CarRaceGameScreen.css';

type Question = {
  first_choice: string;
  second_choice: string;
  third_choice: string;
  fourth_choice?: string;
};

const CELL_COUNT = 15;
const FINISH_LINE = CELL_COUNT - 1;
const optionLabels = ['a)', 'b)', 'c)', 'd)'];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const questions: Question[] = [
  {
    first_choice: "The common cold is caused by viruses, and antibiotics are effective only against bacteria. Antibiotics do not help with the cold, and unnecessary use can lead to antibiotic resistance.",
    second_choice: "The common cold can be treated with antibiotics.",
    third_choice: "Exercising on an empty stomach burns more fat.",
    fourth_choice: "It is necessary to drink 8 glasses of water a day."
  },
  {
    first_choice: "The common cold is caused by viruses, and antibiotics are effective only against bacteria. Antibiotics do not help with the cold, and unnecessary use can lead to antibiotic resistance.",
    second_choice: "Coffee causes dehydration.",
    third_choice: "Diabetes is caused solely by eating too much sugar.",
    fourth_choice: "Vaccines cause autism."
  },
  {
    first_choice: "The common cold is caused by viruses, and antibiotics are effective only against bacteria. Antibiotics do not help with the cold, and unnecessary use can lead to antibiotic resistance.",
    second_choice: "Microwave ovens destroy the nutritional value of food.",
    third_choice: "The flu shot causes the flu.",
    fourth_choice: "The more you sweat, the more fat you burn."
  },
  {
    first_choice: "The common cold is caused by viruses, and antibiotics are effective only against bacteria. Antibiotics do not help with the cold, and unnecessary use can lead to antibiotic resistance.",
    second_choice: "Eggs raise cholesterol and are harmful.",
    third_choice: "Sunscreen is only necessary in the summer and on sunny days.",
    fourth_choice: "People with darker skin do not need sunscreen."
  },
  {
    first_choice: "The common cold is caused by viruses, and antibiotics are effective only against bacteria. Antibiotics do not help with the cold, and unnecessary use can lead to antibiotic resistance.",
    second_choice: "Detox drinks cleanse the body of toxins.",
    third_choice: "Individuals with gluten sensitivity must avoid gluten.",
    fourth_choice: "To lose weight, you must completely avoid carbohydrates."
  },
];

const allCorrects = questions.map(q => q.first_choice);
const allWrongs = questions.flatMap(q =>
  [q.second_choice, q.third_choice, q.fourth_choice].filter(Boolean) as string[]
);

function difficultyScoreMultiplier(difficulty: string): number {
  switch (difficulty) {
    case 'Easy': return 1;
    case 'Normal': return 2;
    case 'Hard': return 3;
    default: return 1;
  }
}

function modeInterval(mode: string): number {
  switch (mode) {
    case 'Hardcore Mode': return 500;
    case 'Speedrun Mode': return 1000;
    case 'Normal Mode': return 2000;
    default: return 500;
  }
}

function modeScoreMultiplier(mode: string): number {
  switch (mode) {
    case 'Hardcore Mode': return 3;
    case 'Speedrun Mode': return 2;
    case 'Normal Mode': return 1;
    default: return 1;
  }
}

function computerCorrectChance(difficulty: string): number {
  switch (difficulty) {
    case 'Easy': return 0.5;
    case 'Normal': return 0.85;
    case 'Hard': return 0.9;
    default: return 0.5;
  }
}

function generateQuestionSet(): { correct: string; options: string[] }[] {
  return allCorrects.map(correct => {
    const wrongs = shuffleArray(
      allWrongs.filter(w => w !== correct)
    ).slice(0, 3);
    const options = shuffleArray([correct, ...wrongs]);
    return { correct, options };
  });
}

type CarRaceGameScreenProps = {
  mode: string;
  difficulty: string;
  onGoBack: () => void;
  onGoToMain: () => void;
};

const Lane: React.FC<{ pos: number; label: string; icon: string }> = ({ pos, label, icon }) => (
  <div className="lane">
    {Array.from({ length: CELL_COUNT }, (_, i) => (
      <div key={i} className={`cell${i === pos ? ' active' : ''}`}>
        {i === pos && <span className="car">{icon}</span>}
        {i === 0 && <span className="lane-label">{label}</span>}
      </div>
    ))}
    <div className="finish-line" />
  </div>
);

const CarRaceGameScreen: React.FC<CarRaceGameScreenProps> = ({
  mode,
  difficulty,
  onGoBack,
  onGoToMain
}) => {
  const [playerPos, setPlayerPos] = useState(0);
  const [computerPos, setComputerPos] = useState(0);
  const [playerQIdx, setPlayerQIdx] = useState(0);
  const [computerQIdx, setComputerQIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'You' | 'Computer' | ''>('');
  const [score, setScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [questionSet] = useState(() => generateQuestionSet());
  const scoreMultiplier = difficultyScoreMultiplier(difficulty);
  const compScoreMultiplier = modeScoreMultiplier(mode);

  const computerTimer = useRef<NodeJS.Timeout | null>(null);

  // Bilgisayarın bağımsız cevaplaması
  useEffect(() => {
    if (gameOver) return;
    computerTimer.current = setInterval(() => {
      const { correct, options } = questionSet[computerQIdx];
      const chance = computerCorrectChance(difficulty);
      let compAnswer: string;
      if (Math.random() < chance) {
        compAnswer = correct;
      } else {
        const wrongs = options.filter(opt => opt !== correct);
        compAnswer = wrongs[Math.floor(Math.random() * wrongs.length)];
      }
      const isCorrect = compAnswer === correct;

      setComputerPos(prev => {
        const next = prev + (isCorrect ? 1 : 0);
        if (isCorrect) {
          setComputerScore(cs => cs + 10 * compScoreMultiplier);
        }
        if (next >= FINISH_LINE) {
          setGameOver(true);
          setWinner('Computer');
        }
        return next;
      });

      // Bilgisayar bir sonraki soruya geçer
      setComputerQIdx(prev => (prev + 1) % questionSet.length);
    }, modeInterval(mode));

    return () => {
      if (computerTimer.current) clearInterval(computerTimer.current);
    };
  }, [gameOver, mode, difficulty, compScoreMultiplier, questionSet]);

  // Oyuncunun bağımsız cevaplaması
  const handleAnswer = (selected: string) => {
    if (gameOver) return;
    const { correct } = questionSet[playerQIdx];
    const isCorrect = selected === correct;

    setPlayerPos(prev => {
      const next = prev + (isCorrect ? 1 : 0);
      if (isCorrect) {
        const diff = Math.max(0, next - computerPos);
        setScore(s => s + 10 * scoreMultiplier + diff * 2);
      }
      if (next >= FINISH_LINE) {
        setGameOver(true);
        setWinner('You');
      }
      return next;
    });

    // Oyuncu bir sonraki soruya geçer
    setPlayerQIdx(prev => (prev + 1) % questionSet.length);
  };

  const restart = () => {
    setPlayerPos(0);
    setComputerPos(0);
    setPlayerQIdx(0);
    setComputerQIdx(0);
    setGameOver(false);
    setWinner('');
    setScore(0);
    setComputerScore(0);
  };

  return (
    <div className="race-container">
      <h2 className="title">Quiz Race</h2>
      <div className="controls">
        <button className ="control-button" onClick={onGoBack}>Game Menu</button>
        <button className ="control-button" onClick={onGoToMain}>Main Menu</button>
        <button className ="control-button" onClick={restart}>Restart</button>
      </div>
      <div className="track">
        <Lane pos={playerPos} icon="🚗" label="You" />
        <Lane pos={computerPos} icon="💻" label="Computer" />
      </div>
      <div className="scoreboard">
        Puan: {score} | Computer: {computerScore}
      </div>
      {gameOver ? (
        winner === 'You' ? (
          <div className="game-over">
            <h3>Congratulations! You won!</h3>
            <p>Your score: {score}</p>
            <button onClick={restart}>Play Again</button>
          </div>
        ) : (
          <div className="game-over">
            <h3>Game Over! Computer won!</h3>
            <button onClick={restart}>Play Again</button>
          </div>
        )
      )
      : (
        <div className="question-panel">
          <p className="question">Hangisi doğrudur?</p>
          <div className="options">
            {questionSet[playerQIdx].options.map((opt, i) => (
              <button className="option-button" key={i} onClick={() => handleAnswer(opt)}>
                <strong>{optionLabels[i]}</strong> {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarRaceGameScreen;