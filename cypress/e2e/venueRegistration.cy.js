describe('Venue Registration E2E', () => {
    beforeEach(() => {
      // Log in as an admin user to get a token (adjust based on your auth flow)
      cy.request('POST', 'http://localhost:3000/api/auth/login', {
        username: 'admin',
        password: 'admin_password',
      }).then((response) => {
        window.localStorage.setItem('token', response.body.token);
      });
  
      // Visit the form page
      cy.visit('http://localhost:3000/venue-registration'); // Adjust URL as needed
    });
  
    it('should register a venue successfully', () => {
      // Fill in the form
      cy.get('input[placeholder="Edna"]').type('Edna');
      cy.get('input[placeholder="Moda"]').type('Moda');
      cy.get('input[placeholder="ednamoda@disney.com"]').type('edna@example.com');
      cy.get('input[placeholder="+52 222 123 4567"]').type('+52 222 123 4567');
      cy.get('input[placeholder="edna_moda"]').type('edna_moda');
      cy.get('input[placeholder="********"]').eq(0).type('Password123!');
      cy.get('input[placeholder="********"]').eq(1).type('Password123!');
      cy.get('input[placeholder="Instituto Oriente"]').type('Instituto Oriente');
      cy.get('input[placeholder="P. Sherman Calle Wallaby 42 Sidney"]').type('123 Main St');
  
      // Upload participation file
      cy.get('input[type="file"]').eq(1).attachFile({
        filePath: 'test.pdf', // Create a small test.pdf file in cypress/fixtures
        mimeType: 'application/pdf',
      });
  
      // Check privacy notice
      cy.get('input[type="checkbox"]').check();
  
      // Submit the form
      cy.contains('Enviar Registro').click();
  
      // Verify success message
      cy.contains('Venue registrado exitosamente').should('be.visible');
  
      // Verify database (optional, requires a custom Cypress task)
      cy.task('queryDatabase', 'SELECT * FROM venues WHERE name = "Instituto Oriente"').then((result) => {
        expect(result[0].name).to.equal('Instituto Oriente');
        expect(result[0].status).to.equal('Pendiente');
      });
    });
  });