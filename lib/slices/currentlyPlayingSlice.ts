import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { CurrentlyPlaying } from '../types/music';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Database } from '../types/supabase';

const supabase = createBrowserSupabaseClient<Database>();

const initialState = {
  songID: null,
  url: null,
  songName: null,
  artistName: null,
  albumName: null,
  albumCover: null,
  songDuration: null,
  songProgress: 0,
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
      state.songDuration = action.payload;
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
        state.songID = Number(action.payload.songID);

        state.songName = action.payload.songData?.name;

        // if songData.artist is an array, combine all the names into one string, if not, just use the name
        const artistName = Array.isArray(action.payload.songData.artist)
          ? action.payload.songData.artist
              .map((artist) => artist.name)
              .join(', ')
          : action.payload.songData.artist?.name;

        state.artistName = artistName!;
        state.albumCover = action.payload.albumCoverURL;

        state.url = action.payload.songURL;

        // set to 0 because this gets updated by the audio player
        state.songDuration = 0;

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
