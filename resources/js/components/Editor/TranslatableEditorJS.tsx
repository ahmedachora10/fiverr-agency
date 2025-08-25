import React, { useState } from 'react';
import RichTextEditor from './EditorJS';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface TranslatableRichTextEditorProps {
  name: string;
  label: string;
  value: Record<string, string>;
  error?: Record<string, string>;
  locales: string[];
  onChange: (field: string, locale: string, value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const TranslatableRichTextEditor: React.FC<TranslatableRichTextEditorProps> = ({
  name,
  label,
  value,
  error = {},
  locales,
  onChange,
  placeholder = 'Start writing your content...',
  required = false,
  className = ''
}) => {
  const [activeLocale, setActiveLocale] = useState(locales[0]);

  const handleEditorChange = (content: string) => {
    onChange(name, activeLocale, content);
  };

  const getLocaleLabel = (locale: string) => {
    const labels: Record<string, string> = {
      'en': 'English',
      'ar': 'العربية'
    };
    return labels[locale] || locale.toUpperCase();
  };

  const getValidContent = (data: string | undefined) => {
    return data || '';
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        
        {/* Language Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => setActiveLocale(locale)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activeLocale === locale
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getLocaleLabel(locale)}
            </button>
          ))}
        </div>
      </div>

      {/* Editor for Active Locale */}
      <div className="space-y-4">
        <RichTextEditor
          key={`${name}-${activeLocale}`}
          data={getValidContent(value[activeLocale])}
          onChange={handleEditorChange}
          placeholder={`${placeholder} (${getLocaleLabel(activeLocale)})`}
          className="min-h-[300px]"
        />
      </div>

      {/* Error Messages */}
      {Object.keys(error).map((locale) => (
        <InputError
          key={locale}
          message={`${getLocaleLabel(locale)}: ${error[locale]}`}
          className="mt-2"
        />
      ))}

      {/* Content Preview for Other Locales */}
      {locales.length > 1 && (
        <div className="mt-4 space-y-2">
          <Label className="text-xs font-medium text-gray-500">Content Status:</Label>
          <div className="flex flex-wrap gap-2">
            {locales.map((locale) => {
              const hasContent = value[locale] && value[locale].trim().length > 0;
              return (
                <div
                  key={locale}
                  className={`px-2 py-1 text-xs rounded-full ${
                    hasContent
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {getLocaleLabel(locale)}: {hasContent ? 'Has Content' : 'Empty'}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatableRichTextEditor;
