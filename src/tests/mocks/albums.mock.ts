import { AlbumType } from '../../types';

const ARTIST_NAME = 'Artista Teste';

export const validAlbums = [

  {
    artistId: 12,
    artistName: ARTIST_NAME,
    collectionId: 1,
    collectionName: 'Collection Name',
    collectionPrice: 12.25,
    artworkUrl100: 'https://url-to-image-1',
    releaseDate: '2012-03-02T08:00:00Z',
    trackCount: 8,
  },
  {
    artistId: 12,
    artistName: ARTIST_NAME,
    collectionId: 2,
    collectionName: 'Collection Name 2',
    collectionPrice: 12.25,
    artworkUrl100: 'https://url-to-image-2',
    releaseDate: '2012-04-02T08:00:00Z',
    trackCount: 8,
  },
  {
    artistId: 12,
    artistName: ARTIST_NAME,
    collectionId: 3,
    collectionName: 'Collection Name 3',
    collectionPrice: 12.25,
    artworkUrl100: 'https://url-to-image-3',
    releaseDate: '2012-05-02T08:00:00Z',
    trackCount: 8,
  },

] as AlbumType[];
