import React, { useState } from "react";
import Box from "@mui/material/Box";
import MainPage from "./main/MainPage";
import GameScreen from "./game/GameScreen";
import RegisterPage from "./registiration/RegisterPage";
import LoginPage from "./registiration/LoginPage";

type ScreenType = "main" | "carRace" | "balloon" | "hangman" | "register" | "login";

type User = {
  username: string;
  avatar: string;
};

function App() {
  const [screen, setScreen] = useState<ScreenType>("main");
  const [user, setUser] = useState<User | null>(null);

  const handleSelectScreen = (screenLabel: string) => {
    if (screenLabel === "Racing Game") setScreen("carRace");
    else if (screenLabel === "Balloon Popping") setScreen("balloon");
    else if (screenLabel === "Hangman") setScreen("hangman");
    else if (screenLabel === "Register") setScreen("register");
    else if (screenLabel === "Login") setScreen("login");
    else if (screenLabel === "Logout") {
      setUser(null);
      setScreen("main");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("main");
  };

  return (
    <Box>
      {screen === "main" && (
        <MainPage
          onSelectScreen={handleSelectScreen}
          user={user}
          onLogout={handleLogout}
        />
      )}
      {screen === "carRace" && (
        <GameScreen title="Car Race" onGoToMain={() => setScreen("main")} />
      )}
      {screen === "balloon" && (
        <GameScreen title="Balloon Popping" onGoToMain={() => setScreen("main")} />
      )}
      {screen === "hangman" && (
        <GameScreen title="Hangman" onGoToMain={() => setScreen("main")} />
      )}
      {screen === "login" && (
        <LoginPage
          onNavigateToRegister={() => setScreen("register")}
          onLoginSuccess={userObj => {
            setUser(userObj);
            setScreen("main");
          }}
        />
      )}
      {screen === "register" && (
        <RegisterPage
          onNavigateToLogin={() => setScreen("login")}
          onRegisterSucces={(userObj) => {
            setUser(userObj);
            setScreen("main");
          }}
        />
      )}
    </Box>
  );
}

export default App;
