import { Divider } from '@/components/layout/Divider';
import { FileUpload } from '@/components/ui/input/FileUpload';
import { SearchInput } from '@/components/ui/input/SearchInput';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Artist, SongToUpload } from '../../../lib/types/music';
import { Button } from '@/components/buttons/Button';
import * as jsmediatags from 'jsmediatags';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { SongSummary } from '@/components/song/SongSummary';
import { GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/router';

export default function Upload() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [albumTitle, setAlbumTitle] = useState<string>('');

  // store the draft song until it gets put into the songs array
  const [draftSong, setDraftSong] = useState<File | null>(null);
  const [draftSongTitle, setDraftSongTitle] = useState<string>('');
  const [draftSongArtist, setDraftSongArtist] = useState<string>('');
  const [draftSongArtistID, setDraftSongArtistID] = useState<number | null>();

  const [songs, setSongs] = useState<SongToUpload[]>([]);

  const [artistsFromSearch, setArtistsFromSearch] = useState<Artist[]>([]);

  const [newlyCreatedArtists, setNewlyCreatedArtists] = useState<
    { name: string }[]
  >([]);

  const [songCounter, setSongCounter] = useState<number>(0);

  useEffect(() => {
    if (draftSongArtistID || draftSongArtist == '') return;

    const quotedArtistName = draftSongArtist
      .split(' ')
      .map((word) => `'${word}'`)
      .join(' & ');

    const searchExistingArtists = setTimeout(async () => {
      const { data: artistData, error: artistError } = await supabase
        .from('artist')
        .select(
          'artist_id, name, description, image, is_solo, location, year_formed'
        )
        .textSearch('name', quotedArtistName);

      if (artistError) {
        console.error(artistError);
        return;
      }

      if (artistData) {
        setArtistsFromSearch(artistData);
      }
    }, 1000);

    return () => clearTimeout(searchExistingArtists);
  }, [draftSongArtist, draftSongArtistID, supabase]);

  const handleAlbumCoverChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setAlbumCover(file || null);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const handleAddSong = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setDraftSong(file || null);

    if (!file) return;

    jsmediatags.read(file, {
      onSuccess: function (tag: any) {
        const { title, artist } = tag.tags;

        setDraftSongTitle(title);
        setDraftSongArtist(artist);
        setDraftSongArtistID(null);
      },
      onError: function (error: any) {
        console.error(error);
      },
    });
  };

  const handleAddSongToList = () => {
    // append the draft song to the songs array
    const newSong: SongToUpload = {
      id: songCounter,
      name: draftSongTitle,
      artistName: draftSongArtist,
      artistID: draftSongArtistID || null,
      file: draftSong,
    };

    setSongs([...songs, newSong]);
    setDraftSong(null);
    setDraftSongTitle('');
    setDraftSongArtist('');
    setSongCounter(songCounter + 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data: albumData, error: albumError } = await supabase
      .from('album')
      .insert([
        {
          name: albumTitle,
        },
      ])
      .select();

    if (albumError) {
      return console.error(albumError);
    }

    const { error } = await supabase.storage
      .from('album_covers')
      .upload(`${albumData[0].album_id}.jpg`, albumCover!);

    if (error) {
      console.error(error);
    }

    const { data: artistData, error: artistError } = await supabase
      .from('artist')
      .insert(newlyCreatedArtists)
      .select('name, artist_id');

    if (artistError) {
      return console.error(artistError);
    }

    for (const song of songs) {
      console.log('songs', songs);

      const matchingArtist = artistData?.find(
        (artist) => artist.name === song.artistName
      );

      console.log(matchingArtist, 'matchingArtist');

      const artistID =
        song.artistID == -1 ? matchingArtist?.artist_id : song.artistID;

      console.log(artistID, 'artistID');

      const { data: songData, error: songError } = await supabase
        .from('song')
        .insert([
          {
            name: song.name,
            artist_id: artistID,
            album_id: albumData[0].album_id,
          },
        ])
        .select();

      if (songError) {
        console.error(songError);
      }

      console.log('song', songData);

      const { error: songUploadError } = await supabase.storage
        .from('songs')
        .upload(`${songData![0].song_id}.mp3`, song.file!);

      if (songUploadError) {
        return console.error(songUploadError);
      }
    }

    // go to the album page
    router.push(`/album/${albumData![0].album_id}`);
  };

  const renderSongDefinitions = () => {
    const removeCurrentSong = (id: number) => {
      const newSongs = songs.filter((song) => song.id !== id);
      setSongs(newSongs);
    };

    return (
      <div>
        {songs.map((song) => {
          return (
            <SongSummary
              key={song.id}
              song={song}
              onClick={removeCurrentSong}
            />
          );
        })}
      </div>
    );
  };

  const renderArtistSearch = () => {
    const checkIfAlreadyCreated =
      newlyCreatedArtists.length == 0 ||
      newlyCreatedArtists.every((artist) => artist.name != draftSongArtist);

    return (
      <ul
        className={`absolute w-64 overflow-auto text-black bg-white rounded-md select-none max-h-32 duration-200 ${
          !draftSongArtistID && draftSongArtist != ''
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
        data-cy='upload-new-artist-list'
      >
        {checkIfAlreadyCreated &&
          newlyCreatedArtists.map((artist, key) => {
            return (
              <li
                key={key}
                className='p-2 cursor-pointer hover:bg-gray-200'
                onClick={() => {
                  setArtistsFromSearch([]);
                  setDraftSongArtist(artist.name);
                  setDraftSongArtistID(-1);
                }}
              >
                {artist.name} (Just Created)
              </li>
            );
          })}
        {
          <li
            className='p-2 cursor-pointer hover:bg-gray-200'
            onClick={() => {
              setArtistsFromSearch([]);
              setDraftSongArtistID(-1);
              setNewlyCreatedArtists([
                ...newlyCreatedArtists,
                { name: draftSongArtist },
              ]);
            }}
          >
            New Artist ({draftSongArtist})
          </li>
        }
        {artistsFromSearch.map((artist) => {
          return (
            <li
              key={artist.artist_id}
              className='p-2 cursor-pointer hover:bg-gray-200'
              onClick={() => {
                setArtistsFromSearch([]);
                setDraftSongArtist(artist.name);
                setDraftSongArtistID(artist.artist_id);
                console.log('artist_id new: ', artist.artist_id);
              }}
            >
              {artist.name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className='w-full space-y-4 h-max bg-slate-900'>
      <Divider heading='Upload an Album' subheading='Upload your music here.'>
        <div>
          <span>
            A newly uploaded album will be made available to everyone on this
            site. Any material you submit through this service is assumed to be
            owned by you or that you possess the necessary rights and
            permissions to upload it.
          </span>
        </div>
      </Divider>
      <form onSubmit={handleSubmit}>
        <Divider heading='Album Information' subheading=''>
          <div>
            {imageUrl && (
              <Image
                src={imageUrl}
                alt='Album Image Preview'
                width={250}
                height={250}
              />
            )}
            <FileUpload
              label='Upload Album Cover'
              handleFileChange={handleAlbumCoverChange}
              accept='image/jpeg'
              required
              data-cy='upload-album-cover'
            />
          </div>
          <SearchInput
            label='Album'
            onChange={setAlbumTitle}
            data-cy='upload-album-title-input'
            required
            value={albumTitle}
          />
        </Divider>
        <Divider heading='Song Upload' subheading=''>
          <FileUpload
            label='Upload Song'
            handleFileChange={handleAddSong}
            accept='audio/mpeg'
            required
            data-cy='upload-song-input'
          />
          <div className='my-4'>
            <SearchInput
              label='Song Title'
              onChange={setDraftSongTitle}
              data-cy='upload-song-title-input'
              value={draftSongTitle}
            />
            <div className='relative'>
              <SearchInput
                label='Artist'
                onChange={(value) => {
                  setDraftSongArtistID(null);
                  setDraftSongArtist(value);
                }}
                data-cy='upload-song-artist-input'
                value={draftSongArtist}
              />
              {/* {!draftSongArtistID && draftSongArtist && (
                <ul className='absolute w-64 overflow-auto text-black bg-white rounded-md select-none max-h-32'>
                  <li className='p-2'>New Artist</li>
                  <li className='p-2'>Artist 1</li>
                  <li className='p-2'>Artist 2</li>
                  <li className='p-2'>Artist 3</li>
                </ul>
              )} */}

              {renderArtistSearch()}
            </div>
          </div>
          {draftSong && (
            <Button
              type='button'
              onClick={handleAddSongToList}
              data-cy='upload-song-add-song'
            >
              Add Song
            </Button>
          )}
        </Divider>
        <Divider heading='Album Summary' subheading=''>
          {renderSongDefinitions()}
          {songs.length > 0 && (
            <Button type='submit' data-cy='upload-song-submit-button'>
              Submit
            </Button>
          )}
        </Divider>
      </form>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(context);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
