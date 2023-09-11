import { NodeViewContent, NodeViewProps, NodeViewWrapper } from '@tiptap/react';
// import './styles.css';
import { styled } from 'styled-components';

const BlockNodeComponent = ({
  deleteNode,
  node,
  editor,
  getPos,
}: NodeViewProps) => {
  const addBlock = () => {
    const endPos = getPos() + node.nodeSize;
    editor
      .chain()
      .focus(endPos)
      .insertContent({
        type: 'blockNode',
        content: [
          {
            type: 'paragraph',
          },
        ],
      })
      .run();
  };
  return (
    <StyledBlockNodeComponent className='draggable-block'>
      <div className='block'>
        <div className='block-header' contentEditable={false}>
          <div
            className='drag-handle-block '
            contentEditable='false'
            draggable='true'
            data-drag-handle></div>
          <BlockId>
            {/* 1.01 */}
            {node.attrs.blockNumber}
          </BlockId>
          <hr />
          <button className='block-type' onClick={addBlock}>
            Add
          </button>
          <button className='block-type' onClick={() => deleteNode()}>
            Delete
          </button>
        </div>
        <NodeViewContent className='content'></NodeViewContent>
      </div>
    </StyledBlockNodeComponent>
  );
};

export default BlockNodeComponent;

const StyledBlockNodeComponent = styled(NodeViewWrapper)`
  padding-left: 15px;
  .drag-handle-block {
    visibility: hidden;
  }
  &:hover {
    .drag-handle-block {
      visibility: visible;
    }
  }

  .block-header {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    /* position: relative; */

    .drag-handle-block {
      width: 1rem;
      height: 1rem;
      position: absolute;
      left: 40px;
      cursor: grab;
      background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16"><path fill-opacity="0.2" d="M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    hr {
      border-radius: 39px;
      border: 2px solid#ebf0f9;
      width: 100%;
      margin: 0px 12px;
    }

    .block-type {
      white-space: nowrap;
      margin-right: 15px;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .content {
    margin-top: 10px;
    padding-left: 10px;
    min-height: 150px;
  }
`;

const BlockId = styled.div`
  background-color: #edf0f0;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  display: flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
