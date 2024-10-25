describe('Tab2Page - Pruebas de la página de productos', () => {
   
    beforeEach(() => {
      // Visita la página después de que los datos del usuario se hayan guardado
      cy.visit('/home/tabs/tab2');
    });
  
    it('Debería cargar los productos en la página', () => {
      cy.contains('Fresh Tomato', { timeout: 10000 }).should('be.visible');
      console.log('Productos cargados correctamente.');
    });
  
    it('Debería abrir el modal de detalles del producto', () => {
      cy.get('ion-button#open-product-modal', { timeout: 10000 })
        .should('exist')
        .first()
        .scrollIntoView()
        .click();
      cy.get('ion-modal', { timeout: 10000 }).should('be.visible');
      cy.contains('Agregar al carrito').should('not.exist');
      console.log('Modal de detalles del producto abierto correctamente.');
    });
  });
  