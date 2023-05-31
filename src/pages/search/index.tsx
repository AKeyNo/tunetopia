import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { Divider } from '@/components/layout/Divider';
import { SearchInput } from '@/components/ui/input/SearchInput';
import { useRouter } from 'next/router';
import {
  clearResults,
  searchSongs,
} from '../../../lib/slices/searchResultsSlice';
import { SongCard } from '@/components/album/SongCard';

export default function Search() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const songResults = useAppSelector(
    (state) => state.searchResults.songResults
  );

  const [inputSongID, setInputSongID] = useState<string>('');

  useEffect(() => {
    if (inputSongID === router.query.q) {
      return;
    }

    if (inputSongID === '' && router.query.q === undefined) {
      dispatch(clearResults());
      return;
    }

    const delayDebounce = setTimeout(() => {
      if (inputSongID.length === 0 && router.query.q !== '') {
        return router.replace({ pathname: '/search' });
      }

      router.replace({ pathname: '/search', query: { q: inputSongID } });
      dispatch(searchSongs(inputSongID));
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [inputSongID, dispatch, router]);

  const songList = songResults.map((song) => {
    return <SongCard key={song.id} song={song} />;
  });

  return (
    <div>
      <Divider heading='Search' subheading='What do you want to listen to?'>
        <SearchInput onChange={setInputSongID} data-cy='search-page-input' />
      </Divider>

      <div className='flex flex-col'>
        <Divider heading='Songs'>{songList}</Divider>
        {/* <Divider heading='Artists' /> */}
      </div>
    </div>
  );
}
