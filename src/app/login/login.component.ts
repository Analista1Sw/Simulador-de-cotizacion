import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule], 
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin() {
    console.log('Intentando iniciar sesión con:', this.username, this.password);
    const users = [
      { username: 'admin', password: 'admin123', role: 'admin' },
      { username: 'user', password: 'user123', role: 'user' },
    ];

    const user = users.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (user) {
      console.log('Usuario encontrado:', user);
      if (user.role === 'admin') {
        this.router.navigate(['/preAlistamiento']);
      } else if (user.role === 'user') {
        this.router.navigate(['/fidel']);
      }
    } else {
      console.log('Credenciales inválidas');
      this.errorMessage = 'Invalid username or password';
    }
  }
}