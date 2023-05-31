import { Song } from '../../../lib/types/music';
import { Pause, Play } from '@phosphor-icons/react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { useState } from 'react';
import {
  updateIsPlaying,
  updateSong,
} from '../../../lib/slices/currentlyPlayingSlice';

export const SongListItem: React.FC<{ song: Song; listNumber: number }> = ({
  song,
  listNumber,
}) => {
  const dispatch = useAppDispatch();
  const currentlyPlayingSongID = useAppSelector(
    (state) => state.currentPlaying.currentSong.id
  );
  const isPlaying = useAppSelector((state) => state.currentPlaying.isPlaying);

  const [isHoveringOverAlbumCover, setIsHoveringOverAlbumCover] =
    useState(false);

  const showPlayIcon =
    (currentlyPlayingSongID === song.id && !isPlaying) ||
    currentlyPlayingSongID !== song.id;

  return (
    <li className='flex items-center h-12 p-4 text-lg duration-75 select-none hover:bg-slate-700 gap-x-4'>
      <div
        className='relative'
        onMouseEnter={() => setIsHoveringOverAlbumCover(true)}
        onMouseLeave={() => setIsHoveringOverAlbumCover(false)}
      >
        <div
          className='object-cover duration-75 hover:opacity-0'
          onClick={() => {
            if (currentlyPlayingSongID !== song.id) {
              dispatch(updateSong(song.id!.toString()));
              return dispatch(updateIsPlaying(true));
            }

            if (currentlyPlayingSongID === song.id && isPlaying) {
              return dispatch(updateIsPlaying(false));
            }

            return dispatch(updateIsPlaying(true));
          }}
          data-cy={`song-list-item-album-number-${song.id}`}
        >
          {listNumber}
        </div>
        <Play
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 ${
            isHoveringOverAlbumCover && showPlayIcon
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          weight='fill'
        />
        <Pause
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 ${
            isHoveringOverAlbumCover && !showPlayIcon
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          weight='fill'
        />
      </div>
      <div>{song.name}</div>
    </li>
  );
};
