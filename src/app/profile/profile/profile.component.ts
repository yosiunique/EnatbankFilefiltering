import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector:'app-profile',
  imports: [
    MatIconModule,
    MatCardModule,

  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user:any={fullName:'yoseph',branch:'Etege'};
logout() {
throw new Error('Method not implemented.');
}



}
