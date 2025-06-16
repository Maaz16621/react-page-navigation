import React, { useRef, useEffect } from 'react';
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, FlagIcon } from '../constants'; // Added FlagIcon

interface ContextMenuProps {
  pageId: string;
  position: { x: number; y: number };
  onSetAsFirstPage: (pageId: string) => void; // New prop
  onRename: (pageId: string) => void;
  onDuplicate: (pageId: string) => void; // This will now be 'onCopy' effectively
  onDelete: (pageId: string) => void;
  onClose: () => void;
  triggerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  pageId,
  position,
  onSetAsFirstPage,
  onRename,
  onDuplicate, // Keep prop name, but label changes
  onDelete,
  onClose,
  triggerButtonRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerButtonRef.current && 
        !triggerButtonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, triggerButtonRef]);

  const handleAction = (action: () => void) => {
    action();
    onClose(); 
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white shadow-xl rounded-md py-2 w-48 border border-slate-200"
      style={{ top: position.y, left: position.x }}
      data-testid={`context-menu-${pageId}`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`page-item-${pageId}-options-button`} 
    >
      <button
        onClick={() => handleAction(() => onSetAsFirstPage(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <FlagIcon /> Set as first page
      </button>
      <button
        onClick={() => handleAction(() => onRename(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <PencilIcon /> Rename
      </button>
      <button
        onClick={() => handleAction(() => onDuplicate(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <DocumentDuplicateIcon /> Copy
      </button>
      <button
        onClick={() => handleAction(() => onDelete(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center transition-colors"
        role="menuitem"
      >
        <TrashIcon /> Delete
      </button>
    </div>
  );
};

export default ContextMenu;