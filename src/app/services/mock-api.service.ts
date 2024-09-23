import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { IUser } from './mock-api.service.interface';
import { RollService } from './roll.service';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private delayTime = 2000;
  private lsMockDataKey = 'luckyClickMockData';
  private userData: { [uid: number]: IUser } = {};

  constructor(private rollService: RollService) {
    const storedData = localStorage.getItem(this.lsMockDataKey);
    if (storedData) this.userData = JSON.parse(storedData);
  }

  private generateMockUserData(uid: number): IUser {
    return {
      uid,
      balance: 1000,
      lastBet: null,
      bets: [10, 20, 50, 100],
      rolls: this.rollService.generateNonWinningRolls(),
      winAmount: 0,
    };
  }

  private saveUserData(user: IUser): void {
    localStorage.setItem(
      this.lsMockDataKey,
      JSON.stringify({ ...this.userData, [user.uid]: user })
    );
  }

  public init(uid: number): Observable<IUser> {
    let user = this.userData[uid];

    if (!user) {
      user = this.generateMockUserData(uid);
      this.userData[uid] = user;
      this.saveUserData(user);
    }

    return of(user).pipe(delay(this.delayTime));
  }

  public spin(
    uid: number,
    bet: number
  ): Observable<{ error: string | null; data: IUser }> {
    let user = this.userData[uid];

    if (!user) {
      return this.init(uid).pipe(switchMap(() => this.spin(uid, bet)));
    }

    if (user.balance < bet) {
      return of({ error: 'Insufficient balance', data: user }).pipe(
        delay(this.delayTime)
      );
    }

    user.balance -= bet;
    user.lastBet = bet;

    const rolls = this.rollService.generateRolls();
    const { win, coefficient } = this.rollService.isWinningRoll(rolls);

    let winAmount = 0;

    if (win) {
      winAmount = bet * coefficient;
      user.balance += winAmount;
    }

    user.rolls = rolls;
    user.winAmount = winAmount;
    this.saveUserData(user);

    return of({ error: null, data: user }).pipe(delay(this.delayTime));
  }
}
