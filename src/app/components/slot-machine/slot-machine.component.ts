import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockApiService } from '../../services/mock-api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RollService } from '../../services/roll.service';

@Component({
  selector: 'app-slot-machine',
  templateUrl: './slot-machine.component.html',
  styleUrls: ['./slot-machine.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
})
export class SlotMachineComponent implements OnInit {
  public userId = 100; // mocked user id
  public balance: number | null = null;
  public bets: number[] = [];
  public lastBet: number | null = null;
  public rolls: number[][] = [];
  public winAmount: number | null = null;
  public amountToBuy: number | null = null;
  public haveToBuy = false;
  public loading = false;
  public spinning = false;
  public spinningRolls: number[][] = [];
  public error: string | null = null;

  constructor(
    private apiService: MockApiService,
    private rollService: RollService
  ) {}

  ngOnInit(): void {
    this.initGame();
  }

  initGame(): void {
    this.loading = true;
    this.apiService.init(this.userId).subscribe(data => {
      this.balance = data.balance;
      this.bets = data.bets;
      this.lastBet = data.lastBet;
      this.rolls = data.rolls;
      this.amountToBuy = data.amountToBuy;
      this.haveToBuy = data.bets[0] > data.balance;
      this.loading = false;
    });
  }

  placeBet(bet: number): void {
    this.spinningRolls = this.rollService.generateSpinningRolls();
    this.spinning = true;
    this.error = '';
    this.winAmount = 0;

    this.apiService.spin(this.userId, bet).subscribe(res => {
      this.error = res.error;
      this.balance = res.data.balance;
      this.lastBet = res.data.lastBet;
      this.rolls = res.data.rolls;
      this.winAmount = res.data.winAmount;
      this.amountToBuy = res.data.amountToBuy;
      this.haveToBuy = res.data.bets[0] > res.data.balance;
      this.spinning = false;
    });
  }

  buyCoins(): void {
    this.loading = true;
    this.apiService.buy(this.userId).subscribe(data => {
      this.balance = data.balance;
      this.amountToBuy = data.amountToBuy;
      this.haveToBuy = data.bets[0] > data.balance;
      this.loading = false;
    });
  }
}
