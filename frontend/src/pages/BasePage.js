// src/pages/BasePage.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CodeBlocks from '../components/CodeBlocks';
import Workbench from '../components/Workbench';
import InfoSection from '../components/InfoSection';
import './BasePage.css'; // Import the new CSS file

function BasePage() {
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [workbenchBlocks, setWorkbenchBlocks] = useState([]);

  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const handleBlockRemove = (id) => {
    setWorkbenchBlocks(prevBlocks => prevBlocks.filter(block => block.id !== id));
  };

  const handleBlockAdd = (block) => {
    setWorkbenchBlocks(prevBlocks => [...prevBlocks, { ...block, id: Date.now() }]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <div className="section code-blocks">
          <h2>Code Blocks</h2>
          <CodeBlocks onBlockDrag={handleBlockAdd} />
        </div>
        <div className="section workbench">
          <h2>Workbench</h2>
          <Workbench
            blocks={workbenchBlocks}
            onBlockRemove={handleBlockRemove}
            onBlockClick={handleBlockClick}
            setWorkbenchBlocks={setWorkbenchBlocks}
          />
        </div>
        <div className="section info-section">
          <h2>Block Info</h2>
          <InfoSection selectedBlock={selectedBlock} />
        </div>
      </div>
    </DndProvider>
  );
}

export default BasePage;
