import { CurrentlyPlaying } from '../types/music';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songID: null,
  songName: null,
  artistName: null,
  albumName: null,
  albumCover: null,
  songDuration: null,
  songProgress: null,
  isPlaying: false,
  volume: 1,
} as CurrentlyPlaying;

export const currentlyPlayingSlice = createSlice({
  name: 'currentlyPlaying',
  initialState,
  reducers: {
    updateIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    updateVolume: (state, action) => {
      state.volume = action.payload / 100;
    },
  },
});

export const { updateIsPlaying, updateVolume } = currentlyPlayingSlice.actions;

export default currentlyPlayingSlice.reducer;
