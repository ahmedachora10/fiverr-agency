import React from 'react';
import { FieldRendererProps } from '@/types/settings';

const FieldRenderer: React.FC<FieldRendererProps> = ({ field, value, onChange, error }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const newValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
        onChange(field.name, newValue);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(field.name, e.target.checked);
    };

    const baseInputClasses = `
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
        ${field.class}
    `.trim();

    const renderField = () => {
        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={field.label}
                        className={baseInputClasses}
                    />
                );

            case 'email':
                return (
                    <input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={field.label}
                        className={baseInputClasses}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={field.label}
                        className={baseInputClasses}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={field.label}
                        rows={4}
                        className={baseInputClasses}
                    />
                );

            case 'select':
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        className={baseInputClasses}
                    >
                        <option value="">اختر {field.label}</option>
                        {field.options && Object.entries(field.options).map(([optionValue, optionLabel]) => (
                            <option key={optionValue} value={optionValue}>
                                {optionLabel}
                            </option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id={field.name}
                            name={field.name}
                            checked={Boolean(value)}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={field.name} className="ml-2 block text-sm text-gray-900">
                            {field.label}
                        </label>
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={field.label}
                        className={baseInputClasses}
                    />
                );
        }
    };

    return (
        <div className="mb-4">
            {field.type !== 'checkbox' && (
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                </label>
            )}
            
            {renderField()}
            
            {field.description && (
                <p className="mt-1 text-sm text-gray-500">{field.description}</p>
            )}
            
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default FieldRenderer;
