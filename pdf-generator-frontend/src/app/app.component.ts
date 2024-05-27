import { Component } from '@angular/core';
import { User } from './models/users.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdf-generator-frontend';
  editUser !: User | null
}
