export type Album = Database['public']['Tables']['album']['Row'];
export type AlbumArtist = Database['public']['Tables']['album_artist']['Row'];
export type Artist = Database['public']['Tables']['artist']['Row'];
export type Playlist = Database['public']['Tables']['playlist']['Row'];
export type Song = Database['public']['Tables']['song']['Row'];

export interface CurrentlyPlaying {
  songID: number | null;
  songName: string | null;
  artistName: string | null;
  albumName: string | null;
  albumCover: string | null;
  songDuration: number | null;
  songProgress: number | null;
  isPlaying: boolean;
  volume: number;
}
