import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotMachineComponent } from './slot-machine.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('SlotMachineComponent', () => {
  let component: SlotMachineComponent;
  let fixture: ComponentFixture<SlotMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotMachineComponent, MatIcon, MatProgressSpinnerModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a spinner when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('should display balance correctly', () => {
    component.loading = false;
    component.balance = 1000;
    fixture.detectChanges();
    const balanceElement = fixture.debugElement.query(
      By.css('.balance')
    ).nativeElement;
    expect(balanceElement.textContent).toContain('Balance: 1000 coins');
  });

  it('should display reels when not spinning', () => {
    component.loading = false;
    component.spinning = false;
    component.rolls = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    fixture.detectChanges();
    const reels = fixture.debugElement.queryAll(By.css('.reel'));
    expect(reels.length).toBe(3);
  });

  it('should display spinning reels when spinning is true', () => {
    component.loading = false;
    component.spinning = true;
    component.spinningRolls = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
    ];
    fixture.detectChanges();
    const spinningReels = fixture.debugElement.queryAll(
      By.css('.reel.spinning')
    );
    expect(spinningReels.length).toBe(3);
  });

  it('should display bet buttons and trigger placeBet on click', () => {
    component.loading = false;
    spyOn(component, 'placeBet');
    component.bets = [10, 20, 50];
    fixture.detectChanges();
    const betButtons = fixture.debugElement.queryAll(By.css('.bets button'));
    expect(betButtons.length).toBe(3);

    betButtons[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.placeBet).toHaveBeenCalledWith(10);
  });

  it('should display win message when winAmount is set', () => {
    component.loading = false;
    component.winAmount = 100;
    fixture.detectChanges();
    const winMessage = fixture.debugElement.query(
      By.css('.win-message h3')
    ).nativeElement;
    expect(winMessage.textContent).toContain('You won 100 coins!');
  });

  it('should display error message when error is set', () => {
    component.loading = false;
    component.error = 'Insufficient balance';
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.query(
      By.css('.error-message h3')
    ).nativeElement;
    expect(errorMessage.textContent).toContain('Insufficient balance');
  });
});
