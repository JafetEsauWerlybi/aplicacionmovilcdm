describe('Tab2Page - Pruebas de la página de productos', () => {
  const setUser = () => {
    cy.visit('/home/tabs/tab2').then((win) => {
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
  
      cy.wait(500);
    });
  };

  beforeEach(() => {
    cy.viewport('iphone-x'); // o cualquier otro tamaño de dispositivo móvil
    setUser();
  });

  it('Debería cargar los productos en la página', () => {
    cy.contains('Fresh Tomato', { timeout: 10000 })
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible');
    console.log('Productos cargados correctamente.');
  });

  it('Debería abrir el modal de detalles del producto y permitir agregar al carrito', () => {
    setUser();
    cy.wait(1000);
    cy.get('ion-button#open-product-modal', { timeout: 10000 })
      .should('exist')
      .first()
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible')
      .click({ force: true });

    cy.get('ion-modal', { timeout: 10000 }).should('be.visible');

    cy.wait(1000);
    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible')
      .click({ force: true });

    console.log('Modal de detalles del producto abierto correctamente.');
  });

  it('Debería de mostrar idUsuario', () => {
    setUser();
    cy.wait(1000);
    cy.contains('Jafet Esaú', { timeout: 10000 })
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible');
    console.log('Usuario parseado correctamente.');
  });

  it('Debería de agregar idUsuario', () => {
    setUser();
    cy.wait(1000);
    cy.get('ion-button#open-product-modal', { timeout: 10000 })
      .should('exist')
      .first()
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible')
      .click({ force: true });

    cy.get('ion-modal', { timeout: 10000 }).should('be.visible');

    cy.wait(1000);
    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(1000);

    cy.get('ion-alert').should('exist');
    cy.contains('Producto agregado')
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .should('be.visible');

    cy.get('ion-alert button')
      .contains('Aceptar')
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 }, easing: 'linear', duration: 500 })
      .click({ force: true });
  });
});
