import { CurrentlyPlaying } from '../types/music';
import { createSlice } from '@reduxjs/toolkit';

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
} as CurrentlyPlaying;

export const currentlyPlayingSlice = createSlice({
  name: 'currentlyPlaying',
  initialState,
  reducers: {
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
});

export const { updateSongProgress, updateIsPlaying, updateVolume } =
  currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;
