import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { SettingsPageProps, SettingsFormData } from '@/types/settings';
import SettingsSection from '@/components/Settings/SettingsSection';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Button } from '@/components/ui/button';

const Settings: React.FC<SettingsPageProps> = ({ settingsConfig, currentSettings }) => {
    // Initialize form data with current settings
    const initialData: SettingsFormData = {};
    Object.values(settingsConfig).forEach(section => {
        section.elements.forEach(field => {
            initialData[field.name] = currentSettings[field.name] || field.current_value || field.value;
        });
    });

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm<SettingsFormData>(initialData);

    const handleFieldChange = (name: string, value: any) => {
        setData(name, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.store'), {
            preserveScroll: true,
            onSuccess: () => {
                // Form will be reset automatically by Inertia on success
            },
        });
    };

    const handleReset = () => {
        reset();
    };

    return (
        <AppLayout>
            <Head title="الإعدادات" />

            <SettingsLayout>
                <div className="min-h-screen bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">الإعدادات</h1>
                                    <p className="mt-2 text-gray-600">إدارة إعدادات التطبيق</p>
                                </div>

                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={handleReset}
                                        disabled={processing}
                                    >
                                        إعادة تعيين
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        {wasSuccessful && (
                            <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="mr-3">
                                        <p className="text-sm font-medium text-green-800">
                                            تم حفظ الإعدادات بنجاح
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {Object.entries(settingsConfig).map(([sectionKey, section]) => (
                                    <SettingsSection
                                        key={sectionKey}
                                        section={section}
                                        values={data}
                                        onChange={handleFieldChange}
                                        errors={errors}
                                    />
                                ))}
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 flex justify-end">
                                <Button
                                    variant="default"
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            جاري الحفظ...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            حفظ الإعدادات
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </SettingsLayout>

        </AppLayout>
    );
};

export default Settings;
