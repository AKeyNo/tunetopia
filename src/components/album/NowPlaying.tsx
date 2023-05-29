import Image from 'next/image';
import { useAppSelector } from '../../../lib/hooks/reduxHooks';
import { HeartButton } from '../buttons/HeartButton';

export const NowPlaying: React.FC = () => {
  const albumCover = useAppSelector(
    (state) => state.currentPlaying.currentSong.albumCover
  );
  const songName = useAppSelector(
    (state) => state.currentPlaying.currentSong.name
  );
  const artistName = useAppSelector(
    (state) => state.currentPlaying.currentSong.artistName
  );

  return (
    <div className='relative flex items-center flex-grow w-full h-full gap-x-5'>
      <div className='relative w-20 h-20 cursor-pointer'>
        <Image
          className='object-cover'
          src={albumCover || '/sample-album-2.jpg'}
          alt='album-cover'
          fill
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
      <HeartButton />
    </div>
  );
};
