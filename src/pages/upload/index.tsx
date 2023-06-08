import { Divider } from '@/components/layout/Divider';
import { FileUpload } from '@/components/ui/input/FileUpload';
import { SearchInput } from '@/components/ui/input/SearchInput';
import Image from 'next/image';
import { useState } from 'react';
import { Song } from '../../../lib/types/music';
import { Button } from '@/components/buttons/Button';
import * as jsmediatags from 'jsmediatags';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Upload() {
  const supabase = useSupabaseClient();

  const [albumCover, setAlbumCover] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [albumArtists, setAlbumArtists] = useState<string>('');

  // store the draft song until it gets put into the songs array
  const [draftSong, setDraftSong] = useState<File | null>(null);
  const [draftSongTitle, setDraftSongTitle] = useState<string>('');
  const [draftSongArtist, setDraftSongArtist] = useState<string>('');

  const [songs, setSongs] = useState<Song[]>([]);

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
    if (file) {
      jsmediatags.read(file, {
        onSuccess: function (tag: any) {
          const { title, artist } = tag.tags;

          console.log(title, artist);

          setDraftSongTitle(title);
          setDraftSongArtist(artist);
        },
        onError: function (error: any) {
          console.log(error);
        },
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('uploaded: ', albumCover, 'draft song', draftSong);

    // add the song to songs
    const newSong: Song = {
      id: null,
      artistID: null,
      albumID: null,
      name: draftSongTitle,
      artistName: draftSongArtist,
      albumName: albumTitle,
      duration: null,
      url: null,
      albumCover: null,
      createdAt: null,
      updatedAt: null,
    };

    setSongs([...songs, newSong]);

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

    if (albumData) {
      console.log(albumData);
    }

    const { error } = await supabase.storage
      .from('album_covers')
      .upload(`${albumData[0].album_id}.jpg`, albumCover!);

    if (error) {
      console.error(error);
    }

    // check if the artist exists
    const { data: artistData, error: artistError } = await supabase
      .from('artist')
      .select('artist_id')
      .eq('name', draftSongArtist)
      .single();

    if (artistError) {
      console.error(artistError);
      return;
    }

    let artistID: number;

    if (artistData) {
      // if the artist exists, use its ID in the songData insert
      artistID = artistData.artist_id;
    } else {
      // if the artist doesn't exist, create a new artist and use its ID in the songData insert
      const { data: newArtistData, error: newArtistError } = await supabase
        .from('artist')
        .insert({ name: draftSongArtist })
        .select();

      if (newArtistError) {
        console.error(newArtistError);
        return;
      }

      artistID = newArtistData[0].artist_id;
    }

    const { data: songData, error: songError } = await supabase
      .from('song')
      .insert([
        {
          name: draftSongTitle,
          artist_id: artistID,
          album_id: albumData[0].album_id,
        },
      ])
      .select();

    if (songError) {
      console.error(songError);
    }

    if (songData) {
      console.log('song', songData[0]);
    }

    const { error: songUploadError } = await supabase.storage
      .from('songs')
      .upload(`${songData![0].song_id}.mp3`, draftSong!);

    if (songUploadError) {
      console.error(songUploadError);
    }
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
            />
          </div>
          <SearchInput
            label='Album'
            onChange={setAlbumTitle}
            data-cy='upload-page-input'
            required
            value={albumTitle}
          />
          <SearchInput
            label='Album Artist(s)'
            onChange={setAlbumArtists}
            data-cy='upload-page-input'
            required
            value={albumArtists}
          />
        </Divider>
        <Divider heading='Song(s)' subheading=''>
          <FileUpload
            label='Upload Song'
            handleFileChange={handleAddSong}
            accept='audio/mpeg'
            required
          />
          <SearchInput
            label='Song Title'
            onChange={setDraftSongTitle}
            data-cy='upload-page-input'
            required
            value={draftSongTitle}
          />
          <SearchInput
            label='Artist'
            onChange={setDraftSongArtist}
            data-cy='upload-page-input'
            required
            value={draftSongArtist}
          />
        </Divider>
        <Divider heading='Album Summary' subheading=''>
          <div></div>
          <Button type='submit'>Submit</Button>
        </Divider>
      </form>
    </div>
  );
}
