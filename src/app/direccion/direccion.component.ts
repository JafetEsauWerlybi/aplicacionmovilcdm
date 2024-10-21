import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/interface/pedidos';
import { UserData } from 'src/app/interface/userData';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.scss'],
})
export class DireccionComponent implements OnInit {
  direcciones: Direccion[] = [];
  userData!: UserData;
  idUsuario: number = 0;

  constructor(private perfilService: PerfilService) {}

  async ngOnInit() {
    await this.traerDatosUsuario();
  }

  async traerDatosUsuario() {
    try {
      this.userData = await this.perfilService.obtenerDatosUsuario();
      this.idUsuario = this.userData.idUsuario;
      console.log('Usuario obtenido:', this.userData);
      await this.getDirecciones(); // Llama a getDirecciones solo cuando se obtiene el usuario
    } catch (error) {
      console.error('Error al obtener datos de usuario:', error);
      setTimeout(() => this.traerDatosUsuario(), 2000); // Vuelve a intentar después de 2 segundos si falla
    }
  }

  async getDirecciones() {
    if (this.idUsuario) {
      console.log('Obteniendo direcciones para el usuario con ID:', this.idUsuario);
      this.perfilService.traerDirecciones(this.idUsuario).subscribe({
        next: (direcciones) => {
          if (direcciones && direcciones.length > 0) {
            this.direcciones = direcciones.slice(-1); // Obtén la última dirección
            console.log('Direcciones obtenidas:', this.direcciones);
          } else {
            console.warn('No hay direcciones disponibles para mostrar.');
            this.direcciones = [];
          }
        },
        error: (error) => {
          console.error('Error al obtener direcciones:', error);
          setTimeout(() => this.getDirecciones(), 2000); // Reintentar después de 2 segundos si falla
        },
      });
    } else {
      console.warn('ID de usuario no disponible. Reintentando...');
      setTimeout(() => this.traerDatosUsuario(), 2000); // Reintentar obtener el usuario después de 2 segundos si no está disponible
    }
  }
}
