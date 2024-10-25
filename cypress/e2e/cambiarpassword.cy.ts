describe('CambiarpasswordPage', () => {
  beforeEach(() => {
    cy.visit('/cambiarpassword'); // Esto visitará http://localhost:3000/cambiarpassword
  });
  
    it('should display the change password page', () => {
      cy.contains('Cambia tu contraseña').should('be.visible');
      console.log('La página de cambio de contraseña cargó correctamente.');
    });
  
    it('should show an error when passwords do not meet the criteria', () => {
      cy.get('input[name="password"]').type('123');
      cy.get('input[name="passwordVerified"]').type('123');
      cy.get('button[type="submit"]').click();
  
      cy.contains('No contiene 8 caracteres, o no contiene algun caracter especial').should('be.visible');
      console.log('Mensaje de error mostrado correctamente cuando la contraseña es inválida.');
    });
    it('should change the password when criteria are met', () => {
      cy.get('input[name="password"]').type('ValidPass123!');
      cy.get('input[name="passwordVerified"]').type('ValidPass123!');
      cy.get('button[type="submit"]').click();
    
      cy.contains('Contraseña cambiada exitosamente', { timeout: 10000 }).should('be.visible');
      console.log('Contraseña cambiada con éxito cuando la contraseña es válida.');
    });
    
  
    it('should toggle password visibility', () => {
      cy.get('button[name="togglePasswordVisibility"]').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'text'); 
      console.log('La visibilidad de la contraseña se activó.');
  
      cy.get('button[name="togglePasswordVisibility"]').click();
      cy.get('input[name="password"]').should('have.attr', 'type', 'password'); // Verificar que la contraseña no sea visible
      console.log('La visibilidad de la contraseña se desactivó.');
    });
  });
  