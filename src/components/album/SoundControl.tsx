import { MicrophoneStage, SpeakerHigh } from '@phosphor-icons/react';
import * as Slider from '@radix-ui/react-slider';

export const SoundControl: React.FC = () => {
  return (
    <div className='flex items-center space-x-4'>
      <MicrophoneStage
        className='duration-200 text-slate-400 hover:text-slate-200'
        size={16}
        weight='duotone'
      />
      <SpeakerHigh
        className='duration-200 text-slate-400 hover:text-slate-200'
        size={16}
        weight='duotone'
      />
      <form>
        <Slider.Root
          className='relative flex items-center h-2 select-none w-36 touch-none'
          defaultValue={[0]}
          max={100}
          step={1}
          aria-label='Volume'
        >
          <Slider.Track className='relative flex-grow h-1 rounded-full bg-slate-700'>
            <Slider.Range className='absolute h-full rounded-full bg-slate-300' />
          </Slider.Track>
          <Slider.Thumb className='block w-[20px] h-[20px] rounded-full bg-white shadow-md border-[10px] hover:bg-slate-100 duration-200 focus:outline-none focus:shadow-sm' />
        </Slider.Root>
      </form>
    </div>
  );
};
