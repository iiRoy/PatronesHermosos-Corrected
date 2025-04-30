import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VenueRegistrationForm from '../app/formulario/sede/page';
import '@testing-library/jest-dom';

// Mock the fetch API
global.fetch = jest.fn();

describe('VenueRegistrationForm', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // Mock localStorage for the token
    Storage.prototype.getItem = jest.fn(() => 'mocked_token');
  });

  it('renders the form correctly', () => {
    render(<VenueRegistrationForm />);

    expect(screen.getByText(/Formulario de Registro SEDE/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre\(s\)\*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico\*/i)).toBeInTheDocument();
    expect(screen.getByText(/Enviar Registro/i)).toBeInTheDocument();
  });

  it('shows validation errors when required fields are missing', async () => {
    render(<VenueRegistrationForm />);

    fireEvent.click(screen.getByText(/Enviar Registro/i));

    await waitFor(() => {
      expect(screen.getByText(/El nombre de la SEDE es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El archivo de participación es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/El nombre de la coordinadora general es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/Debes aceptar el aviso de privacidad/i)).toBeInTheDocument();
    });
  });

  it('submits the form successfully with valid data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => ({ message: 'Venue registrado exitosamente' }),
    });

    render(<VenueRegistrationForm />);

    // Fill in required fields
    fireEvent.change(screen.getByLabelText(/Nombre\(s\)\*/i), { target: { value: 'Edna' } });
    fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'Moda' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico\*/i), { target: { value: 'edna@example.com' } });
    fireEvent.change(screen.getByLabelText(/Celular\*/i), { target: { value: '+52 222 123 4567' } });
    fireEvent.change(screen.getByLabelText(/Nombre de Usuario\*/i), { target: { value: 'edna_moda' } });
    fireEvent.change(screen.getByLabelText(/Contraseña\*/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña\*/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Nombre de la SEDE\*/i), { target: { value: 'Instituto Oriente' } });
    fireEvent.change(screen.getByLabelText(/Dirección\*/i), { target: { value: '123 Main St' } });

    // Mock file uploads
    const participationFileInput = screen.getByLabelText(/Convocatoria SEDE/i).nextSibling as HTMLInputElement;
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(participationFileInput, { target: { files: [file] } });

    // Check privacy notice
    fireEvent.click(screen.getByRole('checkbox', { name: '' }));

    // Submit the form
    fireEvent.click(screen.getByText(/Enviar Registro/i));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/venues',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer mocked_token',
          }),
        })
      );
      expect(screen.getByText(/Venue registrado exitosamente/i)).toBeInTheDocument();
    });
  });

  it('displays error messages on failed submission', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({
        message: 'Error de validación',
        errors: [{ msg: 'El correo electrónico de la coordinadora general debe ser válido' }],
      }),
    });

    render(<VenueRegistrationForm />);

    // Fill in some fields with invalid data
    fireEvent.change(screen.getByLabelText(/Nombre\(s\)\*/i), { target: { value: 'Edna' } });
    fireEvent.change(screen.getByLabelText(/Apellido Paterno\*/i), { target: { value: 'Moda' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico\*/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Celular\*/i), { target: { value: '+52 222 123 4567' } });
    fireEvent.change(screen.getByLabelText(/Nombre de Usuario\*/i), { target: { value: 'edna_moda' } });
    fireEvent.change(screen.getByLabelText(/Contraseña\*/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Confirmar Contraseña\*/i), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/Nombre de la SEDE\*/i), { target: { value: 'Instituto Oriente' } });
    fireEvent.change(screen.getByLabelText(/Dirección\*/i), { target: { value: '123 Main St' } });

    const participationFileInput = screen.getByLabelText(/Convocatoria SEDE/i).nextSibling as HTMLInputElement;
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(participationFileInput, { target: { files: [file] } });

    fireEvent.click(screen.getByRole('checkbox', { name: '' }));
    fireEvent.click(screen.getByText(/Enviar Registro/i));

    await waitFor(() => {
      expect(screen.getByText(/El correo electrónico de la coordinadora general debe ser válido/i)).toBeInTheDocument();
    });
  });
});