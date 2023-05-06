import { useState } from 'react';
import { useAppDispatch } from '../../../lib/hooks/reduxHooks';
import { updateSong } from '../../../lib/slices/currentlyPlayingSlice';

export default function Search() {
  const dispatch = useAppDispatch();

  const [inputSongID, setInputSongID] = useState<string>('');

  const playSongID = (e: any) => {
    e.preventDefault();

    dispatch(updateSong(inputSongID));
  };

  return (
    <div>
      <form onSubmit={(e) => playSongID(e)}>
        <input
          className='w-20 text-black'
          type='text'
          onChange={(e) => setInputSongID(e.target.value)}
        />
        <button className='p-4 border-2 w-36'>Search</button>
      </form>
    </div>
  );
}
