// Strategy interface for Car Race Game difficulty levels
export interface CarRaceGameStrategy {
  getPlayerScoreMultiplier(): number;
  getComputerCorrectChance(): number;
  getComputerMoveInterval(mode: string): number;
  getModeScoreMultiplier(mode: string): number;
}

// Easy difficulty strategy
export class EasyCarRaceStrategy implements CarRaceGameStrategy {
  getPlayerScoreMultiplier(): number {
    return 1;
  }

  getComputerCorrectChance(): number {
    return 0.5; // 50% chance computer answers correctly
  }

  getComputerMoveInterval(mode: string): number {
    const baseInterval = this.getBaseModeInterval(mode);
    return baseInterval * 1.5; // Slower computer in easy mode
  }

  getModeScoreMultiplier(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 2;
      case 'Speedrun Mode':
        return 1.5;
      case 'Normal Mode':
        return 1;
      default:
        return 1;
    }
  }

  private getBaseModeInterval(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 500;
      case 'Speedrun Mode':
        return 1000;
      case 'Normal Mode':
        return 2000;
      default:
        return 500;
    }
  }
}

// Normal difficulty strategy
export class NormalCarRaceStrategy implements CarRaceGameStrategy {
  getPlayerScoreMultiplier(): number {
    return 2;
  }

  getComputerCorrectChance(): number {
    return 0.85; // 85% chance computer answers correctly
  }

  getComputerMoveInterval(mode: string): number {
    return this.getBaseModeInterval(mode);
  }

  getModeScoreMultiplier(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 3;
      case 'Speedrun Mode':
        return 2;
      case 'Normal Mode':
        return 1;
      default:
        return 1;
    }
  }

  private getBaseModeInterval(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 500;
      case 'Speedrun Mode':
        return 1000;
      case 'Normal Mode':
        return 2000;
      default:
        return 500;
    }
  }
}

// Hard difficulty strategy
export class HardCarRaceStrategy implements CarRaceGameStrategy {
  getPlayerScoreMultiplier(): number {
    return 3;
  }

  getComputerCorrectChance(): number {
    return 0.9; // 90% chance computer answers correctly
  }

  getComputerMoveInterval(mode: string): number {
    const baseInterval = this.getBaseModeInterval(mode);
    return baseInterval * 0.8; // Faster computer in hard mode
  }

  getModeScoreMultiplier(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 4;
      case 'Speedrun Mode':
        return 3;
      case 'Normal Mode':
        return 2;
      default:
        return 1;
    }
  }

  private getBaseModeInterval(mode: string): number {
    switch (mode) {
      case 'Hardcore Mode':
        return 500;
      case 'Speedrun Mode':
        return 1000;
      case 'Normal Mode':
        return 2000;
      default:
        return 500;
    }
  }
}

// Factory to create the appropriate strategy based on difficulty
export class CarRaceStrategyFactory {
  static createStrategy(difficulty: string): CarRaceGameStrategy {
    switch (difficulty) {
      case 'Easy':
        return new EasyCarRaceStrategy();
      case 'Hard':
        return new HardCarRaceStrategy();
      case 'Normal':
      default:
        return new NormalCarRaceStrategy();
    }
  }
}
