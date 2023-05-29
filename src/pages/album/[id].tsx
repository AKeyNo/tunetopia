import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks/reduxHooks';
import { getAlbum } from '../../../lib/slices/albumSlice';
import Image from 'next/image';
import { SongListItem } from '@/components/song/SongListItem';
import { SongHeaderRow } from '@/components/layout/SongHeaderRow';
import { useState } from 'react';

export default function AlbumPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const albumState = useAppSelector((state) => state.album);
  const { album, songs } = albumState;
  const { id } = router.query;

  const [averagePixelColor, setAveragePixelColor] = useState('');

  const artistNames = Array.isArray(album?.artists)
    ? album?.artists.map((artist) => artist.name).join(', ')
    : album?.artists?.name;

  useEffect(() => {
    if (!id) return;

    dispatch(getAlbum(Number(id)));
  }, [dispatch, id]);

  if (albumState.status == 'loading') return <>loading...</>;

  if (albumState.album == null) return <>album not found</>;

  const getAveragePixelColor = async (event: any) => {
    const img = event.target;
    const { width, height } = img;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let r = 0;
    let g = 0;
    let b = 0;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }

    const pixels = data.length / 4;
    const avgR = Math.round(r / pixels);
    const avgG = Math.round(g / pixels);
    const avgB = Math.round(b / pixels);

    const hexR = avgR.toString(16).padStart(2, '0');
    const hexG = avgG.toString(16).padStart(2, '0');
    const hexB = avgB.toString(16).padStart(2, '0');

    const hexColor = `#${hexR}${hexG}${hexB}`;

    setAveragePixelColor(hexColor);
  };

  return (
    <div className='grid w-full h-full grid-rows-2 grid-cols-[16rem_auto] gap-x-4 gap-y-4'>
      <div
        className={`fixed top-0 left-0 h-96 w-full bg-gradient-to-b from-[${averagePixelColor}] opacity-25`}
      />
      <div className='relative z-10 w-64 h-64'>
        <Image
          className='object-cover'
          src={album?.image ?? ''}
          alt={`${album?.name}'s album cover`}
          fill
          onLoad={(e) => getAveragePixelColor(e)}
        />
      </div>
      <div className='z-10 flex flex-col justify-center h-full'>
        <div>
          <span className='text-4xl font-bold select-none'>{album?.name}</span>
        </div>
        <div>
          <span>{artistNames}</span>
        </div>
        <div>
          <span className='text-sm select-none'>{songs.length} songs</span>
        </div>
      </div>
      <ol className='z-10 col-span-2'>
        <SongHeaderRow />
        <SongListItem song={songs[0]} listNumber={1} />
      </ol>
    </div>
  );
}
