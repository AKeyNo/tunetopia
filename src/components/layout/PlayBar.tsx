import { useEffect, useRef } from 'react';
import { NowPlaying } from '../album/NowPlaying';
import { MusicPlayerControl } from '../album/MusicPlayerControl';
import { SoundControl } from '../album/SoundControl';
import { useAppSelector } from '../../../lib/hooks/reduxHooks';

export const PlayBar: React.FC<{ className: string }> = ({ className }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentlyPlaying = useAppSelector((state) => state.currentPlaying);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (currentlyPlaying.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentlyPlaying.isPlaying]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = currentlyPlaying.volume;
  }, [currentlyPlaying.volume]);

  return (
    <div
      className={
        'p-4 bg-neutral-950 flex justify-between items-center' +
        `${' '}${className}`
      }
    >
      <audio src='Hurt - Rangga Fermata.mp3' ref={audioRef} />
      <NowPlaying />
      <MusicPlayerControl />
      <SoundControl />
    </div>
  );
};
