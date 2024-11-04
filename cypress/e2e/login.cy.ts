describe("Prueba E2E para el flujo de login", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      if (err.message.includes("Cannot read properties of null")) {
        return false;
      }
      return true;
    });
  
    it("Debe permitir que un usuario inicie sesión con credenciales válidas", () => {
      cy.visit("/login");
  
      cy.get('input[name="email"]').type("20210671@uthh.edu.mx");
      cy.get('input[name="password"]').type("@D0lf0_2021");
        
      cy.get('button[type="submit"]').click({ force: true });
  
      cy.url({ timeout: 10000 }).should("include", "/home/tabs/tab1");
  
    });
  
    it("Debe mostrar un mensaje de error con credenciales inválidas", () => {
      cy.visit("/login");
  
      cy.get('input[name="email"]').type("20210671@uthh.edu.mx");
      cy.get('input[name="password"]').type("dfevtrert");
  
      cy.get('button[type="submit"]').click({ force: true });
  
  
      cy.contains("Los datos ingresados han sido erroneos", { timeout: 10000 }).should("be.visible");
    });

    it("Debe redirigir", () => {
        cy.visit("/login");
        cy.get('a[name="redirigir"]').click({ force: true });
    
        cy.url({ timeout: 10000 }).should("include", "/recuperar");
    
      });
  });