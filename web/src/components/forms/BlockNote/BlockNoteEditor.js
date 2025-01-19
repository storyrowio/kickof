"use client"; // this registers <Editor> as a Client Component
import "@blocknote/core/fonts/inter.css";
import {useCreateBlockNote} from "@blocknote/react";
import {BlockNoteView} from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {useEffect, useRef} from "react";

export default function BlockNoteEditor(props) {
    const { onChangeHtml, value, ...rest } = props;
    const editor = useCreateBlockNote();

    const mounted = useRef(false);
    useEffect(() => {
        async function loadInitialHTML(value) {
            const blocks = await editor.tryParseHTMLToBlocks(value);
            editor.replaceBlocks(editor.document, blocks);
            mounted.current = true;
        }
        if (value && !mounted.current) {
            loadInitialHTML(value);
        }
    }, [editor, value]);

    const onChange = async () => {
        const html = await editor.blocksToHTMLLossy(editor.document)
        onChangeHtml(html);
        return editor.blocksToHTMLLossy(editor.document);
    };

    return <BlockNoteView editor={editor} onChange={onChange} {...rest} />;
}
