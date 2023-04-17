import { Divider } from '@/components/layout/Divider';
import * as Separator from '@radix-ui/react-separator';
import Image from 'next/image';

export default function Home() {
  return (
    <div className='w-full p-4 pt-0 space-y-4 h-max bg-slate-900'>
      <div>
        <h1 className='text-3xl font-bold select-none'>Jump back in</h1>
        <h2 className='select-none text-slate-300'>
          The most recent playlists you have listened to.
        </h2>
        <Separator.Root
          className='h-[1px] my-4 bg-slate-700'
          decorative
          orientation='vertical'
        />
        <div className='flex space-x-4'>
          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-playlist-1.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Chill Drive</div>
            </div>
          </div>
          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-playlist-2.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Salsa Fiesta</div>
            </div>
          </div>
          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-playlist-3.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Time to Sleep</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-3xl font-bold select-none'>New releases</h1>
        <h2 className='select-none text-slate-300'>
          New hits that you can&apos;t miss.
        </h2>
        <Separator.Root
          className='h-[1px] my-4 bg-slate-700'
          decorative
          orientation='vertical'
        />

        <div className='flex w-full gap-x-4'>
          <div className='w-1/5'>
            <div className='relative flex overflow-hidden h-96'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-2.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Petals for Eyes</div>
              <div className='text-slate-300'>Floral Vision</div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className='relative flex overflow-hidden h-96'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-3.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>goodnight.</div>
              <div className='text-slate-300'>midnight echoes</div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className='relative flex overflow-hidden h-96'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-4.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Lovestruck Serenade</div>
              <div className='text-slate-300'>
                Paper Planes and Plastic Cups
              </div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className='relative flex overflow-hidden h-96'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-5.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>The Wandering Glance</div>
              <div className='text-slate-300'>Alexander Cole</div>
            </div>
          </div>
          <div className='w-1/5'>
            <div className='relative flex overflow-hidden h-96'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-6.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Backroad Blues</div>
              <div className='text-slate-300'>Dusty Boots</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-3xl font-bold select-none'>Recommended for you</h1>
        <h2 className='select-none text-slate-300'>Top album picks for you.</h2>
        <Separator.Root
          className='h-[1px] my-4 bg-slate-700'
          decorative
          orientation='vertical'
        />
        <div className='flex pb-4 space-x-4 overflow-x-auto'>
          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-7.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Echoes of Euphoria</div>
              <div className='text-slate-300'>Midnight Mirage</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-8.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Fading Memories</div>
              <div className='text-slate-300'>Lost in Time</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-9.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>manger un croissant</div>
              <div className='text-slate-300'>pierre</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-10.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>forever.</div>
              <div className='text-slate-300'>yesterday</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-11.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Workout Hits</div>
              <div className='text-slate-300'>Various Artists</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-12.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Broken Reflections</div>
              <div className='text-slate-300'>Shattered Echoes</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-13.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>HALO</div>
              <div className='text-slate-300'>SAM</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-14.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Chasing the Sun</div>
              <div className='text-slate-300'>Solar Flares</div>
            </div>
          </div>

          <div>
            <div className='relative flex overflow-hidden w-44 h-44'>
              <Image
                className='object-cover duration-200 hover:scale-110'
                src='/sample-album-15.jpg'
                alt='album-cover'
                fill
              />
            </div>
            <div className='flex flex-col'>
              <div className='font-semibold'>Whispers in the Wind</div>
              <div className='text-slate-300'>Silent Voices</div>
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
}
