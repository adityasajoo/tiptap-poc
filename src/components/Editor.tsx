import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text';
import { EditorContent, useEditor } from '@tiptap/react';
import { styled } from 'styled-components';
import BlockNode from './BlockNode/BlockNodeExtension';
import SectionNode from './SectionNode/SectionNodeExtension';

const CustomDocument = Document.extend({
  content: 'sectionNode+',
});

const MyEditor = ({ id }: { id: string }) => {
  const editor = useEditor({
    extensions: [
      Paragraph,
      Heading,
      Text,
      // History,
      SectionNode,
      BlockNode,
      CustomDocument,
      Gapcursor,
      Dropcursor.configure({
        color: '#f0e0cc',
        width: 1,
        class: 'drop-cursor',
      }),
      Placeholder.configure({
        placeholder: 'Start typing...',
      }),
    ],
    editorProps: {
      handleDrop(view, event, slice, moved) {
        console.log('handleDrop');
      },
    },
    onCreate({ editor }) {
      console.log(editor.getAttributes('blockNode'));
      editor.commands.updateAttributes('blockNode', {
        blockNumber: 1,
      });
    },
  });
  return (
    <Wrapper>
      <div className='editor-container'>
        <EditorContent editor={editor} />
      </div>
    </Wrapper>
  );
};

export default MyEditor;

//Editor styles
const Wrapper = styled.div`
  padding: 10px 15px;
  display: flex;
  height: 100vh;

  .editor-container {
    width: 100%;

    /* Placeholder (at the top) */
    .ProseMirror .is-editor-empty:first-child::before {
      color: #adb5bd;
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    .ProseMirror:focus {
      outline: none;
    }
    /* Basic editor styles */
    .ProseMirror {
      min-height: 300px;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 15px 15px;
      > * + * {
        margin-top: 0.75em;
      }

      ul,
      ol {
        padding: 0 1rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p {
        padding: 0;
        margin: 0;
      }

      code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
      }

      pre {
        background: #0d0d0d;
        color: #fff;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        code {
          color: inherit;
          padding: 0;
          background: none;
          font-size: 0.8rem;
        }
      }

      img {
        max-width: 100%;
        height: auto;
      }

      blockquote {
        padding-left: 1rem;
        border-left: 2px solid rgba(#0d0d0d, 0.1);
      }
    }
  }

  .node-blockNode {
    [draggable='true'] {
      /* background-color: red; */
      .block {
        background-color: red;
      }
    }
  }
`;
