import { useRouter } from 'next/router';
import { SidebarButton } from '../buttons/SidebarButton';

export const Sidebar: React.FC<{ className: string }> = ({ className }) => {
  const router = useRouter();

  return (
    <aside
      className={
        'flex flex-col w-full h-full p-4 space-y-2 overflow-y-auto bg-black ' +
        className
      }
    >
      <h1 className='text-xl font-bold select-none'>TuneTopia</h1>
      <ul className='space-y-2'>
        <SidebarButton
          onClick={() => router.push('/')}
          data-cy='sidebar-button-home'
        >
          Home
        </SidebarButton>
        <SidebarButton
          onClick={() => router.push('/search')}
          data-cy='sidebar-button-search'
        >
          Search
        </SidebarButton>
        <SidebarButton data-cy='sidebar-button-library'>Library</SidebarButton>
        <SidebarButton
          onClick={() => router.push('/upload')}
          data-cy='sidebar-button-upload'
        >
          Upload
        </SidebarButton>
        <SidebarButton data-cy='sidebar-button-create-a-playlist'>
          Create a Playlist
        </SidebarButton>
      </ul>
      <h2 className='text-lg font-semibold select-none'>Playlists</h2>
      <ul
        className='space-y-2 overflow-y-auto min-h-[7rem]'
        data-cy='playlists'
      >
        <SidebarButton>Playlist 1</SidebarButton>
        <SidebarButton>Playlist 2</SidebarButton>
        <SidebarButton>Playlist 3</SidebarButton>
        <SidebarButton>Playlist 4</SidebarButton>
        <SidebarButton>Playlist 5</SidebarButton>
      </ul>
    </aside>
  );
};
