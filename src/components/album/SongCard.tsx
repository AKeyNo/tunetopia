import { useState } from 'react';
import Image from 'next/image';
import { Song } from '../../../lib/types/music';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { updateSong } from '../../../lib/slices/currentlyPlayingSlice';
import { updateIsPlaying } from '../../../lib/slices/currentlyPlayingSlice';
import { HeartButton } from '../buttons/HeartButton';
import { Pause, Play } from '@phosphor-icons/react';
import Link from 'next/link';
import useContextMenu from '../../../lib/hooks/useContextMenu';
import ContextMenu from '../layout/ContextMenu';
import { MenuItem } from '../layout/ContextMenu';

export const SongCard: React.FC<{ song: Song }> = ({ song }) => {
  const dispatch = useAppDispatch();
  const { contextMenu, handleRightClick, contextMenuRef } = useContextMenu();
  const currentlyPlayingSongID = useAppSelector(
    (state) => state.currentPlaying.currentSong.id
  );
  const isPlaying = useAppSelector((state) => state.currentPlaying.isPlaying);

  const [isHoveringOverAlbumCover, setIsHoveringOverAlbumCover] =
    useState(false);

  if (!song) return null;

  const showPlayIcon =
    (currentlyPlayingSongID === song.id && !isPlaying) ||
    currentlyPlayingSongID !== song.id;

  const menuItems: MenuItem[] = [
    {
      id: '1',
      label: 'Menu Item 1',
      onClick: () => {
        console.log('Menu Item 1 clicked');
      },
    },
    {
      id: '2',
      label: 'Menu Item 2',
      onClick: () => {
        console.log('Menu Item 2 clicked');
      },
    },
  ];

  return (
    <div
      className='grid items-center h-20 grid-cols-[5rem_auto_auto] grid-rows-2 w-96 hover:bg-slate-800 b-4 gap-x-4 duration-75'
      onContextMenu={handleRightClick}
      data-cy={`song-card-${song.id}`}
    >
      <ContextMenu
        menuItems={menuItems}
        contextMenu={contextMenu}
        contextMenuRef={contextMenuRef}
      />
      <div
        className='relative w-full h-full row-span-2'
        onMouseEnter={() => setIsHoveringOverAlbumCover(true)}
        onMouseLeave={() => setIsHoveringOverAlbumCover(false)}
        data-cy={`song-card-album-cover-${song.id}`}
      >
        <Image
          className='object-cover duration-75 hover:opacity-50'
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
          src={song.albumCover || '/sample-album-2.jpg'}
          alt='album-cover'
          fill
        />
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
      <div className='pt-4 font-semibold cursor-pointer hover:underline text-slate-100 hover:text-white underline-offset-2'>
        <Link
          href={`/album/${song.albumID}`}
          replace
          data-cy={`song-card-song-name-${song.id}`}
        >
          {song.name}
        </Link>
      </div>
      <div className='flex justify-end w-full row-span-2 pr-4'>
        <HeartButton size={24} />
      </div>
      <div className='pb-4 text-sm duration-200 cursor-pointer hover:underline text-slate-300 hover:text-white underline-offset-2'>
        <Link
          href={`/artist/${song.artistID}`}
          replace
          data-cy={`song-card-artist-name-${song.id}`}
        >
          {song.artistName}
        </Link>
      </div>
    </div>
  );
};
