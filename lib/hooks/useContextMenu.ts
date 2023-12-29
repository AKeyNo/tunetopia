import { useState, useEffect, useRef } from 'react';

const useContextMenu = () => {
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !(contextMenuRef.current as HTMLElement).contains(
          event.target as HTMLElement
        )
      ) {
        setContextMenu({ visible: false, x: 0, y: 0 });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setContextMenu({ visible: true, x: event.clientX, y: event.clientY });
  };

  return { contextMenu, handleRightClick, contextMenuRef };
};

export default useContextMenu;
