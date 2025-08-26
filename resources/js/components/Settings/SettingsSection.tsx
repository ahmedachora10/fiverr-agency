import React from 'react';
import { SettingsSectionProps } from '@/types/settings';
import FieldRenderer from './FieldRenderer';

const SettingsSection: React.FC<SettingsSectionProps> = ({
    section,
    values,
    onChange,
    errors
}) => {
    return (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    {section.icon && (
                        <i className={`${section.icon} text-xl text-gray-600 mr-3`}></i>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                        {section.title}
                    </h3>
                </div>

                {section.desc && (
                    <p className="text-sm text-gray-600 mt-2">
                        {section.desc}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.elements.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                        <FieldRenderer
                            field={field}
                            value={values[field.name] || field.current_value || field.value}
                            onChange={onChange}
                            error={errors[field.name]}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SettingsSection;
