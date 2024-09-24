export interface IUser {
  uid: number;
  balance: number;
  lastBet: number | null;
  bets: number[];
  rolls: number[][];
  winAmount: number | null;
  amountToBuy: number;
}
