import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PremierComposant } from './premier-composant/premier-composant';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PremierComposant],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'premiere_ebauche';
}
