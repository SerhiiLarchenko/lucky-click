import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlotMachineComponent } from './components/slot-machine/slot-machine.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlotMachineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lucky-click';
}
