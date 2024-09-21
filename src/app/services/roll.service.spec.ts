
import { TestBed } from '@angular/core/testing';
import { RollService } from './roll.service';

describe('RollService', () => {
  let service: RollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomSymbol should return a number between 1 and 9', () => {
    const symbol = service['getRandomSymbol']();
    expect(symbol).toBeGreaterThanOrEqual(1);
    expect(symbol).toBeLessThanOrEqual(9);
  });

  it('generateRolls should return a 3x3 array', () => {
    const rolls = service.generateRolls();
    expect(rolls.length).toBe(3);
    rolls.forEach(row => expect(row.length).toBe(3));
  });

  it('isWinningLine should identify a winning line', () => {
    const winningRolls = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ];
    const isWinning = service['isWinningLine'](winningRolls);
    expect(isWinning).toBeTrue();
  });

  it('isWinningLine should identify a non-winning line', () => {
    const nonWinningRolls = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const isWinning = service['isWinningLine'](nonWinningRolls);
    expect(isWinning).toBeFalse();
  });

  it('isWinningRoll should return correct result for winning rolls', () => {
    const winningRolls = [
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ];
    const result = service.isWinningRoll(winningRolls);
    expect(result.win).toBeTrue();
    expect(result.coefficient).toBe(10);
  });

  it('isWinningRoll should return correct result for non-winning rolls', () => {
    const nonWinningRolls = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    const result = service.isWinningRoll(nonWinningRolls);
    expect(result.win).toBeFalse();
    expect(result.coefficient).toBe(0);
  });

  it('generateNonWinningRolls should return non-winning rolls', () => {
    const nonWinningRolls = service.generateNonWinningRolls();
    const isWinning = service['isWinningLine'](nonWinningRolls);
    expect(isWinning).toBeFalse();
  });

  it('generateSpinningRolls should return a 3x9 array', () => {
    const spinningRolls = service.generateSpinningRolls();
    expect(spinningRolls.length).toBe(3);
    spinningRolls.forEach(row => expect(row.length).toBe(9));
  });
});
