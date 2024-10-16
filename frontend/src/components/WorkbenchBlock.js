// src/components/WorkbenchBlock.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { X } from 'lucide-react';

const GRID_SIZE = 100; // Size of each grid cell in pixels

function WorkbenchBlock({ id, block, onBlockRemove, onBlockClick, x, y, moveBlock }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'BLOCK',
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`workbench-block ${block.type}`}
      style={{
        position: 'absolute',
        left: `${x * GRID_SIZE}px`,
        top: `${y * GRID_SIZE}px`,
        width: `${GRID_SIZE}px`,
        height: `${GRID_SIZE}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        border: '1px solid #ccc',
      }}
      onClick={() => onBlockClick(block)}
    >
      {block.type === 'input' ? (
        <input
          type="text"
          value={block.inputValue || ''}
          readOnly
          className="workbench-block-input"
        />
      ) : (
        block.label
      )}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onBlockRemove(id);
        }} 
        className="remove-button"
        style={{ position: 'absolute', top: '2px', right: '2px', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default WorkbenchBlock;

