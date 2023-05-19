import { configureStore } from '@reduxjs/toolkit';
import currentlyPlayingSlice from './lib/slices/currentlyPlayingSlice';
import searchResultsSlice from './lib/slices/searchResultsSlice';

export const store = configureStore({
  reducer: {
    currentPlaying: currentlyPlayingSlice,
    searchResults: searchResultsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
