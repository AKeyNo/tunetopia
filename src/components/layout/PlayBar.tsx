import { PropsWithChildren } from 'react';
import { NowPlaying } from '../album/NowPlaying';
import { MusicPlayerControl } from '../album/MusicPlayerControl';
import { SoundControl } from '../album/SoundControl';

export const PlayBar: React.FC<{ className: string }> = ({ className }) => {
  return (
    <div
      className={
        'p-4 bg-neutral-950 flex justify-between items-center' +
        `${' '}${className}`
      }
    >
      <NowPlaying />
      <MusicPlayerControl />
      <SoundControl />
    </div>
  );
};
