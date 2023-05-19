import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { CurrentlyPlaying } from '../types/music';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Database } from '../types/supabase';
import { Song } from '../types/music';

const supabase = createBrowserSupabaseClient<Database>();

const initialState = {
  currentSong: {
    id: null,
    artistID: null,
    albumID: null,
    name: null,
    artistName: null,
    albumName: null,
    duration: null,
    url: null,
    albumCover: null,
    createdAt: null,
    updatedAt: null,
  } as Song,
  playlist: [] as Song[],
  songProgress: null,
  isPlaying: false,
  volume: 1,
  currentlyChangingDuration: false,
  status: 'idle',
} as CurrentlyPlaying;

export const updateSong = createAsyncThunk(
  'currentlyPlaying/updateSong',
  async (songID: string) => {
    const { data: songURL } = supabase.storage
      .from('songs')
      .getPublicUrl(songID);
    const { data: albumCoverURL } = supabase.storage
      .from('album_covers')
      .getPublicUrl(songID);

    const { data: songData } = await supabase
      .from('song')
      .select('*, artist(name)')
      .maybeSingle();

    if (!songURL || !songData) throw new Error('Song not found');

    return {
      songID,
      albumCoverURL: albumCoverURL.publicUrl + '.jpg',
      songURL: songURL.publicUrl + '.mp3',
      songData,
    };
  }
);

export const currentlyPlayingSlice = createSlice({
  name: 'currentlyPlaying',
  initialState,
  reducers: {
    updateSongDuration: (state, action) => {
      state.currentSong.duration = action.payload;
    },
    updateSongProgress: (state, action) => {
      state.songProgress = action.payload;
    },
    updateIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    updateVolume: (state, action) => {
      state.volume = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSong.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateSong.fulfilled, (state, action) => {
        state.currentSong.id = Number(action.payload.songID);

        state.currentSong.name = action.payload.songData?.name;

        // if songData.artist is an array, combine all the names into one string, if not, just use the name
        const artistName = Array.isArray(action.payload.songData.artist)
          ? action.payload.songData.artist
              .map((artist) => artist.name)
              .join(', ')
          : action.payload.songData.artist?.name;

        state.currentSong.artistName = artistName!;
        state.currentSong.albumCover = action.payload.albumCoverURL;

        state.currentSong.url = action.payload.songURL;

        // set to 0 because this gets updated by the audio player
        state.currentSong.duration = 0;

        state.status = 'idle';
      })
      .addCase(updateSong.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  updateSongDuration,
  updateSongProgress,
  updateIsPlaying,
  updateVolume,
} = currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;
