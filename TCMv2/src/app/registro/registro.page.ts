import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}

  guardarDatos() {
    
    // Validador de nombre
    if (this.nombre.length > 25) {
      alert('El nombre no puede tener mas de 25 caracteres');
      return;
    }

    // Verificar que el apellido tenga máximo 25 caracteres
    if (this.apellido.length > 25) {
      alert('El apellido no puede tener más de 25 caracteres');
      return;
    }

    // Verificar que el nombre de usuario tenga entre 5 y 15 caracteres
    if (this.username.length < 5 || this.username.length > 15) {
      alert('El nombre de usuario debe tener entre 5 y 15 caracteres');
      return;
    }

    // Verificar que el correo electrónico tenga máximo 25 caracteres y sea del dominio @duocuc.cl
    const emailRegex = /^[a-zA-Z0-9._%+-]+@duocuc\.cl$/;
    if (!emailRegex.test(this.email)) {
      alert('El correo electrónico debe ser del dominio @duocuc.cl');
      return;
    }

     // Verificar que la contraseña tenga al menos 8 caracteres
     if (this.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Recuperar el arreglo de usuarios existente o inicializarlo vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verifica si ya existe un usuario con el mismo username o email
    if (usuarios.some((u: any) => u.username === this.username || u.email === this.email)) {
      alert('El nombre de usuario o correo electrónico ya está registrado');
      return;
    }


    // Crear un nuevo usuario
    const nuevoUsuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Agregar el nuevo usuario al arreglo
    usuarios.push(nuevoUsuario);

    // Guardar el arreglo actualizado en el localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Usuario registrado exitosamente');

    this.router.navigate(['/home']);

    // Limpiar los campos del formulario
    this.nombre = '';
    this.apellido = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
