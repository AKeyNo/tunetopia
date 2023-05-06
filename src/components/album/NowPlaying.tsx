import { Heart } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';
import { useAppSelector } from '../../../lib/hooks/reduxHooks';

export const NowPlaying: React.FC = () => {
  const albumCover = useAppSelector((state) => state.currentPlaying.albumCover);
  const songName = useAppSelector((state) => state.currentPlaying.songName);
  const artistName = useAppSelector((state) => state.currentPlaying.artistName);

  const [isHoveringOverHeart, setIsHoveringOverHeart] = useState(false);

  return (
    <div className='relative flex items-center flex-grow w-full h-full gap-x-5'>
      <div className='relative cursor-pointer'>
        <Image
          src={albumCover || '/sample-album-2.jpg'}
          alt='album-cover'
          height='75'
          width='75'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <div className='font-semibold cursor-pointer hover:underline text-slate-100 hover:text-white underline-offset-2'>
          {songName || 'Song Name'}
        </div>
        <div className='text-sm duration-200 cursor-pointer hover:underline text-slate-300 hover:text-white underline-offset-2'>
          {artistName}
        </div>
      </div>

      <Heart
        size={20}
        weight={isHoveringOverHeart ? 'regular' : 'light'}
        className='text-gray-400 duration-200'
        onMouseEnter={() => setIsHoveringOverHeart(true)}
        onMouseLeave={() => setIsHoveringOverHeart(false)}
      />
    </div>
  );
};
