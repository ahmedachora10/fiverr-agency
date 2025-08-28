import { type BreadcrumbItem } from '@/types';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { setting } from '@/lib/utils';
import TopBar from '@/components/theme/TopBar';
import Footer from '@/components/theme/Footer';

interface FrontAppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: FrontAppLayoutProps) => {

    const settings = usePage().props.settings;

    useEffect(() => {

        const title = document.querySelector('title');
        const description = document.querySelector('meta[name="description"]');
        const keywords = document.querySelector('meta[name="keywords"]');

        if (title) {
            title.textContent = setting(settings, 'app_name') || 'Fiverr Agency';
        }
        if (description) {
            description.textContent = setting(settings, 'description') || 'Fiverr Agency';
        }
        if (keywords) {
            keywords.textContent = setting(settings, 'tagline') || 'Fiverr Agency';
        }

    }, []);

    return (
        <AppShell variant="header">
            <AppContent className="overflow-x-hidden" {...props}>
                {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                <LanguageProvider>
                    <TopBar />
                    {children}
                    <Footer />
                </LanguageProvider>
            </AppContent>
        </AppShell>
    );
};
