import React, { useState } from 'react';
import './CarRaceGame.css';
//import questionsData from './multiple_choice_questions.json';

type Question = {
  first_choice: string;
  second_choice: string;
  third_choice: string;
  fourth_choice?: string;
};

//const questions: Question[] = questionsData as Question[];
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

// Tüm doğru ve yanlış şıkları ayrı dizilere ayır
const allCorrects = questions.map(q => q.first_choice);
const allWrongs = questions.flatMap(q =>
  [q.second_choice, q.third_choice, q.fourth_choice].filter(Boolean) as string[]
);

type MultipleChoiceRaceProps = {
  difficulty: string;
  onGoToMain: () => void;
  onGoToSelection: () => void;
};

function difficultyIntConversion(difficulty: string): number {
  switch (difficulty) {
    case "Easy": return 0.4;
    case "Normal": return 0.6;
    case "Hard": return 0.8;
    default: return 0.4;
  }
}

function difficultyScoreMultiplier(difficulty: string): number {
  switch (difficulty) {
    case "Easy": return 1;
    case "Normal": return 2;
    case "Hard": return 3;
    default: return 1;
  }
}

// Her soru için kombinasyon üret
function generateQuestionSet(): { correct: string, options: string[] }[] {
  // Her bir doğru cevaba karşılık 3 rastgele yanlış şık seç
  return allCorrects.map(correct => {
    // Yanlışlardan 3 farklı şık seç, doğru şıkla aynı olanları çıkar
    const wrongs = shuffleArray(allWrongs.filter(w => w !== correct)).slice(0, 3);
    // Doğru ve yanlışları karıştır
    const options = shuffleArray([correct, ...wrongs]);
    return { correct, options };
  });
}

const questionSet = generateQuestionSet();

export const MultipleChoiceRace: React.FC<MultipleChoiceRaceProps> = ({
  difficulty,
  onGoToMain,
  onGoToSelection
}) => {
  const [playerPos, setPlayerPos] = useState(0);
  const [computerPos, setComputerPos] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'You' | 'Computer' | ''>('');
  const [score, setScore] = useState(0);

  // Soru ve şıklar
  const { correct, options } = questionSet[qIdx];
  const difficultyConversion = difficultyIntConversion(difficulty);
  const scoreMultiplier = difficultyScoreMultiplier(difficulty);

  const handleAnswer = (selected: string) => {
    if (gameOver) return;
    const isCorrect = selected === correct;
    const nextPlayer = playerPos + (isCorrect ? 1 : 0);
    const nextComputer = computerPos + (Math.random() < difficultyConversion ? 1 : 0);

    if (isCorrect) {
      const diff = Math.max(0, nextPlayer - nextComputer);
      setScore(prev => prev + 10 * scoreMultiplier + diff * 2);
    }

    setPlayerPos(nextPlayer);
    setComputerPos(nextComputer);

    if (nextPlayer >= FINISH_LINE) {
      setGameOver(true);
      setWinner('You');
    } else if (nextComputer >= FINISH_LINE) {
      setGameOver(true);
      setWinner('Computer');
    } else {
      setQIdx((qIdx + 1) % questionSet.length);
    }
  };

  const restart = () => {
    setPlayerPos(0);
    setComputerPos(0);
    setQIdx(0);
    setGameOver(false);
    setWinner('');
    setScore(0);
  };

  const renderLane = (pos: number, carIcon: string, label: string) => (
    <div className="lane">
      {Array.from({ length: CELL_COUNT }, (_, i) => (
        <div key={i} className={`cell${i === pos ? " active" : ""}`}>
          {i === pos && (
            <span className="car">{carIcon}</span>
          )}
          {i === 0 && <span className="lane-label">{label}</span>}
        </div>
      ))}
      <div className="finish-line"></div>
    </div>
  );

  const handleGoToMain = () => {
    setPlayerPos(0);
    setComputerPos(0);
    setQIdx(0);
    setGameOver(false);
    setWinner('');
    setScore(0);
    onGoToMain();
  };

  const handleGoToSelection = () => {
    setPlayerPos(0);
    setComputerPos(0);
    setQIdx(0);
    setGameOver(false);
    setWinner('');
    setScore(0);
    onGoToSelection();
  };

  return (
    <div className="race-container">
      <h2 className="title">Quiz Race</h2>
      <button onClick={handleGoToMain} className='main-button'>Ana Menü</button>
      <button onClick={handleGoToSelection} className='selection-button'>Seçim Ekranı</button>
      <div className="track">
        {renderLane(playerPos,   "🚗", "You")}
        {renderLane(computerPos, "💻", "Computer")}
      </div>
      <div style={{fontSize: "1.3rem", margin: "16px 0", fontWeight: "bold"}}>
        Puan: {score}
      </div>
      {gameOver ? (
        <div className="game-over">
          <h3>{winner} wins!</h3>
          <div style={{fontSize: "1.5rem", margin: "12px 0"}}>Toplam Puan: {score}</div>
          <button onClick={restart}>Play Again</button>
        </div>
      ) : (
        <div className="question-panel">
          <div className="question-and-options">
            <div className="question">Hangisi doğrudur?</div>
            <div className="options">
              {options.map((opt, idx) => (
                <button
                  key={opt}
                  className="option-button"
                  onClick={() => handleAnswer(opt)}
                >
                  <span style={{marginRight: 14, color: "#f77f00", fontWeight: 700}}>
                    {optionLabels[idx]}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};