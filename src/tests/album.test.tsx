/* eslint-disable react-func/max-lines-per-function */
import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import * as musicsAPI from '../services/musicsAPI';
import { validAlbum } from './mocks/albums.mock';
import renderPath from './utils/renderPath';

describe('Testes do componente Album', () => {
  const LOADING_ID = 'loading-container-id';
  test('verifica se musicsAPI é chamado', async () => {
    const getMusicsSpy = vi.spyOn(musicsAPI, 'default').mockResolvedValue(validAlbum as any);

    renderPath('/album/1123123');
    const loading = screen.getByTestId(LOADING_ID);

    expect(loading).toBeInTheDocument();

    await waitFor(
      () => expect(loading).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    expect(getMusicsSpy).toHaveBeenCalledWith('1123123');
  });

  test('verifica se o nome do álbum e do artista são renderizados', async () => {
    vi.spyOn(musicsAPI, 'default').mockResolvedValue(validAlbum as any);

    renderPath('/album/1');

    const loading = screen.getByTestId(LOADING_ID);

    await waitFor(
      () => expect(loading).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    const albumName = screen.getByTestId('album-name');
    expect(albumName).toBeInTheDocument();
    expect(albumName).toHaveTextContent('Collection Name');

    const artistName = screen.getByTestId('artist-name');
    expect(artistName).toBeInTheDocument();
    expect(artistName).toHaveTextContent('Artista Teste');
  });

  test('verifica se as músicas são renderizadas', async () => {
    vi.spyOn(musicsAPI, 'default').mockResolvedValue(validAlbum as any);

    renderPath('/album/1');

    const loading = screen.getByTestId(LOADING_ID);

    await waitFor(
      () => expect(loading).not.toBeInTheDocument(),
      { timeout: 3000 },
    );

    expect(screen.getByText('Track Name 1')).toBeInTheDocument();
    expect(screen.getByText('Track Name 2')).toBeInTheDocument();
    expect(screen.getAllByTestId('audio-component')).toHaveLength(2);
  });
});
