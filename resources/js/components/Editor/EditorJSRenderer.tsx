import React from 'react';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
    // Handle empty content
    if (!content || content.trim() === '') {
        return <div className={className}>No content available</div>;
    }

    // Simple markdown to HTML conversion
    const convertMarkdownToHtml = (markdown: string) => {
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Code
            .replace(/`(.*)`/gim, '<code>$1</code>')
            // Links
            .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
            // Images
            .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />')
            // Blockquotes
            .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
            // Line breaks
            .replace(/\n/gim, '<br>');

        // Handle lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>');
        
        // Wrap consecutive <li> elements in <ul> or <ol>
        html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');

        return html;
    };

    const htmlContent = convertMarkdownToHtml(content);

    return (
        <div 
            className={`markdown-content prose max-w-none ${className}`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            style={{
                lineHeight: '1.6',
                fontSize: '16px'
            }}
        />
    );
};

export default MarkdownRenderer;
