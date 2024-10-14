// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoints: {
    loginUrl: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/Login',
    traerDatosUsuario: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerUsuario?Correo=',
    verificarCorreo: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/VerificarCorreo',
    obtenerDireccion: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerDirecciones?UsuarioID=',
    actualizarToken: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ActualizarToken',
    verificarToken: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/VerificarToken',
    cambiarPassword: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/RecuperarContrasena',
  },
  apiEndpointsProductos:{
    traerProductos: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductos',
    traerProductoPorId: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductoPorID',
  },
  apiEndpointCarrito:{
    obtenerCarrito: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerCarritoPorUsuario?idUsuario=',
    agregarAlCarrito: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/AgregarProductosCarrito',
    quitardelCarrito: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/QuitarProductosCarrito',
  },
  apiEndpointsPedidos:{
    agregarPedido: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/AgregarPedido',
    obtenerPedidos: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerPedidos?UsuarioID=',
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
