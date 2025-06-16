
import React, { useRef } from 'react';
import type { Page, PageIconType } from './types'; // Corrected path, Added PageIconType
import { EllipsisVerticalIcon, InformationCircleIcon, DocumentIcon, CheckCircleIcon } from './constants'; // Corrected path, added new icons

interface PageItemProps {
  page: Page;
  iconType: PageIconType; // Added to determine which icon to show
  isActive: boolean;
  isDragged: boolean;
  onSelect: (id: string) => void;
  onDragStart: (id: string, event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  onOpenContextMenu: (pageId: string, buttonRef: React.RefObject<HTMLButtonElement>, event: React.MouseEvent) => void;
}

const PageItem: React.FC<PageItemProps> = ({
  page,
  iconType,
  isActive,
  isDragged,
  onSelect,
  onDragStart,
  onDragEnd,
  onOpenContextMenu,
}) => {
  const contextMenuButtonRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', page.id);
    onDragStart(page.id, event);
  };

  let IconComponent;
  switch (iconType) {
    case 'info':
      IconComponent = InformationCircleIcon;
      break;
    case 'ending':
      IconComponent = CheckCircleIcon;
      break;
    case 'document':
    default:
      IconComponent = DocumentIcon;
      break;
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      className={`
        flex items-center px-3 py-2 h-10 rounded-md cursor-grab
        transition-all duration-150 ease-in-out group flex-shrink-0
        ${isActive ? 'bg-blue-100 text-blue-700 shadow-sm' : 'bg-white hover:bg-gray-50 text-slate-700 border border-transparent hover:border-slate-200'}
        ${isDragged ? 'opacity-50 scale-95 shadow-lg' : 'opacity-100'}
      `}
      onClick={() => onSelect(page.id)}
      data-testid={`page-item-${page.id}`}
      role="button"
      aria-pressed={isActive}
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(page.id); }}
    >
      <IconComponent className={`w-5 h-5 mr-2 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
      <span className="font-medium text-sm truncate select-none">{page.name}</span>
      <button
        ref={contextMenuButtonRef}
        data-context-menu-trigger="true"
        onClick={(e) => {
          e.stopPropagation(); 
          if (contextMenuButtonRef.current) { 
             onOpenContextMenu(page.id, contextMenuButtonRef, e);
          }
        }}
        className={`
          ml-2 p-1 rounded
          ${isActive ? 'text-blue-500 hover:bg-blue-200' : 'text-slate-400 hover:bg-slate-200 group-hover:text-slate-600'}
          transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100
        `}
        aria-label={`Options for ${page.name}`}
      >
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default PageItem;