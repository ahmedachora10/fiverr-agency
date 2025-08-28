import { type BreadcrumbItem } from '@/types';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { ReactNode } from 'react';
import TopBar from '@/components/theme/TopBar';
import Footer from '@/components/theme/Footer';
import { Head, usePage } from '@inertiajs/react';
import { setting } from '@/lib/utils';

interface FrontAppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default ({ children, breadcrumbs, title, ...props }: FrontAppLayoutProps) => {

    const { settings } = usePage().props as any;

    return (
        <AppShell variant="header">
            <AppContent className="overflow-x-hidden" {...props}>
                {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                <LanguageProvider>
                    <Head title={title || setting(settings, 'app_name')} />
                    <TopBar />
                    {children}
                    <Footer settings={settings} />
                </LanguageProvider>
            </AppContent>
        </AppShell>
    );
};
