import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import * as styles from "../styles/CharacterSelectionPanel.styles";
import axios from "axios";

interface CharacterSelectionPanelProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  avatar?: string;
  setAvatar?: React.Dispatch<React.SetStateAction<string>>;
}

interface CharacterCategory {
  title: string;
  items: string[];
  cost?: number[];
  icons?: string[];
}

type User = {
  username: string;
  avatar: string;
  coin: number;
};

const characterCategories: CharacterCategory[] = [
  { title: "Animals", cost: [5, 10, 20], items: ["5 gold", "10 gold", "20 gold"] },
  { title: "Cars", cost: [50, 100, 200], icons:["🚙", "🏍️", "🏎"], items: ["50 gold", "100 gold", "200 gold"] },
  { title: "Human", items: ["ali", "ayşe", "mehmet"] },
];

// Command Pattern: BuyAvatarCommand
class BuyAvatarCommand {
  private user: User | null;
  private setUser: React.Dispatch<React.SetStateAction<User | null>>;
  private setAvatar?: React.Dispatch<React.SetStateAction<string>>;
  private category: CharacterCategory;
  private itemIndex: number;
  private observers: PurchaseObserver[];

  constructor(
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    setAvatar: React.Dispatch<React.SetStateAction<string>> | undefined,
    category: CharacterCategory,
    itemIndex: number,
    observers: PurchaseObserver[]
  ) {
    this.user = user;
    this.setUser = setUser;
    this.setAvatar = setAvatar;
    this.category = category;
    this.itemIndex = itemIndex;
    this.observers = observers;
  }

  execute() {
    const cost = this.category.cost?.[this.itemIndex] ?? 0;
    if (this.user != null && this.user.coin >= cost) {
      this.setUser({ ...this.user, coin: this.user.coin - cost });
      this.setAvatar?.(this.category.icons ? this.category.icons[this.itemIndex] : this.category.items[this.itemIndex]);
      this.notifyObservers({
        username: this.user.username,
        avatar: this.category.icons ? this.category.icons[this.itemIndex] : this.category.items[this.itemIndex],
        cost,
        coinLeft: this.user.coin - cost,
      });
    } else {
      if (this.user?.coin === undefined) {
        alert("Please login to buy avatars!");
      } else {
        alert("Not enough coin!");
      }
    }
  }

  notifyObservers(event: PurchaseCompletedEvent) {
    this.observers.forEach((observer) => observer.onPurchaseCompleted(event));
  }
}

// Observer Pattern
interface PurchaseCompletedEvent {
  username: string;
  avatar: string;
  cost: number;
  coinLeft: number;
}

interface PurchaseObserver {
  onPurchaseCompleted: (event: PurchaseCompletedEvent) => void;
}

// Example Observers
const WalletObserver: PurchaseObserver = {
  onPurchaseCompleted: (event) => {
    // Could trigger wallet UI update, here just log
    console.log(`Wallet updated: ${event.coinLeft} coins left.`);
  },
};

const NotificationObserver: PurchaseObserver = {
  onPurchaseCompleted: (event) => {
    alert(`Purchase successful! You bought ${event.avatar} for ${event.cost} coins.`);
  },
};

const AchievementObserver: PurchaseObserver = {
  onPurchaseCompleted: (event) => {
    // Example: log achievement
    console.log(`Achievement: Avatar ${event.avatar} purchased by ${event.username}`);
  },
};

const observers: PurchaseObserver[] = [WalletObserver, NotificationObserver, AchievementObserver];

const CharacterSelectionPanel: React.FC<CharacterSelectionPanelProps> = ({ user, setUser, avatar, setAvatar }) => {
  const handleItemClick = (categoryIndex: number, itemIndex: number) => {
    const category = characterCategories[categoryIndex];
    // Only apply Command/Observer for Car Game avatars
    if (category.title === "Cars") {
      const command = new BuyAvatarCommand(user, setUser, setAvatar, category, itemIndex, observers);
      command.execute();
    } else {
      // Fallback for other categories (Animals, Human)
      const cost = category.cost?.[itemIndex] ?? 0;
      if (user != null && user.coin >= cost) {
        setUser({ ...user, coin: user.coin - cost });
        setAvatar?.(category.icons ? category.icons[itemIndex] : category.items[itemIndex]);
          //satın alma durumunda coin güncelle
            if (user) {
                setUser({ ...user, coin: user.coin });
                axios.post(`http://localhost:8080/api/profiles/updateCoin/${user.coin}`, {
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
      } else {
        if (user?.coin === undefined) {
          alert("Please login to buy avatars!");
        } else {
          alert("Not enough coin!");
        }
      }
    }
  };

  return (
    <Paper sx={styles.wrapper}>
      <Typography sx={styles.title}>Select Character</Typography>
      <Typography sx={{ mb: 2,   
                      fontFamily: "'Handlee', cursive",
                      fontWeight: 400,
                      fontSize: 18,
                      }}>Coin Left: {user?.coin}</Typography>

      {characterCategories.map((cat, catIdx) => (
        <Box key={cat.title} sx={{ mb: catIdx !== characterCategories.length - 1 ? 2 : 0 }}>
          <Typography sx={styles.catTitle}>{cat.title}</Typography>

          <Box sx={styles.itemRow}>
            {cat.items.map((item, itemIdx) => (
              <Paper
                key={item}
                elevation={0}
                sx={styles.itemCard}
                onClick={() => handleItemClick(catIdx, itemIdx)}
              >
                {cat.icons && cat.icons[itemIdx]}
                {item}
              </Paper>
            ))}
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default CharacterSelectionPanel;
