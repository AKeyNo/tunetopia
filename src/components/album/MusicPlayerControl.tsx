import {
  PauseCircle,
  PlayCircle,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { updateIsPlaying } from '../../../lib/slices/currentlyPlayingSlice';
import { RefObject } from 'react';
import { Slider } from '../ui/input/Slider';

export const MusicPlayerControl: React.FC<{
  changeSongProgress: (timeInSeconds: number) => void;
  progressBarRef: RefObject<HTMLInputElement>;
}> = ({ changeSongProgress, progressBarRef }) => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.currentPlaying.isPlaying);
  const songProgress = useAppSelector(
    (state) => state.currentPlaying.songProgress
  );
  const songDuration = useAppSelector(
    (state) => state.currentPlaying.currentSong.duration
  );

  const formatTime = (time: number | null) => {
    if (!time || isNaN(time)) {
      return '00:00';
    }

    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  };

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
      <div className='flex items-center justify-center flex-grow space-x-5'>
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
        <span className='select-none'>{formatTime(songProgress)}</span>
        <form className='flex items-center'>
          <Slider
            className='w-96'
            value={songProgress!}
            ref={progressBarRef}
            onChange={(e) => {
              changeSongProgress(e.target.valueAsNumber);
            }}
            max={136}
          />
        </form>
        <span className='select-none'>{formatTime(songDuration)}</span>
      </div>
    </div>
  );
};
