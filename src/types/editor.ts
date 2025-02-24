// src/types/editor.ts
export interface RichTextEditorProps {
    content?: string;
    onChangeAction: (content: string) => Promise<void>;
    placeholder?: string;
}