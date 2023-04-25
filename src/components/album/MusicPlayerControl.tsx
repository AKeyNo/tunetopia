import {
  PauseCircle,
  PlayCircle,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react';
import * as Slider from '@radix-ui/react-slider';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { updateIsPlaying } from '../../../lib/slices/currentlyPlayingSlice';

export const MusicPlayerControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.currentPlaying.isPlaying);

  const showPlayPauseButton = () => {
    if (!isPlaying) {
      return (
        <button
          onClick={() => {
            dispatch(updateIsPlaying(true));
          }}
        >
          <PlayCircle
            className='duration-200 text-slate-200 hover:text-slate-100'
            size={48}
            weight='fill'
          />
        </button>
      );
    }

    return (
      <button
        onClick={() => {
          dispatch(updateIsPlaying(false));
        }}
      >
        <PauseCircle
          className='duration-200 text-slate-200 hover:text-slate-100'
          size={48}
          weight='fill'
        />
      </button>
    );
  };

  return (
    <div>
      <div className='flex items-center justify-center space-x-5'>
        <Shuffle
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={24}
          weight='fill'
        />
        <SkipBack
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={24}
          weight='fill'
        />
        {showPlayPauseButton()}
        <SkipForward
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={24}
          weight='fill'
        />
        <Repeat
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={24}
          weight='fill'
        />
      </div>
      <div className='flex items-center space-x-2'>
        <span className='select-none'>1:30</span>
        <form>
          <Slider.Root
            className='relative flex items-center h-2 select-none touch-none w-96'
            defaultValue={[0]}
            max={100}
            step={1}
            aria-label='Progress Bar'
          >
            <Slider.Track className='relative flex-grow h-1 rounded-full bg-slate-700'>
              <Slider.Range className='absolute h-full rounded-full bg-slate-300' />
            </Slider.Track>
            <Slider.Thumb className='block w-[20px] h-[20px] rounded-full bg-white shadow-md border-[10px] hover:bg-slate-100 duration-200 focus:outline-none focus:shadow-sm' />
          </Slider.Root>
        </form>
        <span className='select-none'>3:00</span>
      </div>
    </div>
  );
};
