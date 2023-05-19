import { Database } from './supabase';

export type Album = Database['public']['Tables']['album']['Row'];
export type AlbumArtist = Database['public']['Tables']['album_artist']['Row'];
export type Artist = Database['public']['Tables']['artist']['Row'];
export type Playlist = Database['public']['Tables']['playlist']['Row'];

export interface Song {
  id: number | null;
  artistID: number | null;
  albumID: number | null;
  name: string | null;
  artistName: string | null;
  albumName: string | null;
  duration: number | null;
  url: string | null;
  albumCover: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface CurrentlyPlaying {
  currentSong: Song;
  playlist: Song[];
  songProgress: number | null;
  isPlaying: boolean;
  volume: number;
  status: 'idle' | 'loading' | 'failed';
}

export interface SearchResults {
  songResults: Song[];
  // artists: Artist[];
  // albums: Album[];
  // playlists: Playlist[];
  status: 'idle' | 'loading' | 'failed';
}
