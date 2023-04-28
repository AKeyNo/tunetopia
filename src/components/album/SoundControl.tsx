import {
  MicrophoneStage,
  SpeakerHigh,
  SpeakerLow,
  SpeakerNone,
  SpeakerX,
} from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { updateVolume } from '../../../lib/slices/currentlyPlayingSlice';
import { Slider } from '../ui/input/Slider';

export const SoundControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.currentPlaying.volume);

  const getSpeakerIcon = () => {
    if (volume === 0) {
      return (
        <SpeakerX
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={16}
          weight='duotone'
        />
      );
    } else if (volume < 33) {
      return (
        <SpeakerNone
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={16}
          weight='duotone'
        />
      );
    } else if (volume < 66) {
      return (
        <SpeakerLow
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={16}
          weight='duotone'
        />
      );
    } else {
      return (
        <SpeakerHigh
          className='duration-200 text-slate-400 hover:text-slate-200'
          size={16}
          weight='duotone'
        />
      );
    }
  };

  return (
    <div className='flex items-center justify-end flex-grow w-full space-x-4'>
      <MicrophoneStage
        className='duration-200 text-slate-400 hover:text-slate-200'
        size={16}
        weight='duotone'
      />
      {getSpeakerIcon()}
      <form className='flex items-center'>
        <Slider
          className='w-40'
          value={volume}
          max={100}
          onChange={(e) => {
            dispatch(updateVolume(e.target.valueAsNumber));
          }}
        />
      </form>
    </div>
  );
};
