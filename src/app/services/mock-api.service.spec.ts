import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MockApiService } from './mock-api.service';
import { RollService } from './roll.service';
import { IUser } from './mock-api.service.interface';

describe('MockApiService', () => {
  let service: MockApiService;
  let rollServiceSpy: jasmine.SpyObj<RollService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RollService', [
      'generateNonWinningRolls',
      'generateRolls',
      'isWinningRoll',
    ]);

    TestBed.configureTestingModule({
      providers: [MockApiService, { provide: RollService, useValue: spy }],
    });

    service = TestBed.inject(MockApiService);
    rollServiceSpy = TestBed.inject(RollService) as jasmine.SpyObj<RollService>;

    spyOn(localStorage, 'getItem').and.callFake(() => null);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize a user and store it in localStorage', (done) => {
    const mockRolls = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    rollServiceSpy.generateNonWinningRolls.and.returnValue(mockRolls);

    service.init(1).subscribe((user) => {
      expect(user.uid).toBe(1);
      expect(user.balance).toBe(1000);
      expect(user.rolls).toEqual(mockRolls);
      done();
    });
  });
});
