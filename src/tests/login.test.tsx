import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { renderWithRouter } from '../utils/renderWithRouter';
import Login from '../pages/Login/Login';
import * as userAPI from '../services/userAPI';

const LOGIN_INPUT_ID = 'login-name-input';
const LOGIN_BUTTON_ID = 'login-submit-button';

test('verifica se o um input e o botão são renderizados', () => {
  // Acessar
  renderWithRouter(<Login />);
  const loginInput = screen.getByTestId(LOGIN_INPUT_ID);
  const loginButton = screen.getByTestId(LOGIN_BUTTON_ID);
  // agir interagindo com os elemtneos da tela

  // aferir
  expect(loginButton).toBeInTheDocument();
  expect(loginInput).toBeInTheDocument();
});

test('verifica se o botão inicia desabilitado', () => {
  // Acessar
  renderWithRouter(<Login />);
  const loginButton = screen.getByTestId(LOGIN_BUTTON_ID);
  // aferir
  expect(loginButton).toBeDisabled();
});

test('verifica se o botão é habilitado quando o input tem 3 ou mais caracteres', async () => {
  // Acessar
  const { user } = renderWithRouter(<Login />);

  const loginInput = screen.getByTestId(LOGIN_INPUT_ID);
  const loginButton = screen.getByTestId(LOGIN_BUTTON_ID);
  // agir interagindo com os elemtneos da tela
  expect(loginButton).toBeDisabled();

  await user.type(loginInput, '123');
  // aferir
  expect(loginButton).toBeEnabled();
});

test('verifica se ao clicar no botão o nome da  pessoa usuária é salvo pôr meio da função createUser e em seguida é redirecionada para a página de busca', async () => {
  const mockCreateUser = vi.fn().mockResolvedValue('OK');

  vi.spyOn(userAPI, 'createUser').mockImplementation(mockCreateUser);

  const { user } = renderWithRouter(<Login />);
  const loginInput = screen.getByTestId(LOGIN_INPUT_ID);
  const loginButton = screen.getByTestId(LOGIN_BUTTON_ID);

  await user.type(loginInput, 'username');
  await user.click(loginButton);

  await waitFor(() => {
    expect(mockCreateUser).toHaveBeenCalledWith({ name: 'username' });
    expect(window.location.pathname).toBe('/search');
  });
});
