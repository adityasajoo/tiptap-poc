import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import SectionNodeComponent from "./SectionNodeComponent";

const SectionNode = Node.create({
    name: "sectionNode",
    group: 'inline*',
    draggable: true,
    content: "heading blockNode+",
    inline: false,
    isolating: true,

    parseHTML() {
        return [
            {
                tag: 'div[data-type="section"]',
            },
        ]
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'section' }), 0]
    },
    addNodeView() {
        return ReactNodeViewRenderer(SectionNodeComponent)
    },


})

export default SectionNode;  