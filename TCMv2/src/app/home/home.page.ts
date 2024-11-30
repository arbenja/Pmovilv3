import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auths/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const isLoggedIn = this.authService.login(this.username, this.password);

    if (isLoggedIn) {
      this.router.navigate(['/inicio']);
      // Redirigir al usuario a la página principal
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  }

}
