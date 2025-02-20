import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FilefilteringComponent } from "./kyc/filefiltering/filefiltering.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, FilefilteringComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fileserching';
}
