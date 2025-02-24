'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import {
    Bold,
    Italic,
    List,
    Link as LinkIcon,
    Heading as HeadingIcon
} from 'lucide-react'

import type { RichTextEditorProps } from '@/types/editor'

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="border-b border-gray-200 p-2 flex gap-2 bg-gray-50">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100' : ''}`}
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100' : ''}`}
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100' : ''}`}
            >
                <List className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100' : ''}`}
            >
                <HeadingIcon className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => {
                    const url = window.prompt('URL')
                    if (url) {
                        editor.chain().focus().setLink({ href: url }).run()
                    }
                }}
                className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100' : ''}`}
            >
                <LinkIcon className="w-4 h-4" />
            </button>
        </div>
    )
}

export function RichTextEditor({ content, onChangeAction, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: false,
                bulletList: false,
            }),
            Heading.configure({
                levels: [3],
            }),
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc ml-4',
                },
            }),
            ListItem,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:underline',
                },
            }),
            Placeholder.configure({
                placeholder: placeholder || 'Začněte psát...',
            }),
        ],
        content,
        editable: true,
        autofocus: 'end',
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 min-h-[200px] focus:outline-none w-full bg-white',
            },
        },
        onUpdate: ({ editor }) => {
            onChangeAction(editor.getHTML())
        },
    })

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            <MenuBar editor={editor} />
            <div className="w-full bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}