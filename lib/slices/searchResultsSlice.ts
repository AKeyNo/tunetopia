import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SearchResults } from '../types/music';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Database } from '../types/supabase';
import { Song } from '../types/music';

const supabase = createBrowserSupabaseClient<Database>();

const initialState = {
  songResults: [] as Song[],
  status: 'idle',
} as SearchResults;

export const searchSongs = createAsyncThunk(
  'searchResults/searchSongs',
  async (query: string) => {
    const { data: songResults } = await supabase
      .from('song')
      .select('*, artist(name)')
      .textSearch('name', query);

    return { songResults };
  }
);

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    clearResults: (state) => {
      state.songResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchSongs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchSongs.fulfilled, (state, action) => {
        state.status = 'idle';

        if (action.payload.songResults?.length === 0) {
          state.songResults = [];
          return;
        }

        const songList = action.payload.songResults?.map((song) => {
          const artistName = Array.isArray(song?.artist)
            ? song?.artist.map((artist) => artist.name).join(', ')
            : song?.artist?.name;

          return {
            id: song.song_id as unknown as number,
            artistID: song.artist_id as unknown as number,
            name: song.name as unknown as string,
            artistName: artistName,
            albumName: null,
            albumID: null,
            duration: null,
            url: null,
            albumCover:
              supabase.storage
                .from('album_covers')
                .getPublicUrl(song.song_id.toString()).data?.publicUrl + '.jpg',
            createdAt: null,
            updatedAt: null,
          } as Song;
        });

        state.songResults = songList!;
      });
  },
});

export const { clearResults } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
