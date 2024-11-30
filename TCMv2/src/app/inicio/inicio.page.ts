import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auths/auth.service';
import { CanComponentDeactivate } from '../guards/candeactivate.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, CanComponentDeactivate {
  posts: any[] = [];
  username: string = '';
  nombre: string = '';
  apellido: string = '';

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Obtiene el estado de navegación
    const data = history.state;
    if (data && data.username) {
      this.username = data.username; // Asigna el valor de username
    }

    //Recupera el usuario actual de local storage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || 'null');

    if(usuarioActual) {
      this.nombre = usuarioActual.nombre;
      this.apellido = usuarioActual.apellido;
    } else {
      console.error('No se encontró un usuario autenticado')
    }

    // Carga de publicaciones
    this.apiService.getPosts().subscribe((data: any) => {
      this.posts = data;
    });
  }

  editPost(id: number) {
    this.navCtrl.navigateForward('/edit', {
      state: {
        postId: id,
      },
    });
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      console.log('Post Eliminado: ', id);
    });
  }

  canDeactivate(): boolean {
    return confirm( '¿Estás seguro que deseas cerrar sesión?')
  }
//confirma con el usuario si deseas salir
  logout() {
    if (this.canDeactivate()) {
      this.authService.logout();
      this.router.navigate(['/home']);
      console.log('Sesion cerrada')
    }
  }


}
