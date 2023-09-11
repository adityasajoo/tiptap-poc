import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import BlockNodeComponent from './BlockNodeComponent';

const BlockNode = Node.create({
  name: 'blockNode',
  group: 'inline*',
  draggable: true,
  content: 'block+',
  inline: false,
  isolating: true,

  addAttributes() {
    return {
      blockNumber: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="block"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'block' }),
      0,
    ];
  },
  addNodeView() {
    return ReactNodeViewRenderer(BlockNodeComponent);
  },
});

export default BlockNode;
