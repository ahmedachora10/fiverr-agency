import React from 'react';

interface QuillRendererProps {
    content: string;
    className?: string;
}

const QuillRenderer: React.FC<QuillRendererProps> = ({ content, className = '' }) => {
    if (!content) return null;

    return (
        <div 
            className={`quill-content prose prose-sm max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: content }}
            style={{
                lineHeight: '1.6',
                fontSize: '16px'
            }}
        />
    );
};

export default QuillRenderer;
