export const environment = {
  production: true,
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
  stripe:{
    publishableKey: 'pk_test_51Q2bhrL6Uwo5yj7nQJIPVxVbUWiz48NmkIB4rwvZkVFGZoFO9mEjngGKbeTzG1KtQCgWIiwhgjv3T4KrQDDgIUeO002GVJR4iS',
    secretKey: 'sk_test_51Q2bhrL6Uwo5yj7nX5MZoB2jI2ZDX26rikyTJEaBCql5V8qsV3lGvnnKoBcgFajYfXlVo6cSE0mglGVOeIIAHjDk00AZ2yCxD1'
  },
  api:'https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/'
};

