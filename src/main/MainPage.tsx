import React, { useState } from "react";
import { Box, Paper, Avatar, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import LeaderBoard from "./LeaderBoard";
import * as styles from "../styles/MainPage.styles";
import * as dialogStyles from "../styles/LogoutDialog.styles";

interface UserInfo {
  username: string;
  avatar: string;
  coin: number;
}

interface MainPageProps {
  onSelectScreen: (label: string) => void
  user?: UserInfo | null;
  onLogout?: () => void;
}

const screen = [
  { label: "Racing Game" },
  { label: "Balloon Popping" },
  { label: "Hangman" },
];

function MainPage({ onSelectScreen, user, onLogout }: MainPageProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogoutClick = () => setLogoutDialogOpen(true);
  const handleDialogClose = () => setLogoutDialogOpen(false);

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.leftPane}>
        <Paper elevation={0} sx={styles.welcomePaper}>
          Welcome to MythBusters!
        </Paper>
        <Box display="flex" gap={3} mb={2}>
          {screen.map((game) => (
            <Paper
              key={game.label}
              component="button"
              onClick={() => onSelectScreen(game.label)}
              sx={styles.gameCard}
            >
              {game.label}
            </Paper>
          ))}
        </Box>
        <Paper
          elevation={0}
          component="button"
          onClick={() => alert("FlashCard Tıklandı")}
          sx={styles.flashPaper}
        >
          Learn – FlashCards
        </Paper>
      </Box>

      <Box sx={styles.rightPane}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Paper elevation={0} sx={styles.authPaper}>
                {user ? <Box component="span" sx={styles.authLink} onClick={() => onSelectScreen("Login")}>
                  Free to use {user?.coin} gold
                </Box> : <Box component="span" sx={styles.authLink} onClick={() => onSelectScreen("Login")}>
                  Login to get free 50 gold
                </Box>}
            {!user ? (
              <>
                <Box component="span" sx={styles.authLink} onClick={() => onSelectScreen("Login")}>
                  Login
                </Box>
                /
                <Box component="span" sx={styles.authLink} onClick={() => onSelectScreen("Register")}>
                  Sign Up
                </Box>
              </>
            ) : (
              <Box display="flex" alignItems="center" gap={1} sx={{ py: 0.5 }}>
                <Avatar src={user.avatar} alt={user.username} sx={{ width: 34, height: 34, mr: 1 }} />
                <Typography sx={{ fontWeight: 600, fontFamily: "'Handlee', cursive" }}>
                  {user.username}
                </Typography>
                <Button
                  onClick={handleLogoutClick}
                  startIcon={<LogoutIcon />}
                  sx={{
                    ml: 2,
                    bgcolor: "#fff0f1",
                    color: "#c62828",
                    fontWeight: 600,
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                    minWidth: 0,
                    fontFamily: "'Handlee', cursive",
                    border: "1px solid #e57373",
                    textTransform: "none",
                    "&:hover": {
                      bgcolor: "#ffe6e8",
                      color: "#b71c1c",
                      borderColor: "#f44336"
                    }
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Paper>
        </Box>
        <LeaderBoard />
      </Box>

      <Dialog
        open={logoutDialogOpen}
        onClose={handleDialogClose}
        PaperProps={{ sx: dialogStyles.dialogPaper }}
      >
        <DialogTitle sx={dialogStyles.title}>Log Out</DialogTitle>
        <DialogContent sx={dialogStyles.content}>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions sx={dialogStyles.actions}>
          <Button onClick={handleDialogClose} sx={dialogStyles.button}>
            Cancel
          </Button>
          <Button onClick={handleLogoutConfirm} sx={dialogStyles.dangerButton}>
            Yes, Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MainPage;