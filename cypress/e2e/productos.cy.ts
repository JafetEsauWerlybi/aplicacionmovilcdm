describe('Tab2Page - Pruebas de la página de productos', () => {
    beforeEach(() => {
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
  
        // Espera a que Angular esté cargado y luego llama al método de configuración del usuario
        const angular = (win as any).ng;
        const appComponent = angular.getComponent(win.document.querySelector('app-tab2'));
        appComponent.setUserDataForTesting(userData);
      });
    });
  
    it('Debería cargar los productos en la página', () => {
      cy.contains('Fresh Tomato', { timeout: 10000 }).should('be.visible');
      console.log('Productos cargados correctamente.');
    });
  
    it('Debería abrir el modal de detalles del producto y permitir agregar al carrito', () => {
        cy.get('ion-button#open-product-modal', { timeout: 10000 })
          .should('exist')
          .first()
          .scrollIntoView() // Desplázate hacia el botón antes de hacer clic
          .click({ force: true });
      
        cy.get('ion-modal', { timeout: 10000 })
          .should('be.visible'); // Verifica que el modal esté visible
      
        cy.contains('Agregar al carrito', { timeout: 10000 })
          .scrollIntoView() // Desplázate hacia el texto "Agregar al carrito"
          .should('be.visible') // Verifica que el texto esté visible
          .click(); // Realiza el clic si es necesario
      
        console.log('Modal de detalles del producto abierto correctamente.');
      });
      

    it('Debería de mostrar idUsuario', () => {
        cy.contains('Jafet Esaú ', { timeout: 10000 }).should('be.visible');
        console.log('Usuario parceado correctamente.');
      });

      it('Debería de agregar idUsuario', () => {
        // Desplázate hacia el botón de "Agregar al carrito" y haz clic
        cy.get('ion-button#open-product-modal', { timeout: 10000 })
          .should('exist')
          .first()
          .scrollIntoView()
          .click({ force: true });
      
        cy.get('ion-modal', { timeout: 10000 }).should('be.visible');
      
        // Desplázate hacia el ícono del carrito antes de hacer clic en el botón
        cy.contains('Agregar al carrito', { timeout: 10000 })
        .scrollIntoView() // Desplázate hacia el texto "Agregar al carrito"
        .should('be.visible') // Verifica que el texto esté visible
        .click(); // Realiza el clic si es necesario
      
        // Espera un poco para que la alerta se muestre
        cy.wait(1000); // Ajusta el tiempo de espera si es necesario
      
        // Verifica que la alerta que contiene "Producto agregado" se muestre
        cy.get('ion-alert').should('exist'); // Verifica que la alerta exista
        cy.contains('Producto agregado').should('be.visible'); // Verifica que el mensaje sea visible
      
        // Opcionalmente, haz clic en el botón "Aceptar" de la alerta para cerrarla
        cy.get('ion-alert button')
          .contains('Aceptar')
          .click();
      });
      
      
  });
  