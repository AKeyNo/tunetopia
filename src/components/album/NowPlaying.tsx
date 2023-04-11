import { Heart } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';

export const NowPlaying: React.FC = () => {
  const [isHoveringOverHeart, setIsHoveringOverHeart] = useState(false);

  return (
    <div className='relative flex items-center w-auto h-full gap-x-5'>
      <div className='relative cursor-pointer'>
        <Image
          src='/sample-album-1.jpg'
          alt='album-cover'
          height='75'
          width='75'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <div className='font-semibold cursor-pointer hover:underline text-slate-100 hover:text-white underline-offset-2'>
          Phantom Love
        </div>
        <div className='text-sm duration-200 cursor-pointer hover:underline text-slate-300 hover:text-white underline-offset-2'>
          The Unseen
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
