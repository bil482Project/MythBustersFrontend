// Strategy interface for Hangman Game difficulty levels
export interface HangmanGameStrategy {
  getInitialLives(): number;
  getMaxWrongGuesses(): number;
  getQuestionCount(): number;
  getScoreMultiplier(): number;
  getHintCost(): number;
  getWordCompletionBonus(): number;
}

// Easy difficulty strategy
export class EasyHangmanStrategy implements HangmanGameStrategy {
  getInitialLives(): number {
    return 5;
  }

  getMaxWrongGuesses(): number {
    return 8; // More wrong guesses allowed
  }

  getQuestionCount(): number {
    return 3;
  }

  getScoreMultiplier(): number {
    return 1;
  }

  getHintCost(): number {
    return 5; // Lower cost for hints
  }

  getWordCompletionBonus(): number {
    return 15;
  }
}

// Normal difficulty strategy
export class NormalHangmanStrategy implements HangmanGameStrategy {
  getInitialLives(): number {
    return 3;
  }

  getMaxWrongGuesses(): number {
    return 6; // Standard hangman wrong guesses
  }

  getQuestionCount(): number {
    return 5;
  }

  getScoreMultiplier(): number {
    return 2;
  }

  getHintCost(): number {
    return 10; // Standard cost for hints
  }

  getWordCompletionBonus(): number {
    return 25;
  }
}

// Hard difficulty strategy
export class HardHangmanStrategy implements HangmanGameStrategy {
  getInitialLives(): number {
    return 1;
  }

  getMaxWrongGuesses(): number {
    return 4; // Fewer wrong guesses allowed
  }

  getQuestionCount(): number {
    return 7;
  }

  getScoreMultiplier(): number {
    return 3;
  }

  getHintCost(): number {
    return 15; // Higher cost for hints
  }

  getWordCompletionBonus(): number {
    return 40;
  }
}

// Mode-specific strategy adjustments
export class HangmanModeStrategy {
  static applyModeAdjustments(
    baseStrategy: HangmanGameStrategy,
    mode: string
  ): HangmanGameStrategy {
    return new (class implements HangmanGameStrategy {
      getInitialLives(): number {
        return baseStrategy.getInitialLives();
      }

      getMaxWrongGuesses(): number {
        const base = baseStrategy.getMaxWrongGuesses();
        switch (mode) {
          case 'Speedrun Mode':
            return Math.max(3, base - 2);
          case 'Hardcore Mode':
            return Math.max(2, base - 3);
          default:
            return base;
        }
      }

      getQuestionCount(): number {
        return baseStrategy.getQuestionCount();
      }

      getScoreMultiplier(): number {
        const base = baseStrategy.getScoreMultiplier();
        switch (mode) {
          case 'Speedrun Mode':
            return base * 1.5;
          case 'Hardcore Mode':
            return base * 2;
          default:
            return base;
        }
      }

      getHintCost(): number {
        const base = baseStrategy.getHintCost();
        switch (mode) {
          case 'Hardcore Mode':
            return base * 2;
          default:
            return base;
        }
      }

      getWordCompletionBonus(): number {
        const base = baseStrategy.getWordCompletionBonus();
        switch (mode) {
          case 'Speedrun Mode':
            return base * 1.5;
          case 'Hardcore Mode':
            return base * 2;
          default:
            return base;
        }
      }
    })();
  }
}

// Factory to create the appropriate strategy based on difficulty
export class HangmanStrategyFactory {
  static createStrategy(difficulty: string, mode: string): HangmanGameStrategy {
    let baseStrategy: HangmanGameStrategy;

    switch (difficulty) {
      case 'Easy':
        baseStrategy = new EasyHangmanStrategy();
        break;
      case 'Hard':
        baseStrategy = new HardHangmanStrategy();
        break;
      case 'Normal':
      default:
        baseStrategy = new NormalHangmanStrategy();
        break;
    }

    return HangmanModeStrategy.applyModeAdjustments(baseStrategy, mode);
  }
}
