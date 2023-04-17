import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Sidebar } from './Sidebar';
import { PlayBar } from './PlayBar';
import { Header } from './Header';

export const Layout: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const childrenRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const childrenRefCurrent = childrenRef.current;

    const handleScroll = () => {
      setScrollPosition(childrenRef.current?.scrollTop || 0);
    };

    if (childrenRefCurrent) {
      childrenRefCurrent.addEventListener('scroll', handleScroll, {
        passive: true,
      });
    }

    return () => {
      if (childrenRefCurrent) {
        childrenRefCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='grid w-screen h-screen grid-cols-[300px_auto] grid-rows-[auto_100px]'>
      <Sidebar className='col-span-1 row-span-1' />
      <div
        className='flex flex-col h-full col-span-1 row-span-1 overflow-y-auto bg-slate-900'
        ref={childrenRef}
      >
        <Header scrollPosition={scrollPosition} />
        {children}
      </div>
      <PlayBar className='col-span-2 row-span-1' />
    </div>
  );
};
