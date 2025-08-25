import React, { useEffect, useState, useRef } from 'react';

interface RichTextEditorProps {
    data?: string;
    onChange?: (data: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
    data = '',
    onChange,
    placeholder = 'Start writing your content...',
    readOnly = false,
    className = ''
}) => {
    const [value, setValue] = useState(data);
    const [isFormatting, setIsFormatting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Handle content changes
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value;
        setValue(content);
        if (onChange) {
            onChange(content);
        }
    };

    // Update value when data prop changes
    useEffect(() => {
        if (data !== value) {
            setValue(data || '');
        }
    }, [data]);

    // Format text functions
    const insertText = (before: string, after: string = '') => {
        if (!textareaRef.current) return;
        
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        
        const newText = textarea.value.substring(0, start) + 
                       before + selectedText + after + 
                       textarea.value.substring(end);
        
        setValue(newText);
        if (onChange) {
            onChange(newText);
        }
        
        // Restore focus and selection
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(
                start + before.length, 
                end + before.length
            );
        }, 0);
    };

    const formatButtons = [
        { label: 'H1', action: () => insertText('# ', '\n') },
        { label: 'H2', action: () => insertText('## ', '\n') },
        { label: 'H3', action: () => insertText('### ', '\n') },
        { label: 'Bold', action: () => insertText('**', '**') },
        { label: 'Italic', action: () => insertText('*', '*') },
        { label: 'Quote', action: () => insertText('> ', '\n') },
        { label: 'Code', action: () => insertText('`', '`') },
        { label: 'Link', action: () => insertText('[', '](url)') },
        { label: 'List', action: () => insertText('- ', '\n') },
        { label: 'Numbered', action: () => insertText('1. ', '\n') },
    ];

    return (
        <div className={`rich-text-editor ${className}`}>
            {/* Formatting Toolbar */}
            <div className="toolbar border border-gray-300 border-b-0 rounded-t-md bg-gray-50 p-2 flex flex-wrap gap-1">
                {formatButtons.map((button, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={button.action}
                        className="px-2 py-1 text-xs bg-white border border-gray-200 rounded hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        disabled={readOnly}
                    >
                        {button.label}
                    </button>
                ))}
            </div>

            {/* Text Area */}
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                readOnly={readOnly}
                className="w-full min-h-[300px] p-4 border border-gray-300 border-t-0 rounded-b-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-vertical font-mono text-sm leading-relaxed"
                style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                }}
            />

            {/* Preview Toggle */}
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>Supports Markdown formatting</span>
                <button
                    type="button"
                    onClick={() => setIsFormatting(!isFormatting)}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    {isFormatting ? 'Hide' : 'Show'} formatting guide
                </button>
            </div>

            {/* Formatting Guide */}
            {isFormatting && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-md text-xs">
                    <div className="grid grid-cols-2 gap-2">
                        <div><strong># Heading 1</strong></div>
                        <div><strong>## Heading 2</strong></div>
                        <div><strong>**bold text**</strong></div>
                        <div><strong>*italic text*</strong></div>
                        <div><strong>`code`</strong></div>
                        <div><strong>&gt; blockquote</strong></div>
                        <div><strong>- list item</strong></div>
                        <div><strong>1. numbered item</strong></div>
                        <div><strong>[link text](url)</strong></div>
                        <div><strong>![image](url)</strong></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RichTextEditor;
