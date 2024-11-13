describe('Tab2Page - Pruebas de la página de productos', () => {
  const setUser = () => {
    cy.window().then((win) => {
      const userData = {
        idUsuario: 20,
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
    });
  };

  beforeEach(() => {
    cy.visit('/home/tabs/tab2')
    cy.viewport('iphone-x');
    setUser();
    // cy.viewport('iphone-x');
    // cy.visit('/'); // Carga el splash screen inicial
    
    // // Espera hasta que la URL incluya '/home' usando `cy.then()` para manejar la espera
    // cy.then(() => {
    //   cy.url().then((url) => {
    //     if (!url.includes('/home')) {
    //       cy.wait(500);
    //       cy.reload();
    //     }
    //   });
    // });
    
    // // Selecciona y hace clic en el botón que lleva a `tabs2`
    // cy.get('ion-tab-button[tab="tab2"]', { timeout: 10000 }).should('be.visible').click();
    
    // // Asegura que hemos navegado a `tabs2` y que el componente está visible
    // cy.get('app-tab2', { timeout: 10000 }).should('be.visible').then(() => {
    //   setUser(); // Configura el usuario de prueba
    //   cy.wait(500); // Espera si es necesario para que el componente se actualice
    // });
  });

  it('Debería cargar los productos en la página', () => {
    cy.contains('Platillo', { timeout: 10000 })
      .should('be.visible')
      .scrollIntoView()
      .should('be.visible');
    cy.log('Productos cargados correctamente.');
  });

  it('Debería abrir el modal de detalles del producto y permitir agregar al carrito', () => {
    // Selecciona el primer `div` con la clase `.aspect-h-1` y hace clic en él
    cy.get('.aspect-h-1.aspect-w-1', { timeout: 10000 })
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // Verifica si el modal se abrió correctamente
    cy.get('ion-modal', { timeout: 10000 }).should('be.visible');

    // Clic en el botón de agregar al carrito dentro del modal
    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.log('Modal de detalles del producto abierto correctamente.');
  });

  it('Debería de mostrar idUsuario', () => {
    cy.contains('Jafet Esaú', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible');
    cy.log('Usuario parseado correctamente.');
  });

  it('Debería de agregar idUsuario', () => {
    // Encuentra la primera tarjeta de producto y haz clic en ella
    cy.get('.aspect-h-1.aspect-w-1', { timeout: 10000 })
      .first()
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    cy.get('ion-modal', { timeout: 10000 }).should('be.visible');

    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({ force: true });

    // Verifica que el Toast con el mensaje "Se agrego al carrito" esté visible

    cy.log('Modal de detalles del producto abierto correctamente.');
  });
});
