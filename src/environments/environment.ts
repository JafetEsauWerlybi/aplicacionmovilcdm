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
    traerToken: 'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerToken?Telefono=',

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
    promociones:'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerPromociones'

  },
  firebase :{
    apiKey: "AIzaSyCQrCrhzlzayUbKW9P1laJeakm6Jl0w9l0",
    authDomain: "casamariscomovil.firebaseapp.com",
    projectId: "casamariscomovil",
    storageBucket: "casamariscomovil.appspot.com",
    messagingSenderId: "1089256107726",
    appId: "1:1089256107726:web:52bb8017f46098703baa9f"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
