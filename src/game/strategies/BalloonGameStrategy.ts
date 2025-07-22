// Strategy interface for Balloon Game difficulty levels
export interface BalloonGameStrategy {
  getInitialLives(): number;
  getSpeedMultiplier(): number;
  getBalloonAmount(): number;
  getScoreBonus(): number;
}

// Easy difficulty strategy
export class EasyBalloonStrategy implements BalloonGameStrategy {
  getInitialLives(): number {
    return 5;
  }

  getSpeedMultiplier(): number {
    return 0.8;
  }

  getBalloonAmount(): number {
    return 3;
  }

  getScoreBonus(): number {
    return 1;
  }
}

// Normal difficulty strategy
export class NormalBalloonStrategy implements BalloonGameStrategy {
  getInitialLives(): number {
    return 3;
  }

  getSpeedMultiplier(): number {
    return 1.0;
  }

  getBalloonAmount(): number {
    return 4;
  }

  getScoreBonus(): number {
    return 2;
  }
}

// Hard difficulty strategy
export class HardBalloonStrategy implements BalloonGameStrategy {
  getInitialLives(): number {
    return 1;
  }

  getSpeedMultiplier(): number {
    return 1.2;
  }

  getBalloonAmount(): number {
    return 5;
  }

  getScoreBonus(): number {
    return 3;
  }
}

// Factory to create the appropriate strategy based on difficulty
export class BalloonStrategyFactory {
  static createStrategy(difficulty: string): BalloonGameStrategy {
    switch (difficulty) {
      case 'Easy':
        return new EasyBalloonStrategy();
      case 'Hard':
        return new HardBalloonStrategy();
      case 'Normal':
      default:
        return new NormalBalloonStrategy();
    }
  }
}
