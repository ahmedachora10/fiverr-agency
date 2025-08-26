export interface SettingField {
    type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox';
    data: 'string' | 'number' | 'boolean' | 'array';
    name: string;
    label: string;
    rules: string;
    class: string;
    value: any;
    current_value?: any;
    options?: Record<string, string>;
    placeholder?: string;
    description?: string;
}

export interface SettingSection {
    title: string;
    desc: string;
    icon: string;
    elements: SettingField[];
}

export interface SettingsConfig {
    [sectionKey: string]: SettingSection;
}

export interface SettingsPageProps {
    settingsConfig: SettingsConfig;
    currentSettings: Record<string, any>;
}

export interface FieldRendererProps {
    field: SettingField;
    value: any;
    onChange: (name: string, value: any) => void;
    error?: string;
}

export interface SettingsSectionProps {
    section: SettingSection;
    values: Record<string, any>;
    onChange: (name: string, value: any) => void;
    errors: Record<string, string>;
}

export type SettingsFormData = Record<string, string | number | boolean>;
