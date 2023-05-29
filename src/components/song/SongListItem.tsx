import { Song } from '../../../lib/types/music';

export const SongListItem: React.FC<{ song: Song; listNumber: number }> = ({
  song,
  listNumber,
}) => {
  return (
    <li className='flex items-center h-12 p-4 text-lg duration-75 select-none hover:bg-slate-700 gap-x-4'>
      <div>{listNumber}</div>
      <div>{song.name}</div>
    </li>
  );
};
