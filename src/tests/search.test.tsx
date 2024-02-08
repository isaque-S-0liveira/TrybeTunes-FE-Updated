/* eslint-disable no-promise-executor-return */
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { act } from 'react-dom/test-utils';
import { renderWithRouter } from '../utils/renderWithRouter';
import Search from '../pages/Search/Search';
import * as albumsAPI from '../services/searchAlbumsAPI';
import { validAlbums } from './mocks/albums.mock';

const SEARCH_INPUT_ID = 'search-artist-input';
const SEARCH_BUTTON_ID = 'search-artist-button';

describe('Testes do ccomponente Search', () => {
  test('verifica se o input, o botão e o texto são renderizados', () => {
    renderWithRouter(<Search />, { route: '/search' });
    const input = screen.getByTestId(SEARCH_INPUT_ID);
    const button = screen.getByTestId(SEARCH_BUTTON_ID);
    const text = screen.getByText('Pesquise sua banda ou artista favorito!');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  test('verifica se o botão inicia desabilitado', () => {
    renderWithRouter(<Search />, { route: '/search' });
    const button = screen.getByTestId(SEARCH_BUTTON_ID);

    expect(button).toBeDisabled();
  });

  test('verifica se o botão é habilitado quando o input tem 2 ou mais caracteres', async () => {
    const { user } = renderWithRouter(<Search />, { route: '/search' });
    const input = screen.getByTestId(SEARCH_INPUT_ID);
    const button = screen.getByTestId(SEARCH_BUTTON_ID);

    expect(button).toBeDisabled();

    await user.type(input, 'ab');

    expect(button).toBeEnabled();
  });

  describe('Testando fetch', () => {
    afterEach(() => vi.clearAllMocks());
    test('verifica se ao digitar uma banda ou artista inválido e clicar no botão a busca é realizada e o texto correto é exibido', async () => {
      vi.spyOn(albumsAPI, 'default').mockResolvedValue([]);

      const { user } = renderWithRouter(<Search />, { route: '/search' });

      const input = screen.getByTestId(SEARCH_INPUT_ID);
      const button = screen.getByTestId(SEARCH_BUTTON_ID);

      await user.type(input, 'inválido');
      await user.click(button);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });
      expect(screen.queryByTestId('loading-container-id')).toBeNull();

      expect(screen.getByText('Nenhum álbum encontrado')).toBeInTheDocument();

      expect(albumsAPI.default).toHaveBeenCalledWith('inválido');
    });

    test('verifica se ao digitar uma banda ou artista válido e clicar no botão a busca é realizada e os álbuns são exibidos', async () => {
      vi.spyOn(albumsAPI, 'default').mockResolvedValue(validAlbums);

      const { user } = renderWithRouter(<Search />, { route: '/search' });

      const input = screen.getByTestId(SEARCH_INPUT_ID);
      const button = screen.getByTestId(SEARCH_BUTTON_ID);

      await user.type(input, 'valido');
      await user.click(button);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });
      expect(screen.queryByTestId('loading-container-id')).toBeNull();

      expect(albumsAPI.default).toHaveBeenCalledWith('valido');

      expect(screen.getByRole('heading', {
        name: /álbuns de Artista Teste/i,
      })).toBeInTheDocument();

      validAlbums.forEach((album) => {
        expect(screen.getByText(album.collectionName)).toBeInTheDocument();
        expect(screen.getAllByText(album.artistName).length).toBe(3);
      });
    });

    test('verifica se as álbuns renderizados são links, que ao ser clicado redireciona o usuário para rota /album/:id', async () => {
      vi.spyOn(albumsAPI, 'default').mockResolvedValue(validAlbums);

      const { user } = renderWithRouter(<Search />, { route: '/search' });

      const input = screen.getByTestId(SEARCH_INPUT_ID);
      const button = screen.getByTestId(SEARCH_BUTTON_ID);

      await user.type(input, 'valido');
      await user.click(button);

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      });

      const album2 = screen.getByTestId('link-to-album-2');

      await user.click(album2);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/album/2');
      });
    });
  });
});
