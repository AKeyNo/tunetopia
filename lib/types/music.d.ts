import { Database } from './supabase';

export type AlbumArtist = Database['public']['Tables']['album_artist']['Row'];
export type Artist = Database['public']['Tables']['artist']['Row'];
export type Playlist = Database['public']['Tables']['playlist']['Row'];

export type Album = Database['public']['Tables']['album']['Row'] & {
  artists:
    | { artist_id: number; name: string }
    | { artist_id: number; name: string }[]
    | null;
};

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

export interface SongToUpload {
  id: number | null;
  name: string | null;
  artistName: string | null;
  artistID: number | null;
  file: File | null;
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

export interface AlbumState {
  album: Album | null;
  songs: Song[];
  status: 'idle' | 'loading' | 'failed';
}
