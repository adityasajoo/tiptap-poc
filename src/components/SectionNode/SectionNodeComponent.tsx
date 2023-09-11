import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import './styles.css';
import { styled } from 'styled-components';

const SectionNodeComponent = ({
  deleteNode,
  node,
  extension,
  editor,
  getPos,
}: NodeViewProps) => {
  const addSection = () => {
    const endPos = getPos() + node.nodeSize;
    editor
      .chain()
      .focus(endPos)
      .insertContent({
        type: 'sectionNode',
        content: [
          {
            type: 'heading',
          },
          {
            type: 'blockNode',
            content: [
              {
                type: 'paragraph', //Empty paragraph
              },
            ],
          },
        ],
      })
      .run();
  };
  return (
    <NodeViewWrapper className='draggable-item'>
      <div
        className='drag-handle'
        contentEditable='false'
        draggable='true'
        data-drag-handle
      />

      <NodeViewContent className='content'>
        <StyledHeader>
          <button onClick={addSection}>Add Section</button>
          <button onClick={deleteNode}>Delete Section</button>
        </StyledHeader>
      </NodeViewContent>
    </NodeViewWrapper>
  );
};

export default SectionNodeComponent;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  button {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    margin: 5px;
  }
`;
