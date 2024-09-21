import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SlotMachineComponent } from './components/slot-machine/slot-machine.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, SlotMachineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header with logo', () => {
    const logoElement = fixture.debugElement.query(
      By.css('.logo')
    ).nativeElement;
    expect(logoElement.textContent).toContain('Lucky Click');
  });

  it('should include the SlotMachineComponent', () => {
    const slotMachineElement = fixture.debugElement.query(
      By.directive(SlotMachineComponent)
    );
    expect(slotMachineElement).toBeTruthy();
  });
});
