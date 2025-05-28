import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

interface GameSelectionProps {
  onBack: () => void;
}

const GameSelection: React.FC<GameSelectionProps> = ({ onBack }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Paper sx={{ p: 4, borderRadius: 3, minWidth: 350 }}>
        <Typography variant="h4" mb={3}>
          Game Selection
        </Typography>
        <Stack spacing={2}>
          <Button variant="contained" color="primary" fullWidth>
            Start Game
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={onBack}>
            Back to Main Page
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default GameSelection;
