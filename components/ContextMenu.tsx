/**
 * @file ContextMenu.tsx
 * Renders a context menu with actions for a page item (e.g., Rename, Duplicate, Delete).
 * It positions itself based on coordinates and handles closing on outside clicks or Escape key.
 */
import React, { useRef, useEffect } from 'react';
import { PencilIcon, DocumentDuplicateIcon, TrashIcon, FlagIcon, ClipboardIcon } from '../constants'; 

/**
 * Props for the ContextMenu component.
 */
interface ContextMenuProps {
  /** The ID of the page this context menu is for. */
  pageId: string;
  /** The x and y coordinates for positioning the menu. */
  position: { x: number; y: number };
  /** Callback to set the current page as the first page. */
  onSetAsFirstPage: (pageId: string) => void;
  /** Callback to initiate renaming the page. */
  onRename: (pageId: string) => void;
  /** Callback to create a copy of the page. */
  onCopy: (pageId: string) => void;
  /** Callback to duplicate the page (can have distinct behavior from copy). */
  onDuplicateActual: (pageId: string) => void;
  /** Callback to delete the page. */
  onDelete: (pageId: string) => void;
  /** Callback to close the context menu. */
  onClose: () => void;
  /** 
   * Ref to the button element that triggered this context menu.
   * Used to prevent clicks on the trigger button from immediately closing the menu it opened.
   */
  triggerButtonRef: React.RefObject<HTMLButtonElement | null>;
}

/**
 * ContextMenu component.
 * Displays a list of actions for a given page.
 */
const ContextMenu: React.FC<ContextMenuProps> = ({
  pageId,
  position,
  onSetAsFirstPage,
  onRename,
  onCopy,
  onDuplicateActual,
  onDelete,
  onClose,
  triggerButtonRef,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Effect to handle clicks outside the context menu and the Escape key to close the menu.
   * It adds event listeners when the menu mounts and removes them on unmount.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close if click is outside menu AND outside the button that triggered it
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerButtonRef.current && 
        !triggerButtonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, triggerButtonRef]); // Dependencies: onClose callback and triggerButtonRef

  /**
   * Helper function to execute an action and then close the menu.
   * @param {() => void} action - The action callback to execute.
   */
  const handleAction = (action: () => void) => {
    action();
    onClose(); 
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white shadow-xl rounded-md pt-0 w-48 border border-slate-200"
      style={{ top: position.y, left: position.x }}
      data-testid={`context-menu-${pageId}`} // For testing purposes
      role="menu" // ARIA role for a menu
      aria-orientation="vertical" // Indicates the menu items are arranged vertically
      aria-labelledby={`page-item-${pageId}-options-button`} // Associates menu with its trigger button (assuming trigger has this ID)
    >
      {/* Settings Title Area */}
      <div className="px-4 py-2 mb-1 border-b border-slate-200 bg-[#FAFBFC]">
        <h3 className="text-sm font-semibold text-slate-800">Settings</h3>
      </div>

      {/* Set as first page action */}
      <button
        onClick={() => handleAction(() => onSetAsFirstPage(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem" // ARIA role for a menu item
      >
        <FlagIcon className="w-4 h-4 mr-2 text-blue-600" /> Set as first page
      </button>

      {/* Rename action */}
      <button
        onClick={() => handleAction(() => onRename(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <PencilIcon /> Rename
      </button>

      {/* Copy action */}
      <button
        onClick={() => handleAction(() => onCopy(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <ClipboardIcon /> Copy
      </button>

      {/* Duplicate action */}
      <button
        onClick={() => handleAction(() => onDuplicateActual(pageId))}
        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center transition-colors"
        role="menuitem"
      >
        <DocumentDuplicateIcon /> Duplicate
      </button>
      
      {/* Divider before delete */}
      <div className="flex justify-center my-1 px-2"> {/* Added px-2 for slight inset */}
        <hr className="w-4/5 border-t border-slate-300" /> 
      </div>

      {/* Delete action */}
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