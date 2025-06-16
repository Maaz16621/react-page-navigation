import React from 'react';
import type { Page, ContextMenuState, PageIconType } from '../types';
import PageItem from '../PageItem'; 
import DropZone from './DropZone';
import ContextMenu from './ContextMenu';
import { PlusIcon } from '../constants';

interface PageNavigationProps {
  pages: Page[];
  activePageId: string | null;
  contextMenuState: ContextMenuState | null;
  draggedPageId: string | null;
  dragOverDropZoneIndex: number | null;
  lastOpenedContextMenuButtonRef: React.RefObject<HTMLButtonElement | null>; 
  onSelectPage: (id: string) => void;
  onAddPage: (index: number) => void; 
  onDeletePage: (id: string) => void;
  onDuplicatePage: (id:string) => void; // Will be "Copy"
  onRenamePage: (id: string, newName: string) => void; 
  onSetAsFirstPage: (id: string) => void; // New prop
  onMovePage: (draggedId: string, targetIndex: number) => void;
  onDragStartPage: (id: string, event: React.DragEvent<HTMLDivElement>) => void;
  onDragEndPage: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOverDropZone: (index: number, event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeaveDropZone: () => void;
  onOpenContextMenu: (pageId: string, buttonRef: React.RefObject<HTMLButtonElement>, event: React.MouseEvent) => void;
  onCloseContextMenu: () => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  pages,
  activePageId,
  contextMenuState,
  draggedPageId,
  dragOverDropZoneIndex,
  lastOpenedContextMenuButtonRef,
  onSelectPage,
  onAddPage,
  onDeletePage,
  onDuplicatePage,
  onRenamePage,
  onSetAsFirstPage, // Destructure new prop
  onMovePage,
  onDragStartPage,
  onDragEndPage,
  onDragOverDropZone,
  onDragLeaveDropZone,
  onOpenContextMenu,
  onCloseContextMenu,
}) => {
  const handleDrop = (index: number) => {
    if (draggedPageId) {
      onMovePage(draggedPageId, index);
    }
  };

  const getPageIconType = (index: number, totalPages: number): PageIconType => {
    if (totalPages === 0) return 'document'; 
    if (index === 0) return 'info';
    if (index === totalPages - 1) return 'ending';
    return 'document';
  };

  return (
    <div className="w-full mx-auto">
      <div 
        className="flex items-center bg-gray-100 p-2 rounded-lg shadow-md overflow-x-auto min-h-[64px]"
        role="toolbar"
        aria-label="Page navigation"
      >
        <DropZone
          index={0}
          onDrop={handleDrop}
          isDragOver={dragOverDropZoneIndex === 0 && draggedPageId !== null}
          isDraggingActive={draggedPageId !== null}
          canShowAddButton={false} // Cannot add before the first page using inline button
        />
        {pages.map((page, index) => (
          <React.Fragment key={page.id}>
            <div 
              onDragOver={(e) => onDragOverDropZone(index, e)} // This might not be needed if PageItem itself handles drag over for its own area
              onDragLeave={onDragLeaveDropZone} // Same as above
            >
              <PageItem
                page={page}
                iconType={getPageIconType(index, pages.length)}
                isActive={page.id === activePageId}
                isDragged={page.id === draggedPageId}
                onSelect={onSelectPage}
                onDragStart={onDragStartPage}
                onDragEnd={onDragEndPage}
                onOpenContextMenu={onOpenContextMenu}
              />
            </div>
            <DropZone
              index={index + 1}
              onDrop={handleDrop}
              onAddPageInZone={onAddPage} // Use onAddPage for inline adding
              isDragOver={dragOverDropZoneIndex === (index + 1) && draggedPageId !== null}
              isDraggingActive={draggedPageId !== null}
              canShowAddButton={true} // Show add button between items
            />
          </React.Fragment>
        ))}
        {/* The last DropZone (if pages.length is 0) or main Add Page button handles adding at the very end */}
        {pages.length === 0 && ( // If no pages, the first dropzone will implicitly be the one to add to.
             <DropZone // This acts like a final drop zone when no pages exist yet.
             index={0} // Adding to index 0 when list is empty
             onDrop={handleDrop}
             onAddPageInZone={onAddPage}
             isDragOver={dragOverDropZoneIndex === 0 && draggedPageId !== null}
             isDraggingActive={draggedPageId !== null}
             canShowAddButton={true} // Show add button if no pages
           />
        )}
        <button
          onClick={() => onAddPage(pages.length)} // Add to the end
          className="flex items-center flex-shrink-0 ml-1 px-3 py-2 h-10 rounded-md text-sm bg-white hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 transition-colors"
          aria-label="Add new page to end"
        >
          <PlusIcon className="w-5 h-5 mr-1" />
          Add page
        </button>
      </div>

      {contextMenuState && (
        <ContextMenu
          pageId={contextMenuState.pageId}
          position={{ x: contextMenuState.x, y: contextMenuState.y }}
          onSetAsFirstPage={onSetAsFirstPage} // Pass new handler
          onRename={(id) => {
            const pageToRename = pages.find(p => p.id === id);
            const newName = prompt("Enter new page name:", pageToRename?.name || "");
            if (newName && newName.trim() !== "") onRenamePage(id, newName.trim());
          }}
          onDuplicate={onDuplicatePage} // Label is "Copy" in ContextMenu.tsx
          onDelete={onDeletePage}
          onClose={onCloseContextMenu}
          triggerButtonRef={lastOpenedContextMenuButtonRef} 
        />
      )}
    </div>
  );
};

export default PageNavigation;