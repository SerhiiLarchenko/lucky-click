import { A } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RollService {
  private winCoefficient = 10;

  constructor() {}

  private getRandomSymbol(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  public generateRolls(): number[][] {
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => this.getRandomSymbol())
    );
  }

  private isWinningLine(rolls: number[][]): boolean {
    const lines = [
      // Rows
      [rolls[0][0], rolls[1][0], rolls[2][0]],
      [rolls[0][1], rolls[1][1], rolls[2][1]],
      [rolls[0][2], rolls[1][2], rolls[2][2]],
      // Columns
      [rolls[0][0], rolls[0][1], rolls[0][2]],
      [rolls[1][0], rolls[1][1], rolls[1][2]],
      [rolls[2][0], rolls[2][1], rolls[2][2]],
      // Diagonals
      [rolls[0][0], rolls[1][1], rolls[2][2]],
      [rolls[0][2], rolls[1][1], rolls[2][0]],
    ];

    return lines.some((line) => line.every((num) => num === line[0]));
  }

  public isWinningRoll(rolls: number[][]): {
    win: boolean;
    coefficient: number;
  } {
    return this.isWinningLine(rolls)
      ? { win: true, coefficient: this.winCoefficient }
      : { win: false, coefficient: 0 };
  }

  public generateNonWinningRolls(): number[][] {
    const attemptsNumber = 10;

    for (let i = 0; i < attemptsNumber; i++) {
      const rolls = this.generateRolls();
      if (!this.isWinningLine(rolls)) return rolls;
    }

    return [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
  }

  public generateSpinningRolls(): number[][] {
    return Array.from({ length: 3 }, () =>
      Array.from({ length: 9 }, () => this.getRandomSymbol())
    );
  }
}
