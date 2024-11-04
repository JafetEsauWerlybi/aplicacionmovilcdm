import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private _storage: Storage | null = null;
  private readonly storageKey = 'userData';


  constructor( private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarUsuario(userData: any) {
    await this._storage?.set('user', userData);
    console.log('Datos del usuario guardados en el storage');
  }

  async traerDatosUsuario() {
    const userData = await this._storage?.get('user');
    return userData;
  }

  async borrarDatosUsuario() {
    await this._storage?.remove('user');
    console.log('Datos del usuario eliminados del storage');
  }

  async guardarEmail(email:string){
    await this._storage?.set('email', email);
    //console.log(await this.traerEmailGuardado());
  }
  async traerEmailGuardado() {
    const email = await this._storage?.get('email');
    return email;
  }

  async borrarEmailGuardado() {
    await this._storage?.remove('email');
    //console.log('Datos del usuario eliminados del storage');
  }

  async isUserLoggedIn(): Promise<boolean> {
    if (!this._storage) {
      await this.init();
    }
    const userData = await this._storage?.get(this.storageKey);
    return !!userData; // Devuelve true si existe, false si no
  }
  
}
