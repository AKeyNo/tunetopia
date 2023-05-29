import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AlbumState } from '../types/music';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Database } from '../types/supabase';
import { Song } from '../types/music';

const supabase = createBrowserSupabaseClient<Database>();

const initialState = {
  album: null,
  songs: [] as Song[],
  status: 'idle',
} as AlbumState;

export const getAlbum = createAsyncThunk(
  'album/getAlbum',
  async (albumID: number) => {
    // TODO: Simplify it into a single rpc call.
    const { data: albumInformation } = await supabase
      .from('album')
      .select('*')
      .eq('album_id', albumID)
      .single();

    if (!albumInformation) return { albumInformation: null, songs: null };

    const { data: songs } = await supabase
      .from('song')
      .select('*, artist(artist_id, name)')
      .eq('album_id', albumID);

    const albumCover = supabase.storage
      .from('album_covers')
      .getPublicUrl(albumInformation?.album_id.toString());

    return {
      albumInformation,
      image: albumCover.data.publicUrl + '.jpg',
      songs,
    };
  }
);

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    clearAlbum: (state) => {
      state.songs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAlbum.fulfilled, (state, action) => {
        state.status = 'idle';

        const { songs, image } = action.payload;

        if (songs === null) {
          state.songs = [];
          return;
        }

        const { album_id, name, genre, label, release_year } =
          action.payload.albumInformation;

        // due to how Supabase returns either an object or an array of objects, we need to check for both cases and make it an array of objects
        const artists = songs.flatMap((song) => {
          const artistList = Array.isArray(song.artist)
            ? song.artist
            : [song.artist];
          return artistList.map((artist) => ({
            artist_id: artist?.artist_id!,
            name: artist?.name!,
          }));
        });

        // filter out duplicates
        const filteredArtists = artists.filter(
          (artist, index, self) =>
            index ===
            self.findIndex(
              (otherArtist) => otherArtist.artist_id === artist.artist_id
            )
        );

        state.album = {
          album_id,
          name,
          artists: filteredArtists,
          image,
          genre,
          label,
          release_year,
        };

        state.songs = songs.map((song) => ({
          id: song.song_id,
          artistID: song.artist_id,
          name: song.name,
          artistName: null,
          albumName: null,
          albumID: song.album_id,
          duration: null,
          url: null,
          albumCover: null,
          createdAt: null,
          updatedAt: null,
        }));
      });
  },
});

export const { clearAlbum } = albumSlice.actions;

export default albumSlice.reducer;
