describe('Tab2Page - Pruebas de la página de productos', () => {
   
  const setUser = () => {
    cy.visit('/home/tabs/tab2').then((win) => {
      const userData = {
        idUsuario: 0,
        Nombre: 'Jafet Esaú',
        ApellidoPaterno: 'Guzmán',
        ApellidoMaterno: 'Martínez',
        Correo: '20211041@uthh.edu.mx',
        Telefono: '7711425326',
        Rol: 1,
        EstadoCuenta: 'Activo',
        Token: 'mockToken123',
        Icono: 'https://example.com/icon.png',
      };
  
      const angular = (win as any).ng;
      const appComponent = angular.getComponent(win.document.querySelector('app-tab2'));
      appComponent.setUserDataForTesting(userData);
  
      cy.wait(500);
    });
  };
    beforeEach(() => {
      cy.viewport('iphone-x');
      setUser();
      // o cualquier otro tamaño de dispositivo móvil
    });
  
    it('Debería cargar los productos en la página', () => {
      cy.contains('Platillo', { timeout: 10000 }).should('be.visible');
      console.log('Productos cargados correctamente.');
    });
    
  });
  