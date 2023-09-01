export type AlbumType = {
  artistId: number;
  artistName: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  artworkUrl100: string;
  releaseDate: string;
  trackCount: number;
};

export type UserType = {
  name: string;
  email: string;
  image: string;
  description: string;
};

export type SongType = {
  trackId: number,
  trackName: string,
  previewUrl: string,
};

export type AlbumSongsType = [AlbumType, ...SongType[]] | [];

export type AlbumListTypes = {
  searchResult: AlbumType[],
  resultNotFound: boolean
};

export type FormTypes = {
  onSubmit: (e: React.FormEvent<HTMLElement>) => Promise<void>,
  iptType: string,
  iptTestId: string,
  inputValue: string,
  onChange: ({ target }: { target: any; }) => void,
  placeholder?: string,
  btnTestId: string,
  disabled: boolean,
  btnText: string
};

export type MusicCardTypes = {
  song: SongType
};
