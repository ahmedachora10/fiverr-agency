import React, { useEffect, useRef, useState } from 'react';

interface QuillEditorProps {
    data?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
    data = '',
    onChange,
    placeholder = 'Start writing your content...',
    readOnly = false,
    className = ''
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initQuill = async () => {
            if (!editorRef.current) return;

            try {
                // Dynamically import Quill
                const Quill = (await import('quill')).default;
                
                // Import Quill CSS
                await import('quill/dist/quill.snow.css');

                // Initialize Quill
                const quill = new Quill(editorRef.current, {
                    theme: 'snow',
                    placeholder: placeholder,
                    readOnly: readOnly,
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }],
                            [{ 'align': [] }],
                            ['blockquote', 'code-block'],
                            ['link', 'image'],
                            ['clean']
                        ]
                    },
                    formats: [
                        'header', 'bold', 'italic', 'underline', 'strike',
                        'color', 'background', 'list', 'bullet', 'indent',
                        'align', 'blockquote', 'code-block', 'link', 'image'
                    ]
                });

                // Set initial content
                if (data) {
                    quill.root.innerHTML = data;
                }

                // Handle content changes
                quill.on('text-change', () => {
                    if (onChange) {
                        const html = quill.root.innerHTML;
                        onChange(html);
                    }
                });

                quillRef.current = quill;
                setIsReady(true);
            } catch (error) {
                console.error('Failed to initialize Quill:', error);
            }
        };

        initQuill();

        return () => {
            if (quillRef.current) {
                quillRef.current = null;
            }
        };
    }, []);

    // Update content when data prop changes
    useEffect(() => {
        if (isReady && quillRef.current && data !== undefined) {
            const currentContent = quillRef.current.root.innerHTML;
            if (currentContent !== data) {
                quillRef.current.root.innerHTML = data;
            }
        }
    }, [data, isReady]);

    // Update readOnly state
    useEffect(() => {
        if (isReady && quillRef.current) {
            quillRef.current.enable(!readOnly);
        }
    }, [readOnly, isReady]);

    return (
        <div className={`quill-editor-wrapper ${className}`}>
            <div ref={editorRef} />
            <style>{`
                .quill-editor-wrapper .ql-container {
                    min-height: 200px;
                    font-size: 16px;
                    line-height: 1.6;
                }
                
                .quill-editor-wrapper .ql-editor {
                    min-height: 200px;
                    padding: 16px;
                }
                
                .quill-editor-wrapper .ql-toolbar {
                    border-top: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    border-radius: 8px 8px 0 0;
                }
                
                .quill-editor-wrapper .ql-container {
                    border-bottom: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    border-radius: 0 0 8px 8px;
                }
                
                .quill-editor-wrapper .ql-editor:focus {
                    outline: none;
                }
                
                .quill-editor-wrapper:focus-within {
                    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
};

export default QuillEditor;
