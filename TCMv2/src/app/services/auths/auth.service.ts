import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false; // Simula si el usuario está autenticado
  private currentUser: any = null; // Simula el usuario actualmente autenticado
  login(username: string, password: string): boolean {
  //recuperar los datos desde local storage
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

  const usuario = usuarios.find((u: any) => u.username === username && u.password === password);

  if(usuario) {
    this.isAuthenticated = true;
    this.currentUser = usuario;

    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    return true;
  }
  return false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }



  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;

    localStorage.removeItem('usuarioActual');
  }
}
