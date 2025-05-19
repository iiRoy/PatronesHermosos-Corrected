describe('Venue Registration E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/formulario/sede');
  });

  it('renders the form correctly', () => {
    cy.get('input[placeholder="Nombre"]').should('be.visible');
    cy.get('input[placeholder="Paterno"]').should('be.visible');
    cy.get('input[placeholder="Materno"]').should('be.visible');
    cy.get('input[placeholder="correo1@ejemplo.com"]').should('be.visible');
    cy.contains('label', 'País*').should('be.visible');
    cy.get('select').eq(1).should('contain', 'Mexico');
    cy.get('input[placeholder="ITESM Puebla"]').should('be.visible');
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
    cy.contains('label', 'Estado*').should('be.visible');
    cy.get('select').eq(2).should('contain', 'Puebla');
    cy.get('input[placeholder="San José"]').should('not.exist');
  });

  it('shows state input when Costa Rica is selected', () => {
    cy.get('select').eq(1).select('Costa Rica');
    cy.get('input[placeholder="Región"]').should('be.visible');
    cy.get('select').contains('Estado*').should('not.exist');
  });

  it('submits the form successfully with Mexico', () => {
    // Intercept API call
    cy.intercept('POST', '/api/venues', {
      statusCode: 201,
      body: { message: 'Venue creado exitosamente', files: {} },
    }).as('createVenue');

    // Fill General Coordinator
    cy.get('input[placeholder="Nombre"]').first().type('Edna');
    cy.get('input[placeholder="Paterno"]').first().type('Moda');
    cy.get('input[placeholder="Materno"]').first().type('Lorena');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('edna@example.com');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('select').first().select('Femenino');
    cy.get('input[placeholder="Us3r_n4me"]').first().type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Fill Venue
    cy.get('input[placeholder="ITESM Puebla"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Mexico');
    cy.get('select').eq(2).select('Puebla');
    cy.get('input[placeholder="Dirección 123"]').type('123 Main St');

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
    cy.get('input[placeholder="Nombre"]').first().type('Edna');
    cy.get('input[placeholder="Paterno"]').first().type('Moda');
    cy.get('input[placeholder="Materno"]').first().type('Lorena');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('edna@example.com');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('select').first().select('Femenino');
    cy.get('input[placeholder="Us3r_n4me"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Fill Venue
    cy.get('input[placeholder="ITESM Puebla"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Costa Rica');
    cy.get('input[placeholder="San José"]').type('San José');
    cy.get('input[placeholder="Dirección 123"]').type('123 Main St');

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
    cy.get('input[placeholder="Nombre"]').first().type('Edna');
    cy.get('input[placeholder="Paterno"]').first().type('Moda');
    cy.get('input[placeholder="Materno"]').first().type('Lorena');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('invalid-email');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('select').first().select('Femenino');
    cy.get('input[placeholder="Us3r_n4me"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');
    cy.get('input[placeholder="ITESM Puebla"]').type('Instituto Oriente');
    cy.get('select').eq(1).select('Mexico');
    cy.get('select').eq(2).select('Puebla');
    cy.get('input[placeholder="Dirección 123"]').type('123 Main St');

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