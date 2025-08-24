import React, { useState } from 'react';
// import { Button } from './ui/button';

interface TranslatableInputProps {
    name: string;
    label: string;
    type?: 'input' | 'textarea';
    value: Record<string, string>;
    onChange: (name: string, locale: string, value: string) => void;
    error?: Record<string, string>;
    locales?: string[];
    required?: boolean;
    placeholder?: string;
}

const TranslatableInput: React.FC<TranslatableInputProps> = ({
    name,
    label,
    type = 'input',
    value = {},
    onChange,
    error = {},
    locales = ['en', 'ar'],
    required = false,
    placeholder = ''
}) => {
    const [activeLocale, setActiveLocale] = useState<string>(locales[0]);


    const handleInputChange = (locale: string, inputValue: string) => {
        onChange(name, locale, inputValue);
    };
    console.log(activeLocale, locales);

    const baseInputClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
    const errorInputClasses = "border-red-500 focus:ring-red-500 focus:border-red-500";

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Language Tabs */}
            <div className="mb-4">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {locales.map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => setActiveLocale(locale)}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeLocale === locale
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {locale === 'en' ? 'English' : 'العربية'}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Input Fields */}
            <div>
                {locales.map((locale) => (
                    <div
                        key={locale}
                        style={{ display: activeLocale === locale ? 'block' : 'none' }}
                    >
                        {type === 'textarea' ? (
                            <textarea
                                id={`${name}-${locale}`}
                                name={`${name}[${locale}]`}
                                value={value[locale] || ''}
                                onChange={(e) => handleInputChange(locale, e.target.value)}
                                placeholder={`${placeholder} (${locale.toUpperCase()})`}
                                rows={6}
                                className={`${baseInputClasses} ${error && error[locale] ? errorInputClasses : ''}`}
                            />
                        ) : (
                            <input
                                type="text"
                                id={`${name}-${locale}`}
                                name={`${name}[${locale}]`}
                                value={value[locale] || ''}
                                onChange={(e) => handleInputChange(locale, e.target.value)}
                                placeholder={`${placeholder} (${locale.toUpperCase()})`}
                                className={`${baseInputClasses} ${error && error[locale] ? errorInputClasses : ''}`}
                            />
                        )}

                        {error && error[locale] && (
                            <p className="mt-1 text-sm text-red-500">{error[locale]}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TranslatableInput;
