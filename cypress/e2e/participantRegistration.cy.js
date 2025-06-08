describe('Participant Registration Form - E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/formulario/participante');
  });

  it('renders all required sections and fields', () => {
    cy.contains('Formulario de Registro').should('be.visible');
    cy.contains('Datos del Participante').should('be.visible');
    cy.get('input[placeholder="Nombre(s)"]').should('have.length', 2); // participante y tutor
    cy.get('input[placeholder="Apellido Paterno"]').should('have.length', 2);
    cy.get('input[placeholder="Apellido Materno"]').should('have.length', 2);
    cy.get('input[placeholder="correo1@ejemplo.com"]').should('have.length', 2);
    cy.get('input[placeholder="+522221234567"]').should('be.visible');
    cy.contains('Grado*').should('be.visible');
    cy.contains('Escolaridad*').should('be.visible');
    cy.contains('Datos del Tutor').should('be.visible');
    cy.contains('Permiso de Participación').should('be.visible');
    cy.contains('Descargar Convocatoria').should('be.visible');
    cy.get('input[type="file"]').should('have.length', 1);
    cy.contains('Selección de Grupo').should('be.visible');
    cy.contains('Aviso de Privacidad').should('be.visible');
    cy.get('input[type="checkbox"]').should('exist');
    cy.contains('Enviar Registro').should('be.visible');
  });

  it('shows validation errors when required fields are missing', () => {
    cy.contains('Enviar Registro').click();
    cy.contains('El nombre es obligatorio').should('be.visible');
    cy.contains('El apellido paterno es obligatorio').should('be.visible');
    cy.contains('El correo electrónico debe ser válido').should('be.visible');
    cy.contains('El grado es obligatorio').should('be.visible');
    cy.contains('La escolaridad es obligatoria').should('be.visible');
    cy.contains('El archivo de participación es obligatorio').should('be.visible');
    cy.contains('El nombre del tutor es obligatorio').should('be.visible');
    cy.contains('El apellido paterno del tutor es obligatorio').should('be.visible');
    cy.contains('El correo del tutor debe ser válido').should('be.visible');
    cy.contains('El celular del tutor es obligatorio').should('be.visible');
    cy.contains('Debes aceptar el aviso de privacidad').should('be.visible');
  });

  it('shows file name after PDF upload', () => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'permiso.pdf',
      mimeType: 'application/pdf',
    });
    cy.contains('Archivo seleccionado: permiso.pdf').should('be.visible');
  });

  it('shows error if non-PDF file is uploaded', () => {
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('dummy jpg'),
      fileName: 'foto.jpg',
      mimeType: 'image/jpeg',
    });
    cy.contains('El archivo debe ser un PDF').should('be.visible');
  });

  it('submits the form successfully (Double)', () => {
    cy.intercept('POST', '/api/participants', {
      statusCode: 201,
      body: { message: 'Participante registrado exitosamente' },
    }).as('registerParticipant');

    // Participante
    cy.get('input[placeholder="Nombre(s)"]').first().type('Juan');
    cy.get('input[placeholder="Apellido Paterno"]').first().type('Pérez');
    cy.get('input[placeholder="Apellido Materno"]').first().type('García');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('juan@example.com');
    cy.get('div:contains("Grado*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('2º').click();
    cy.get('div:contains("Escolaridad*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Secundaria').click();

    // Tutor
    cy.get('input[placeholder="Nombre(s)"]').eq(1).type('Ana');
    cy.get('input[placeholder="Apellido Paterno"]').eq(1).type('López');
    cy.get('input[placeholder="Apellido Materno"]').eq(1).type('Martínez');
    cy.get('input[placeholder="correo1@ejemplo.com"]').eq(1).type('ana@example.com');
    cy.get('input[placeholder="+522221234567"]').type('+522221234567');

    // Permiso PDF
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'permiso.pdf',
      mimeType: 'application/pdf',
    });

    // Selección de grupo (elige el primero de la tabla si existe)
    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.contains(/Seleccionar|Elegir|Select/i).click({ force: true });
      });

    // Aviso de privacidad
    cy.get('input[type="checkbox"]').check({ force: true });

    // Submit
    cy.contains('Enviar Registro').click();

    cy.contains('Participante registrado exitosamente').should('be.visible');
    cy.wait('@registerParticipant');
  });

  it('shows backend validation error (Double)', () => {
    cy.intercept('POST', '/api/participants', {
      statusCode: 422,
      body: {
        message: 'Error de validación',
        errors: [{ msg: 'El correo electrónico debe ser válido' }],
      },
    }).as('registerParticipant');

    // Participante
    cy.get('input[placeholder="Nombre(s)"]').first().type('Juan');
    cy.get('input[placeholder="Apellido Paterno"]').first().type('Pérez');
    cy.get('input[placeholder="correo1@ejemplo.com"]').first().type('no-email');
    cy.get('div:contains("Grado*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('2º').click();
    cy.get('div:contains("Escolaridad*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Secundaria').click();

    // Tutor
    cy.get('input[placeholder="Nombre(s)"]').eq(1).type('Ana');
    cy.get('input[placeholder="Apellido Paterno"]').eq(1).type('López');
    cy.get('input[placeholder="correo1@ejemplo.com"]').eq(1).type('ana@example.com');
    cy.get('input[placeholder="+522221234567"]').type('+522221234567');

    // Permiso PDF
    cy.get('input[type="file"]').selectFile({
      contents: Cypress.Buffer.from('dummy pdf'),
      fileName: 'permiso.pdf',
      mimeType: 'application/pdf',
    });

    // Aviso de privacidad
    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('Enviar Registro').click();

    cy.contains('El correo electrónico debe ser válido').should('be.visible');
    cy.wait('@registerParticipant');
  });
});
