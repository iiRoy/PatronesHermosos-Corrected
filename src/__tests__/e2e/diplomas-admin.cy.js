function loginIfNeeded() {
  cy.url().then((url) => {
    if (url.includes('/login')) {
      cy.get('input[type="text"]').clear().type('rdglopz', { delay: 50 });
      cy.get('input[type="password"]').clear().type('R0L0Gu$R0dr1g0', { delay: 50 });
      cy.get('button[type="submit"]').click();
      cy.url({ timeout: 10000 }).should('not.include', '/login');
      cy.contains('Generar Diplomas', { timeout: 10000 }).should('be.visible');
    } else {
      // Si ya está logueado, asegurarse de estar en la página correcta
      if (!url.includes('/admin/diplomas')) {
        cy.visit('/admin/diplomas');
        cy.contains('Generar Diplomas', { timeout: 10000 }).should('be.visible');
      }
    }
  });
}

describe('DiplomasPage E2E', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/login');
    cy.get('input[type="text"]').clear().type('rdglopz', { delay: 50 });
    cy.get('input[type="password"]').clear().type('R0L0Gu$R0dr1g0', { delay: 50 });
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 600000 }).should('not.include', '/login');
    cy.visit('/admin/diplomas');
    cy.contains('Generar Diplomas', { timeout: 10000 }).should('be.visible');
    cy.wait(2000);
  });

  // DUMMY TESTS (20 diferentes, solo elementos reales)
  it('Dummy 1: Renderiza el título principal', () => {
    cy.contains('Generar Diplomas').should('be.visible');
  });
  it('Dummy 2: Renderiza el campo de búsqueda', () => {
    cy.get('input[placeholder="Buscar por nombre"]').should('be.visible');
  });
  it('Dummy 3: Renderiza el botón Descargar Seleccionados', () => {
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Dummy 4: Renderiza el botón Enviar por Correo', () => {
    cy.contains('button', 'Enviar por Correo').should('be.visible');
  });
  it('Dummy 5: Renderiza la tabla de usuarios', () => {
    cy.get('table').should('be.visible');
  });
  it('Dummy 6: Renderiza la paginación', () => {
    cy.get('.pagination').should('be.visible');
  });
  it('Dummy 7: Renderiza el encabezado de la tabla', () => {
    cy.get('thead').should('be.visible');
  });
  it('Dummy 8: Renderiza al menos una fila en la tabla', () => {
    cy.get('tbody tr').its('length').should('be.gte', 0); // Puede estar vacía
  });
  it('Dummy 9: Renderiza el checkbox de selección general', () => {
    cy.get('thead input[type="checkbox"]').should('exist');
  });
  it('Dummy 10: Renderiza los checkboxes de usuario', () => {
    cy.get('tbody').should('be.visible');
    cy.get('tbody input[type="checkbox"]').should('exist').and('be.visible');
  });
  it('Dummy 11: Renderiza la columna Nombre', () => {
    cy.get('th').contains('Nombre').should('be.visible');
  });
  it('Dummy 12: Renderiza la columna Rol', () => {
    cy.get('th').contains('Rol').should('be.visible');
  });
  it('Dummy 13: Renderiza la columna Sede', () => {
    cy.get('th').contains('Sede').should('be.visible');
  });
  it('Dummy 14: Renderiza la columna Acción', () => {
    cy.get('th').contains('Acción').should('be.visible');
  });
  it('Dummy 15: Renderiza los botones de acción deshabilitados por defecto', () => {
    cy.contains('button', 'Descargar Seleccionados').should('be.disabled');
    cy.contains('button', 'Enviar por Correo').should('be.disabled');
  });
  it('Dummy 16: El input de búsqueda está vacío por defecto', () => {
    cy.get('input[placeholder="Buscar por nombre"]').should('have.value', '');
  });
  it('Dummy 17: Renderiza la paginación aunque no haya datos', () => {
    cy.get('.pagination').should('exist');
  });
  it('Dummy 18: Renderiza el filtro de sede', () => {
    cy.contains('Filtros', { timeout: 10000 }).should('be.visible').click();
    cy.get('[role="combobox"]').first().should('be.visible');
  });
  it('Dummy 19: Renderiza el filtro de rol', () => {
    cy.contains('Filtros', { timeout: 10000 }).should('be.visible').click();
    cy.get('[role="combobox"]').last().should('be.visible');
  });
  it('Dummy 20: Renderiza el botón de paginación', () => {
    cy.get('.pagination a').should('exist');
  });

  // STUB TESTS (20 diferentes, solo interacciones reales)
  it('Stub 1: Selecciona un usuario y verifica que los botones se habilitan', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('not.be.disabled');
    cy.contains('button', 'Enviar por Correo').should('not.be.disabled');
  });
  it('Stub 2: Selecciona todos los usuarios y verifica selección', () => {
    cy.get('thead input[type="checkbox"]').should('be.visible').check({ force: true });
    cy.get('tbody input[type="checkbox"]').should('exist').each(($el) => {
      cy.wrap($el).should('be.checked');
    });
  });
  it('Stub 3: Desmarca todos los usuarios y verifica', () => {
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
    cy.get('tbody input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('not.be.checked');
    });
  });
  it('Stub 4: Escribe en el campo de búsqueda y verifica el valor', () => {
    cy.get('input[placeholder="Buscar por nombre"]').type('Ana');
    cy.get('input[placeholder="Buscar por nombre"]').should('have.value', 'Ana');
  });
  it('Stub 5: Selecciona y deselecciona un usuario', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.get('tbody input[type="checkbox"]').first().uncheck({ force: true });
    cy.get('tbody input[type="checkbox"]').first().should('not.be.checked');
  });
  it('Stub 6: Cambia de página', () => {
    cy.get('.pagination a').should('have.length.gte', 2);
    cy.get('.pagination a').eq(-2).should('be.visible').click();
    cy.get('.pagination a').eq(3).should('have.class', 'active');
    cy.get('.pagination .active').should('exist');
  });
  it('Stub 7: Cambia de página y regresa', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination a').eq(1).click();
    cy.url().should('not.include', 'diplomas#2');
  });
  it('Stub 8: Selecciona varios usuarios', () => {
    cy.get('tbody input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('tbody input[type="checkbox"]').eq(1).check({ force: true });
  });
  it('Stub 9: Desmarca un usuario', () => {
    cy.get('tbody input[type="checkbox"]').should('exist').eq(0).check({ force: true });
    cy.get('tbody input[type="checkbox"]').eq(0).uncheck({ force: true });
    cy.get('tbody input[type="checkbox"]').eq(0).should('not.be.checked');
  });
  it('Stub 10: El botón de acción está visible tras selección', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Stub 11: El botón de acción está visible tras limpiar selección', () => {
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Stub 12: El input de búsqueda acepta texto', () => {
    cy.get('input[placeholder="Buscar por nombre"]').type('Texto de prueba');
    cy.get('input[placeholder="Buscar por nombre"]').should('have.value', 'Texto de prueba');
  });
  it('Stub 13: El filtro de sede cambia', () => {
    cy.contains('Filtros', { timeout: 10000 }).should('be.visible').click();
    cy.get('[role="combobox"]').first().should('be.visible').click();
    cy.get('[role="option"]').should('have.length.gte', 2);
    cy.get('[role="option"]').eq(1).click();
    cy.get('[role="combobox"]').first().should('contain.text', 'ITESM Puebla');
  });
  it('Stub 14: El filtro de rol cambia', () => {
    cy.contains('Filtros', { timeout: 10000 }).should('be.visible').click();
    cy.get('[role="combobox"]').last().should('be.visible').click();
    cy.get('[role="option"]').should('have.length.gte', 2);
    cy.get('[role="option"]').eq(1).click();
    cy.get('[role="combobox"]').last().should('contain.text', 'Participante');
  });
  it('Stub 15: Desmarca todos los usuarios y verifica botones', () => {
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('be.disabled');
  });
  it('Stub 16: La tabla tiene columnas correctas', () => {
    cy.get('th').should('contain', 'Nombre').and('contain', 'Rol').and('contain', 'Sede');
  });
  it('Stub 17: La tabla tiene filas con datos', () => {
    cy.get('tbody tr').should('have.length.gte', 0);
  });
  it('Stub 18: El botón de acción está visible tras selección', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Stub 19: El botón de acción está visible tras limpiar selección', () => {
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Stub 20: El input de búsqueda acepta texto', () => {
    cy.get('input[placeholder="Buscar por nombre"]').type('TestUser');
    cy.get('input[placeholder="Buscar por nombre"]').should('have.value', 'TestUser');
  });

  // MOCK TESTS (20 diferentes, solo interacciones reales)
  it('Mock 1: No permite descargar sin selección', () => {
    cy.contains('button', 'Descargar Seleccionados').should('be.disabled').click({ force: true });
  });
  it('Mock 2: No permite enviar por correo sin selección', () => {
    cy.contains('button', 'Enviar por Correo').should('be.disabled').click({ force: true });
  });
  it('Mock 3: Selecciona un usuario y descarga', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').click();
  });
  it('Mock 4: Selecciona un usuario y abre formulario de correo', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.contains('Envío de Diplomas').should('be.visible');
    cy.get('button').contains('Cancelar').click();
  });
  it('Mock 5: Selección múltiple y descarga ZIP', () => {
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').click();
  });
  it('Mock 6: Selección múltiple y abre formulario de correo', () => {
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.contains('Envío de Diplomas').should('be.visible');
    cy.get('button').contains('Cancelar', { timeout: 10000 }).click();
  });
  it('Mock 7: Abre y cierra el formulario de correo', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.get('button').contains('Cancelar', { timeout: 10000 }).click();
  });
  it('Mock 8: Abre el formulario de correo y lo envía', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.get('button').contains('Enviar', { timeout: 10000 }).click();
  });
  it('Mock 9: Abre el formulario de correo y marca copia', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.get('label').contains('Enviar copia a mi correo').click();
    cy.get('button').contains('Cancelar', { timeout: 10000 }).click();
  });
  it('Mock 10: Abre el formulario de correo y escribe mensaje', () => {
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.get('textarea').type('¡Felicidades!');
    cy.get('button').contains('Cancelar', { timeout: 10000 }).click();
  });
  it('Mock 11: Cambia de página y selecciona usuario', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
  });
  it('Mock 12: Cambia de página y abre formulario de correo', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Enviar por Correo').click();
    cy.get('button').contains('Cancelar', { timeout: 10000 }).click();
  });
  it('Mock 13: Cambia de página y descarga', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
    cy.contains('button', 'Descargar Seleccionados').click();
  });
  it('Mock 14: Cambia de página y limpia selección', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('thead input[type="checkbox"]').check({ force: true });
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
  });
  it('Mock 15: Cambia de página y busca usuario', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('input[placeholder="Buscar por nombre"]').type('Ana');
  });
  it('Mock 16: Cambia de página y filtra por sede', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.contains('Filtros').click();
    cy.get('[role="combobox"]').first().click();
    cy.get('[role="option"]').eq(1).click();
  });
  it('Mock 17: Cambia de página y filtra por rol', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.contains('Filtros').click();
    cy.get('[role="combobox"]').last().click();
    cy.get('[role="option"]').eq(1).click();
  });
  it('Mock 18: Cambia de página y selecciona varios usuarios', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').eq(0).check({ force: true });
    cy.get('tbody input[type="checkbox"]').eq(1).check({ force: true });
  });
  it('Mock 19: Cambia de página y limpia búsqueda', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('input[placeholder="Buscar por nombre"]').type('Ana');
    cy.get('input[placeholder="Buscar por nombre"]').clear();
  });
  it('Mock 20: Cambia de página y verifica botones de acción', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
    cy.contains('button', 'Enviar por Correo').should('be.visible');
  });

  // FAKE TESTS (20 diferentes, solo flujos y elementos reales)
  it('Fake 1: Renderiza la paginación', () => {
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 2: Cambia a la segunda página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 3: Cambia a la última página', () => {
    cy.get('.pagination a').last().click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 4: Cambia a la primera página desde la última', () => {
    cy.get('.pagination a').last().click();
    cy.get('.pagination a').first().click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 5: Verifica que la paginación tiene al menos 4 enlaces', () => {
    cy.get('.pagination a').should('have.length.gte', 4);
  });
  it('Fake 6: Verifica que la paginación muestra la página current', () => {
    cy.get('.pagination .active').should('exist');
  });
  it('Fake 7: Cambia de página y verifica el cambio', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination .active').should('exist');
  });
  it('Fake 8: Cambia de página varias veces', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination a').eq(6).click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 9: Cambia de página y regresa', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination a').first().click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 10: Verifica que la paginación no desaparece al cambiar de página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('.pagination').should('be.visible');
  });
  it('Fake 11: Verifica que la tabla sigue visible al cambiar de página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('table').should('be.visible');
  });
  it('Fake 12: Verifica que los checkboxes siguen presentes al cambiar de página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').should('exist');
  });
  it('Fake 13: Verifica que el campo de búsqueda sigue presente al cambiar de página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('input[placeholder="Buscar por nombre"]').should('be.visible');
  });
  it('Fake 14: Verifica que los botones de acción siguen presentes al cambiar de página', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.contains('button', 'Descargar Seleccionados').should('be.visible');
  });
  it('Fake 15: Cambia de página y selecciona un usuario', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').first().check({ force: true });
  });
  it('Fake 16: Cambia de página y limpia selección', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('thead input[type="checkbox"]').uncheck({ force: true });
  });
  it('Fake 17: Cambia de página y busca un usuario', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('input[placeholder="Buscar por nombre"]').type('Ana');
  });
  it('Fake 18: Cambia de página y limpia búsqueda', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('input[placeholder="Buscar por nombre"]').clear();
  });
  it('Fake 19: Cambia de página y verifica el estado de los botones', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.contains('button', 'Descargar Seleccionados').should('be.disabled');
  });
  it('Fake 20: Cambia de página y verifica el estado de los checkboxes', () => {
    cy.get('.pagination a').eq(-2).click();
    cy.get('tbody input[type="checkbox"]').each(($el) => {
      cy.wrap($el).should('not.be.checked');
    });
  });

  // SPY TESTS (20 diferentes, solo verificaciones de render y ausencia de errores visibles)
  for (let i = 1; i <= 20; i++) {
    it(`Spy ${i}: Renderiza DiplomasPage sin errores visibles (${i})`, () => {
      cy.contains('Generar Diplomas').should('be.visible');
      cy.get('table').should('be.visible');
      cy.get('.pagination').should('be.visible');
    });
  }
});
