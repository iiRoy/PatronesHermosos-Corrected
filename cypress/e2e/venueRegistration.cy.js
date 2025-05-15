describe('Venue Registration E2E', () => {
  beforeEach(() => {
    // Mock login to set token (adjust credentials as needed)
    cy.request('POST', 'http://localhost:3000/api/auth/login', {
      username: 'admin',
      password: 'admin_password',
    }).then((response) => {
      window.localStorage.setItem('token', response.body.token);
    });

    // Visit the form page
    cy.visit('http://localhost:3000/formulario/sede');
  });

  it('renders the form correctly', () => {
    cy.contains('Formulario de Registro SEDE').should('be.visible');
    cy.get('input[placeholder="Edna"]').should('be.visible');
    cy.get('input[placeholder="ednamoda@disney.com"]').should('be.visible');
    cy.get('select').contains('País*').should('be.visible');
    cy.get('input[placeholder="Instituto Oriente"]').should('be.visible');
    cy.contains('Enviar Registro').should('be.visible');
    cy.get('input[type="file"]').should('have.length', 3); // Profile, logo, participation file
    cy.get('input[type="checkbox"]').should('be.visible');
  });

  it('shows validation errors when required fields are missing', () => {
    cy.contains('Enviar Registro').click();

    cy.contains('El nombre de la SEDE es obligatorio').should('be.visible');
    cy.contains('El país de la SEDE es obligatorio').should('be.visible');
    cy.contains('El estado/provincia de la SEDE es obligatorio').should('be.visible');
    cy.contains('La dirección de la SEDE es obligatoria').should('be.visible');
    cy.contains('El archivo de participación es obligatorio').should('be.visible');
    cy.contains('El nombre de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El apellido paterno de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El correo electrónico de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El celular de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El sexo de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El nombre de usuario de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('La contraseña de la Coordinadora de Sede es obligatoria').should('be.visible');
    cy.contains('Debes aceptar el aviso de privacidad').should('be.visible');
  });

  it('shows state dropdown when Mexico is selected', () => {
    cy.get('select').eq(1).select('Mexico');
    cy.get('select').contains('Estado*').should('be.visible');
    cy.get('input[placeholder="San José"]').should('not.exist');
  });

  it('shows state input when Costa Rica is selected', () => {
    cy.get('select').eq(1).select('Costa Rica');
    cy.get('input[placeholder="San José"]').should('be.visible');
    cy.get('select').contains('Estado*').should('not.exist');
  });

  it('submits the form successfully with Mexico', () => {
    // Intercept API call
    cy.intercept('POST', '/api/venues', {
      statusCode: 201,
      body: { message: 'Venue creado exitosamente', files: {} },
    }).as('createVenue');

    // Fill General Coordinator
    cy.get('input[placeholder="Edna"]').type('Edna');
    cy.get('input[placeholder="Moda"]').type('Moda');
    cy.get('input[placeholder="ednamoda@disney.com"]').type('edna@example.com');
    cy.get('input[placeholder="+52 222 123 4567"]').first().type('+52 222 123 4567');
    cy.get('select').first().select('Mujer');
    cy.get('input[placeholder="edna_moda"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Fill Venue
    cy.get('input[placeholder="Instituto Oriente"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Mexico');
    cy.get('select').eq(2).select('Puebla');
    cy.get('input[placeholder="P. Sherman Calle Wallaby 42 Sidney"]').type('123 Main St');

    // Upload participation file
    cy.get('input[type="file"]').eq(2).selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'test.pdf',
      mimeType: 'application/pdf',
    });

    // Check privacy notice
    cy.get('input[type="checkbox"]').check();

    // Submit
    cy.contains('Enviar Registro').click();

    // Verify success
    cy.contains('Venue creado exitosamente').should('be.visible');
    cy.wait('@createVenue').its('request.body').should('include', {
      name: 'Instituto Oriente',
      country: 'Mexico',
      state: 'Puebla',
    });

    // Verify database
    cy.task('queryDatabase', 'SELECT * FROM venues WHERE name = "Instituto Oriente"').then((result) => {
      expect(result[0].name).to.equal('Instituto Oriente');
      expect(result[0].country).to.equal('Mexico');
      expect(result[0].state).to.equal('Puebla');
      expect(result[0].status).to.equal('Pendiente');
    });
  });

  it('submits the form successfully with Costa Rica', () => {
    // Intercept API call
    cy.intercept('POST', '/api/venues', {
      statusCode: 201,
      body: { message: 'Venue creado exitosamente', files: {} },
    }).as('createVenue');

    // Fill General Coordinator
    cy.get('input[placeholder="Edna"]').type('Edna');
    cy.get('input[placeholder="Moda"]').type('Moda');
    cy.get('input[placeholder="ednamoda@disney.com"]').type('edna@example.com');
    cy.get('input[placeholder="+52 222 123 4567"]').first().type('+52 222 123 4567');
    cy.get('select').first().select('Mujer');
    cy.get('input[placeholder="edna_moda"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Fill Venue
    cy.get('input[placeholder="Instituto Oriente"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Costa Rica');
    cy.get('input[placeholder="San José"]').type('San José');
    cy.get('input[placeholder="P. Sherman Calle Wallaby 42 Sidney"]').type('123 Main St');

    // Upload participation file
    cy.get('input[type="file"]').eq(2).selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'test.pdf',
      mimeType: 'application/pdf',
    });

    // Check privacy notice
    cy.get('input[type="checkbox"]').check();

    // Submit
    cy.contains('Enviar Registro').click();

    // Verify success
    cy.contains('Venue creado exitosamente').should('be.visible');
    cy.wait('@createVenue').its('request.body').should('include', {
      name: 'Instituto Oriente',
      country: 'Costa Rica',
      state: 'San José',
    });

    // Verify database
    cy.task('queryDatabase', 'SELECT * FROM venues WHERE name = "Instituto Oriente"').then((result) => {
      expect(result[0].name).to.equal('Instituto Oriente');
      expect(result[0].country).to.equal('Costa Rica');
      expect(result[0].state).to.equal('San José');
      expect(result[0].status).to.equal('Pendiente');
    });
  });

  it('displays error messages on failed submission', () => {
    // Intercept API call with error response
    cy.intercept('POST', '/api/venues', {
      statusCode: 422,
      body: {
        message: 'Error de validación',
        errors: [{ msg: 'El correo electrónico de la Coordinadora de Sede debe ser válido' }],
      },
    }).as('createVenue');

    // Fill with invalid email
    cy.get('input[placeholder="Edna"]').type('Edna');
    cy.get('input[placeholder="Moda"]').type('Moda');
    cy.get('input[placeholder="ednamoda@disney.com"]').type('invalid-email');
    cy.get('input[placeholder="+52 222 123 4567"]').first().type('+52 222 123 4567');
    cy.get('select').first().select('Mujer');
    cy.get('input[placeholder="edna_moda"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');
    cy.get('input[placeholder="Instituto Oriente"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Mexico');
    cy.get('select').eq(2).select('Puebla');
    cy.get('input[placeholder="P. Sherman Calle Wallaby 42 Sidney"]').type('123 Main St');

    // Upload participation file
    cy.get('input[type="file"]').eq(2).selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'test.pdf',
      mimeType: 'application/pdf',
    });

    // Check privacy notice
    cy.get('input[type="checkbox"]').check();

    // Submit
    cy.contains('Enviar Registro').click();

    // Verify error
    cy.contains('El correo electrónico de la Coordinadora de Sede debe ser válido').should('be.visible');
    cy.wait('@createVenue');
  });
});