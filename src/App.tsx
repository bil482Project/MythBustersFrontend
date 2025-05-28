import Box from '@mui/material/Box';
import { useState } from 'react';
import MainPage from './MainPage';
import GameSelection from './GameSelection';

function App() {

  const [screen, setScreen] = useState<"main" | "gameSelection">("main");
  
  return (
    <Box>
      {screen === "main" ? (
        <MainPage onSelectGame={() => setScreen("gameSelection")} />
      ) : (
        <GameSelection onBack={() => setScreen("main")} />
      )}
    </Box>
  );
}

export default App;
