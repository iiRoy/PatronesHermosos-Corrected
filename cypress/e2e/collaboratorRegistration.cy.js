describe('Collaborator Registration Form - E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/formulario/colaborador');
  });

  it('renders all required sections and fields', () => {
    cy.contains('Formulario de Registro').should('be.visible');
    cy.contains('Datos Personales').should('be.visible');
    cy.get('input[placeholder="Nombre(s)"]').should('be.visible');
    cy.get('input[placeholder="Apellido Paterno"]').should('be.visible');
    cy.get('input[placeholder="Apellido Materno"]').should('be.visible');
    cy.get('input[placeholder="correo1@ejemplo.com"]').should('be.visible');
    cy.get('input[placeholder="+522221234567"]').should('be.visible');
    cy.get('input[placeholder="Tec de Monterrey"]').should('be.visible');
    cy.get('input[placeholder="Ingeniería en Mecatrónica"]').should('be.visible');
    cy.get('input[placeholder="6º Semestre"]').should('be.visible');
    cy.contains('Sexo*').should('be.visible');
    cy.contains('Rol Preferido*').should('be.visible');
    cy.contains('Idioma Preferido*').should('be.visible');
    cy.contains('Dificultad preferida*').should('be.visible');
    cy.contains('Selección de Sede').should('be.visible');
    cy.contains('Aviso de Privacidad').should('be.visible');
    cy.get('input[type="checkbox"]').should('exist');
    cy.contains('Enviar Registro').should('be.visible');
  });

  it('shows validation errors when required fields are missing', () => {
    cy.contains('Enviar Registro').click();
    cy.contains('El nombre es obligatorio').should('be.visible');
    cy.contains('El apellido paterno es obligatorio').should('be.visible');
    cy.contains('El correo electrónico es obligatorio').should('be.visible');
    cy.contains('El celular es obligatorio').should('be.visible');
    cy.contains('El sexo es obligatorio').should('be.visible');
    cy.contains('La institución académica es obligatorio').should('be.visible');
    cy.contains('La carrera es obligatorio').should('be.visible');
    cy.contains('El semestre es obligatorio').should('be.visible');
    cy.contains('El rol preferido es obligatorio').should('be.visible');
    cy.contains('El idioma preferido es obligatorio').should('be.visible');
    cy.contains('La dificultad preferida es obligatorio').should('be.visible');
    cy.contains('El grupo preferido es obligatorio').should('be.visible');
    cy.contains('Debes aceptar el aviso de privacidad').should('be.visible');
  });

  it('submits the form successfully (Double)', () => {
    cy.intercept('POST', '/api/collaborators', {
      statusCode: 201,
      body: { message: 'Colaborador registrado exitosamente' },
    }).as('registerCollaborator');

    cy.get('input[placeholder="Nombre(s)"]').type('María');
    cy.get('input[placeholder="Apellido Paterno"]').type('Gómez');
    cy.get('input[placeholder="Apellido Materno"]').type('López');
    cy.get('input[placeholder="correo1@ejemplo.com"]').type('maria@example.com');
    cy.get('input[placeholder="+522221234567"]').type('+522221234567');
    cy.get('div:contains("Sexo*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Femenino').click();
    cy.get('input[placeholder="Tec de Monterrey"]').type('Universidad Nacional');
    cy.get('input[placeholder="Ingeniería en Mecatrónica"]').type('Ingeniería Biomédica');
    cy.get('input[placeholder="6º Semestre"]').type('8º Semestre');
    cy.get('div:contains("Rol Preferido*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Instructora').click();
    cy.get('div:contains("Idioma Preferido*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Español').click();
    cy.get('div:contains("Dificultad preferida*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Básico').click();

    // Selección de grupo (elige el primero de la tabla si existe)
    cy.get('table tbody tr').first().within(() => {
      cy.contains(/Seleccionar|Elegir|Select/i).click({ force: true });
    });

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('Enviar Registro').click();

    cy.contains('Colaborador registrado exitosamente').should('be.visible');
    cy.wait('@registerCollaborator');
  });

  it('shows backend validation error (Double)', () => {
    cy.intercept('POST', '/api/collaborators', {
      statusCode: 422,
      body: {
        message: 'Error de validación',
        errors: [{ msg: 'El correo electrónico debe ser válido' }],
      },
    }).as('registerCollaborator');

    cy.get('input[placeholder="Nombre(s)"]').type('María');
    cy.get('input[placeholder="Apellido Paterno"]').type('Gómez');
    cy.get('input[placeholder="correo1@ejemplo.com"]').type('correo-no-valido');
    cy.get('input[placeholder="+522221234567"]').type('+522221234567');
    cy.get('div:contains("Sexo*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Femenino').click();
    cy.get('input[placeholder="Tec de Monterrey"]').type('Universidad Nacional');
    cy.get('input[placeholder="Ingeniería en Mecatrónica"]').type('Ingeniería Biomédica');
    cy.get('input[placeholder="6º Semestre"]').type('8º Semestre');
    cy.get('div:contains("Rol Preferido*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Instructora').click();
    cy.get('div:contains("Idioma Preferido*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Español').click();
    cy.get('div:contains("Dificultad preferida*")').parent().find('div[role="combobox"]').click();
    cy.get('div[role="option"]').contains('Básico').click();

    // Selección de grupo (elige el primero de la tabla si existe)
    cy.get('table tbody tr').first().within(() => {
      cy.contains(/Seleccionar|Elegir|Select/i).click({ force: true });
    });

    cy.get('input[type="checkbox"]').check({ force: true });

    cy.contains('Enviar Registro').click();

    cy.contains('El correo electrónico debe ser válido').should('be.visible');
    cy.wait('@registerCollaborator');
  });
});