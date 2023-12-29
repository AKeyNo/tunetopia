import React from 'react';

export type MenuItem = {
  id: string;
  label: string;
  onClick: () => void;
};

type ContextMenuProps = {
  contextMenuRef: React.RefObject<HTMLDivElement>;
  contextMenu: { visible: boolean; x: number; y: number };
  menuItems: MenuItem[];
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenuRef,
  contextMenu,
  menuItems,
}) => {
  if (!contextMenu.visible) {
    return null;
  }

  return (
    <div
      ref={contextMenuRef}
      className={`fixed bg-gray-800 border border-gray-300 z-50 text-white shadow-md ${
        contextMenu.visible ? 'block' : 'hidden'
      }`}
      style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
    >
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={item.onClick}
          className='p-2 duration-100 cursor-default hover:bg-gray-600 round-md'
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
