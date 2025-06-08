describe('Venue Registration Form - E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/formulario/sede');
  });

  it('renders all required sections and fields', () => {
    cy.contains('Formulario de Registro').should('be.visible');
    cy.contains('Datos Coordinadora de Sede').should('be.visible');
    cy.get('input[placeholder="Nombre(s)"]').should('be.visible');
    cy.get('input[placeholder="Apellido Paterno"]').should('be.visible');
    cy.get('input[placeholder="Apellido Materno"]').should('be.visible');
    cy.get('input[placeholder="correo1@ejemplo.com"]').should('be.visible');
    cy.get('input[placeholder="+522221234567"]').should('be.visible');
    cy.get('input[placeholder="Us3r_n4me"]').should('be.visible');
    cy.get('input[placeholder="********"]').should('have.length', 2); // password & confirm
    cy.contains('Mostrar Contraseña').should('exist');
    cy.contains('Datos Coordinadora Asociada').should('be.visible');
    cy.contains('Datos Coordinadora de Informes (Staff)').should('be.visible');
    cy.contains('Datos Coordinadora de Informes (Participantes)').should('be.visible');
    cy.get('input[placeholder="ITESM Puebla"]').should('be.visible');
    cy.contains('País*').should('be.visible');
    cy.contains('Estado/Provincia*').should('be.visible');
    cy.get('input[placeholder="Dirección 123"]').should('be.visible');
    cy.contains('Convocatoria SEDE').should('be.visible');
    cy.contains('Descargar Convocatoria').should('be.visible');
    cy.get('input[type="file"]').should('have.length', 3); // perfil, logo, convocatoria
    cy.contains('Aviso de Privacidad').should('be.visible');
    cy.get('input[type="checkbox"]').should('exist');
    cy.contains('Enviar Registro').should('be.visible');
  });

  it('shows validation errors when required fields are missing', () => {
    cy.contains('Enviar Registro').click();
    cy.contains('El nombre de la SEDE es obligatorio').should('be.visible');
    cy.contains('El país de la SEDE es obligatorio').should('be.visible');
    cy.contains('El estado/provincia de la SEDE es obligatorio').should('be.visible');
    cy.contains('La dirección de la SEDE es obligatoria').should('be.visible');
    cy.contains('El archivo de participación es obligatorio').should('be.visible');
    cy.contains('El nombre de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El apellido paterno de la Coordinadora de Sede es obligatorio').should(
      'be.visible',
    );
    cy.contains('El correo electrónico de la Coordinadora de Sede es obligatorio').should(
      'be.visible',
    );
    cy.contains('El celular de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El sexo de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('El nombre de usuario de la Coordinadora de Sede es obligatorio').should(
      'be.visible',
    );
    cy.contains('La contraseña de la Coordinadora de Sede es obligatorio').should('be.visible');
    cy.contains('Debes aceptar el aviso de privacidad').should('be.visible');
  });

  it('submits the form successfully (Double)', () => {
    cy.intercept('POST', '/api/venues', {
      statusCode: 201,
      body: { message: 'Venue creado exitosamente', files: {} },
    }).as('createVenue');

    // General Coordinator
    cy.get('input[placeholder="Nombre(s)"]').first().type('Edna');
    cy.get('input[placeholder="Apellido Paterno"]').first().type('Moda');
    cy.get('input[placeholder="Apellido Materno"]').first().type('Lorena');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('edna@example.com');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('div:contains("Sexo*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Femenino').click();
    cy.get('input[placeholder="Us3r_n4me"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Venue
    cy.get('input[placeholder="ITESM Puebla"]').type('Instituto Oriente');
    cy.get('div:contains("País*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Mexico').click();
    cy.get('div:contains("Estado/Provincia*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Puebla').click();
    cy.get('input[placeholder="Dirección 123"]').type('123 Main St');

    // Participation file (convocatoria)
    cy.get('input[type="file"]')
      .eq(2)
      .selectFile({
        contents: Cypress.Buffer.from('dummy pdf'),
        fileName: 'test.pdf',
        mimeType: 'application/pdf',
      });

    // Privacy notice
    cy.get('input[type="checkbox"]').check();

    // Submit
    cy.contains('Enviar Registro').click();

    // Success toast/modal
    cy.contains('Venue creado exitosamente').should('be.visible');
    cy.wait('@createVenue');
  });

  it('shows backend validation error (Double)', () => {
    cy.intercept('POST', '/api/venues', {
      statusCode: 422,
      body: {
        message: 'Error de validación',
        errors: [{ msg: 'El correo electrónico de la Coordinadora de Sede debe ser válido' }],
      },
    }).as('createVenue');

    // General Coordinator
    cy.get('input[placeholder="Nombre(s)"]').first().type('Edna');
    cy.get('input[placeholder="Apellido Paterno"]').first().type('Moda');
    cy.get('input[placeholder="Apellido Materno"]').first().type('Lorena');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('invalid-email');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('div:contains("Sexo*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Femenino').click();
    cy.get('input[placeholder="Us3r_n4me"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password123!');

    // Venue
    cy.get('input[placeholder="ITESM Puebla"]').type('Instituto Oriente');
    cy.get('div:contains("País*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Mexico').click();
    cy.get('div:contains("Estado/Provincia*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Puebla').click();
    cy.get('input[placeholder="Dirección 123"]').type('123 Main St');

    // Participation file
    cy.get('input[type="file"]')
      .eq(2)
      .selectFile({
        contents: Cypress.Buffer.from('dummy pdf'),
        fileName: 'test.pdf',
        mimeType: 'application/pdf',
      });

    cy.get('input[type="checkbox"]').check();
    cy.contains('Enviar Registro').click();

    cy.contains('El correo electrónico de la Coordinadora de Sede debe ser válido').should(
      'be.visible',
    );
    cy.wait('@createVenue');
  });

  it('shows password mismatch error (Mutation)', () => {
    cy.get('input[placeholder="Nombre(s)"]').first().type('Edna');
    cy.get('input[placeholder="Apellido Paterno"]').first().type('Moda');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('edna@example.com');
    cy.get('input[placeholder="+522221234567"]').first().type('+522221234567');
    cy.get('div:contains("Sexo*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Femenino').click();
    cy.get('input[placeholder="Us3r_n4me"]').type('edna_moda');
    cy.get('input[placeholder="********"]').eq(0).type('Password123!');
    cy.get('input[placeholder="********"]').eq(1).type('Password1234!');
    cy.contains('Enviar Registro').click();
    cy.contains('Las contraseñas no coinciden').should('be.visible');
  });

  it('shows selected file names after upload', () => {
    cy.get('input[type="file"]')
      .eq(0)
      .selectFile({
        contents: Cypress.Buffer.from('dummy jpg'),
        fileName: 'profile.jpg',
        mimeType: 'image/jpeg',
      });
    cy.contains('Archivo seleccionado: profile.jpg').should('be.visible');

    cy.get('input[type="file"]')
      .eq(1)
      .selectFile({
        contents: Cypress.Buffer.from('dummy jpg'),
        fileName: 'logo.jpg',
        mimeType: 'image/jpeg',
      });
    cy.contains('Archivo seleccionado: logo.jpg').should('be.visible');

    cy.get('input[type="file"]')
      .eq(2)
      .selectFile({
        contents: Cypress.Buffer.from('dummy pdf'),
        fileName: 'convocatoria.pdf',
        mimeType: 'application/pdf',
      });
    cy.contains('Archivo seleccionado: convocatoria.pdf').should('be.visible');
  });
});
