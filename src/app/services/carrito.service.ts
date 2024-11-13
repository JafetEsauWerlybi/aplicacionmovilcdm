import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carrito } from '../interface/Carrito';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  carrito: Carrito[] = [];  // Asegúrate de que esta propiedad sea un array
  obtenerCarritoUrl = environment.apiEndpointCarrito.obtenerCarrito;
  quitarDelCarritoUrl = environment.apiEndpointCarrito.quitardelCarrito;
  agregarAlCarritoUrl = environment.apiEndpointCarrito.agregarAlCarrito;
  quitarTodoCarrito = environment.apiEndpointCarrito.quitarTodosdelCarrito;
  constructor(private http: HttpClient) { }

  
  getCarrito(idUsuario:number){
    return this.http.get<Carrito[]>(this.obtenerCarritoUrl+idUsuario);
  }

  async quitarDelCarrito(idUsuario: number, idProducto: number, idCarrito: number): Promise<boolean> {
    const formData = new FormData();
    formData.append('idUsuario', idUsuario.toString());
    formData.append('idProducto', idProducto.toString());
    formData.append('idCarritoProductos', idCarrito.toString());
  
    // console.log('Datos enviados:', {
    //   idUsuario,
    //   idProducto,
    //   idCarrito,
    // });
  
    return fetch(`${this.quitarDelCarritoUrl}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log('Respuesta del servidor:', result);
        return result === 'Exito';
      })
      .catch((error) => {
        //console.error('Error al realizar la solicitud:', error);
        return false;
      });
  }
  

  async agregarAlCarrito(idUsuario: number, idProducto: number): Promise<boolean> {
    const formData = new FormData();
    formData.append('idUsuario', idUsuario.toString());
    formData.append('idProducto', idProducto.toString());
  
    return fetch(`${this.agregarAlCarritoUrl}`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log('Respuesta del servidor:', result);
        return result === 'Exito';
      })
      .catch((error) => {
        //console.error('Error al realizar la solicitud:', error);
        return false;
      });
  }
  
  async elimarTodosProductos(idUsuario:number,idProducto:number, idCarritoProductos: number): Promise<boolean>{
    const formData = new FormData();
    formData.append('idUsuario', idUsuario.toString());
    formData.append('idProducto', idProducto.toString());
    formData.append('idCarritoProductos', idCarritoProductos.toString());

     return this.http.post(this.quitarTodoCarrito, formData)
      .toPromise()
      .then((result: any) => {
        if (result === "Exito") {
          return true;
        }else{
          return false;
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        return false;
      });
  }


 
}
