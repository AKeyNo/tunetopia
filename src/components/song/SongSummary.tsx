import { X } from '@phosphor-icons/react';
import { SongToUpload } from '../../../lib/types/music';
import { useState } from 'react';

export const SongSummary: React.FC<{
  song: SongToUpload;
  onClick: (id: number) => void;
}> = ({ song, onClick }) => {
  const [isHoveringOverX, setIsHoveringOverX] = useState(false);

  return (
    <li className='flex items-center h-12 p-4 text-lg duration-75 select-none hover:bg-slate-700 gap-x-4'>
      <X
        className='duration-100'
        color={isHoveringOverX ? 'red' : 'white'}
        onClick={() => onClick(song.id!)}
        onMouseEnter={() => setIsHoveringOverX(true)}
        onMouseLeave={() => setIsHoveringOverX(false)}
      />
      <span>
        {song.name} by {song.artistName}
      </span>
    </li>
  );
};
