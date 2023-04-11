import { PropsWithChildren } from 'react';
import { Sidebar } from './Sidebar';
import { PlayBar } from './PlayBar';

export const Layout: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className='grid w-screen h-screen grid-cols-[300px_auto] grid-rows-[auto_100px]'>
      <Sidebar className='col-span-1 row-span-1' />
      <div className='flex h-full col-span-1 row-span-1'>{children}</div>
      <PlayBar className='col-span-2 row-span-1' />
    </div>
  );
};
