import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MainPage from "./main/MainPage";
import GameScreen from "./game/GameScreen";
import RegisterPage from "./registiration/RegisterPage";
import LoginPage from "./registiration/LoginPage";
import axios from "axios";

type ScreenType = "main" | "carRace" | "balloon" | "hangman" | "register" | "login";

type User = {
  username: string;
  avatar: string;
  coin: number;
};

function App() {
  const [screen, setScreen] = useState<ScreenType>("main");
  const [user, setUser] = useState<User | null>(null);
  const [point, setPoint] = useState<number>(0);
  const [gameTitle, setGameTitle] = useState<string>("");

  //kazanma durumunda point değişirse coin güncelle
  useEffect(() => {
      if (point) {
          const updatedCoin = (user?.coin ?? 0) + Math.trunc(point * 0.75);
          setUser({ ...user, coin: updatedCoin} as User);
          if (user) {
              setUser({ ...user, coin: updatedCoin });
              axios.post(`http://localhost:8080/api/profiles/updateCoin/${updatedCoin}`, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ username: user.username }),
              })
              .then(res => {
                  if (res.status !== 200) throw new Error("API hatası");
              })
              .catch(e => console.error("Veri güncellenemedi", e));
          }
      }
      setPoint(0); // Reset point after updating
  },[point])

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
          setGameTitle={setGameTitle}
        />
      )}
      {screen === "carRace" && (
        <GameScreen title="Car Race" onGoToMain={() => setScreen("main")} user={user} setUser={setUser} point={point} setPoint={setPoint}/>
      )}
      {screen === "balloon" && (
        <GameScreen title="Balloon Popping" onGoToMain={() => setScreen("main")} user={user} setUser={setUser} point={point} setPoint={setPoint}/>
      )}
      {screen === "hangman" && (
        <GameScreen title="Hangman" onGoToMain={() => setScreen("main")} user={user} setUser={setUser} point={point} setPoint={setPoint}/>
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
