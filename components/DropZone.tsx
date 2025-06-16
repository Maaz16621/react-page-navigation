import React from 'react';
import { PlusIcon } from '../constants';

interface DropZoneProps {
  index: number;
  onDrop: (index: number) => void;
  onAddPageInZone?: (index: number) => void; // Optional: only for dropzones that can add
  isDragOver: boolean;
  isDraggingActive: boolean;
  canShowAddButton: boolean; // Determines if the '+' button should be shown
}

const DropZone: React.FC<DropZoneProps> = ({ 
  index, 
  onDrop, 
  onAddPageInZone, 
  isDragOver, 
  isDraggingActive,
  canShowAddButton
}) => {
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDrop(index);
  };

  const handleAddClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent any parent click handlers
    if (onAddPageInZone) {
      onAddPageInZone(index);
    }
  };

  // Base width for the drop zone area, allows for "+" icon or drag indication
  const baseWidthClass = 'w-8'; 
  const dragOverWidthClass = 'w-12'; // Wider when dragging over for better visual cue

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex-shrink-0 flex items-center justify-center transition-all duration-150 ease-in-out group
        ${isDragOver ? `${dragOverWidthClass} bg-blue-500/10` : baseWidthClass} 
        h-10`} // Consistent height with PageItems
      data-testid={`drop-zone-${index}`}
      aria-hidden={!isDragOver && (!canShowAddButton || isDraggingActive) ? true : undefined}
    >
      {isDragOver && (
        <div className="absolute inset-y-0 left-1/2 w-1 bg-blue-500 transform -translate-x-1/2 rounded-full" aria-hidden="true"></div>
      )}
      {!isDragOver && !isDraggingActive && canShowAddButton && onAddPageInZone && (
        <button
          onClick={handleAddClick}
          className="p-1 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Add new page at position ${index}`}
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default DropZone;