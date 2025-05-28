import React, { useState } from "react";
import { Box, Paper, Typography, Button, Avatar } from "@mui/material";

const users = [
    {
        id: 1,
        name: "Ali Yılmaz",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        day: "hangman",
        game: "car",
    },
    {
        id: 2,
        name: "Ayşe Kaya",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        day: "hangman",
        game: "baloon",
    },
    {
        id: 3,
        name: "Mehmet Demir",
        avatar: "https://randomuser.me/api/portraits/men/13.jpg",
        day: "car",
        game: "car",
    },
    {
        id: 4,
        name: "Buse Arslan",
        avatar: "https://randomuser.me/api/portraits/women/14.jpg",
        day: "baloon",
        game: "baloon",
    },
    {
        id: 5,
        name: "Murat Güneş",
        avatar: "https://randomuser.me/api/portraits/men/15.jpg",
        day: "hangman",
        game: "car",
    },
    {
        id: 6,
        name: "İrem Kurt",
        avatar: "https://randomuser.me/api/portraits/women/16.jpg",
        day: "baloon",
        game: "baloon",
    },

];

const FILTERS = [
    { label: "Hangman", key: "hangman", color: "#e9faea" },
    { label: "Baloon", key: "baloon", color: "#f7e9eb" },
    { label: "CarRace", key: "car", color: "#ece6f6" },
    { label: "All", key: "all", color: "#f7f4db" },
];

function LeaderBoard(): React.ReactElement {
    const [selected, setSelected] = useState<string>("all");

    const filteredUsers =
        selected === "all"
            ? users
            : users.filter(
                  (u) =>
                      selected === "hangman"
                          ? u.day === "hangman"
                          : u.game === selected
              );

    return (
        <Box>
            <Paper
                elevation={0}
                sx={{
                    userSelect: "none",
                    bgcolor: "#fff",
                    p: 2,
                    border: "3px solid #333",
                    borderRadius: 4,
                    minHeight: 415,
                    maxHeight: 415,
                    mt: 2.5,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontFamily: "'Handlee', cursive",
                        mb: 2,
                        textAlign: "center",
                        fontWeight: 500,
                    }}
                >
                    Leaderboard
                </Typography>
                <Box
                    display="flex"
                    gap={1}
                    justifyContent="center"
                    mb={2}
                    sx={{ width: "100%" }}
                >
                    {FILTERS.map((filter) => (
                        <Button
                            key={filter.key}
                            onClick={() => setSelected(filter.key)}
                            variant={selected === filter.key ? "contained" : "outlined"}
                            sx={{
                                bgcolor: selected === filter.key ? filter.color : "#fff",
                                borderRadius: 2,
                                border: "2px solid #bbb",
                                minWidth: 80,
                                color: "#223",
                                fontFamily: "'Handlee', cursive",
                                fontSize: 17,
                                boxShadow: 0,
                                textTransform: "none",
                                fontWeight: 500,
                                "&:hover": {
                                    bgcolor: filter.color,
                                },
                            }}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        flex: 1,
                        overflowY: "auto",
                        minHeight: 0,
                        pr: 0.5,
                    }}
                >
                    {filteredUsers.length === 0 && (
                        <Typography
                            sx={{
                                textAlign: "center",
                                mt: 3,
                                color: "#888",
                                fontFamily: "'Handlee', cursive",
                            }}
                        >
                            No users found.
                        </Typography>
                    )}
                    {filteredUsers.map((user) => (
                        <Box
                            key={user.id}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            sx={{
                                p: 1,
                                mb: 1,
                                bgcolor: "#f5f6fa",
                                borderRadius: 2,
                                border: "1.5px solid #e5e5e5",
                                boxShadow: "0 1px 4px 0 rgba(44, 62, 80, 0.05)",
                            }}
                        >
                            <Avatar src={user.avatar} alt={user.name} sx={{ width: 40, height: 40 }} />
                            <Typography
                                sx={{
                                    fontFamily: "'Handlee', cursive",
                                    fontSize: 18,
                                    fontWeight: 500,
                                }}
                            >
                                {user.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}

export default LeaderBoard;
