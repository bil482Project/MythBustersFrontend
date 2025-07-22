import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, Avatar } from "@mui/material";
import * as styles from "../styles/LeaderBoard.styles";

const FILTERS = [
    { label: "Hangman", key: "hangman", color: "#b9f6ca" }, 
    { label: "Balloon", key: "balloon", color: "#ff8a80" },   
    { label: "CarRace", key: "car", color: "#b388ff" },     
    { label: "All", key: "all", color: "#fff59d" },         
];


type User = {
    profileId: string;
    profilePhoto: string;
    username: string;
    score: number;
};

export default function LeaderBoard() {
    const [selected, setSelected] = useState("all");
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        let url = `http://localhost:8080/api/leaderboard?gameType=${selected}`;
        
        fetch(url)
            .then(res => {
                if (!res.ok) throw new Error("API hatası");
                return res.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(e => setError("Veri alınamadı"))
            .finally(() => setLoading(false));
    }, [selected]);

    return (
        <Box>
            <Paper elevation={0} sx={styles.wrapper}>
                <Typography variant="h5" sx={styles.title}>
                    Leaderboard
                </Typography>

                <Box sx={styles.filterBar}>
                    {FILTERS.map(f => (
                        <Button
                            key={f.key}
                            onClick={() => setSelected(f.key)}
                            variant="outlined"
                            sx={styles.filterBtn(selected === f.key, f.color)}
                        >
                            {f.label}
                        </Button>
                    ))}
                </Box>

                <Box sx={styles.listBox}>
                    {loading && <Typography>Yükleniyor...</Typography>}
                    {error && <Typography color="error">{error}</Typography>}
                    {!loading && !error && users.length === 0 && (
                        <Typography sx={styles.emptyMsg}>No users found.</Typography>
                    )}

                    {!loading && !error && users.map(user => (
                        <Box
                            key={user.profileId}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={styles.row}
                        >
                            <Box display="flex" alignItems="center" gap={2}>
                                <Avatar src={user.profilePhoto} alt={user.username} sx={{ width: 40, height: 40 }} />
                                <Typography sx={styles.nameText}>{user.username}</Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontFamily: "'Handlee', cursive",
                                    fontSize: 17,
                                    color: "#455a64",
                                    fontWeight: 700,
                                    minWidth: 80,
                                    textAlign: "right",
                                }}
                            >
                                {user.score}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Paper>
        </Box>
    );
}
