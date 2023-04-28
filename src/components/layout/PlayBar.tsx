import { useCallback, useEffect, useRef } from 'react';
import { NowPlaying } from '../album/NowPlaying';
import { MusicPlayerControl } from '../album/MusicPlayerControl';
import { SoundControl } from '../album/SoundControl';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { updateSongProgress } from '../../../lib/slices/currentlyPlayingSlice';

export const PlayBar: React.FC<{ className: string }> = ({ className }) => {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const playAnimationRef = useRef<number>(0);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const currentlyPlaying = useAppSelector((state) => state.currentPlaying);

  const changeSongProgress = (timeInSeconds: number) => {
    dispatch(updateSongProgress(timeInSeconds));
    if (!audioRef.current) return;

    audioRef.current.currentTime = timeInSeconds;
  };

  const drawProgress = useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) {
      return;
    }

    dispatch(updateSongProgress(audioRef.current.currentTime));
    progressBarRef.current.value = audioRef.current.currentTime.toString();

    playAnimationRef.current = requestAnimationFrame(drawProgress);
  }, [dispatch]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (currentlyPlaying.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    playAnimationRef.current = requestAnimationFrame(drawProgress);
  }, [audioRef, currentlyPlaying.isPlaying, drawProgress]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.volume = currentlyPlaying.volume / 100;
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
      <MusicPlayerControl
        changeSongProgress={changeSongProgress}
        progressBarRef={progressBarRef}
      />
      <SoundControl />
    </div>
  );
};
