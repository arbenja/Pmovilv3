import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  guardarDatos() {
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

    // Limpiar los campos del formulario
    this.nombre = '';
    this.apellido = '';
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

}
