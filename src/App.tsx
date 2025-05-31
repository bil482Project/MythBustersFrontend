import React, { useState } from "react";
import Box from "@mui/material/Box";
import MainPage from "./main/MainPage";
import GameScreen from "./game/GameScreen";

type ScreenType = "main" | "carRace" | "balloon" | "hangman";

function App() {
  const [screen, setScreen] = useState<ScreenType>("main");

  const handleSelectGame = (gameLabel: string) => {
    if (gameLabel === "Racing Game") setScreen("carRace");
    else if (gameLabel === "Balloon Popping") setScreen("balloon");
    else if (gameLabel === "Hangman") setScreen("hangman");
  };

  return (
    <Box>
      {screen === "main" && <MainPage onSelectGame={handleSelectGame} />}
      {screen === "carRace" && (
        <GameScreen title="Car Race" onGoToMain={() => setScreen("main")} />
      )}
      {screen === "balloon" && (
        <GameScreen title="Balloon Popping" onGoToMain={() => setScreen("main")} />
      )}
      {screen === "hangman" && (
        <GameScreen title="Hangman" onGoToMain={() => setScreen("main")} />
      )}
    </Box>
  );
}

export default App;
