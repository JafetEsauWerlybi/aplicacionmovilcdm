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
  
      // Configura el usuario cada vez que se visita la página
      const angular = (win as any).ng;
      const appComponent = angular.getComponent(win.document.querySelector('app-tab2'));
      appComponent.setUserDataForTesting(userData);
  
      // Espera para asegurarse de que los datos se actualicen en la vista
      cy.wait(500);
    });
  };

  beforeEach(() => {
    setUser();
  });

  it('Debería cargar los productos en la página', () => {
    cy.contains('Fresh Tomato', { timeout: 10000 }).should('be.visible');
    console.log('Productos cargados correctamente.');
  });

  it('Debería abrir el modal de detalles del producto y permitir agregar al carrito', () => {
    setUser();  // Configura el usuario nuevamente
    cy.get('ion-button#open-product-modal', { timeout: 10000 })
      .should('exist')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('ion-modal', { timeout: 10000 })
      .should('be.visible');

    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click();

    console.log('Modal de detalles del producto abierto correctamente.');
  });

  it('Debería de mostrar idUsuario', () => {
    setUser();  // Configura el usuario nuevamente
    cy.contains('Jafet Esaú ', { timeout: 10000 }).should('be.visible');
    console.log('Usuario parceado correctamente.');
  });

  it('Debería de agregar idUsuario', () => {
    setUser();  // Configura el usuario nuevamente
    cy.get('ion-button#open-product-modal', { timeout: 10000 })
      .should('exist')
      .first()
      .scrollIntoView()
      .click({ force: true });

    cy.get('ion-modal', { timeout: 10000 }).should('be.visible');

    cy.contains('Agregar al carrito', { timeout: 10000 })
      .scrollIntoView()
      .should('be.visible')
      .click({force : true});

    cy.wait(1000);

    cy.get('ion-alert').should('exist');
    cy.contains('Producto agregado').should('be.visible');

    cy.get('ion-alert button')
      .contains('Aceptar')
      .click();
  });
});
