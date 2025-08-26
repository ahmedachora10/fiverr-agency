import { type BreadcrumbItem } from '@/types';
import { useEffect, type ReactNode } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { setting } from '@/lib/utils';

interface FrontAppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: FrontAppLayoutProps) => {

    const { settings } = usePage<SharedData>().props;

    useEffect(() => {
        document.head.insertAdjacentHTML(
            'beforeend',
            `${setting(settings, 'google_analytics')}`
        );

        // grap trucking id from google_analytics
        const truckingId = setting(settings, 'google_analytics').match(/G-\w+/)?.[0];

        document.head.insertAdjacentHTML(
            'beforeend',
            `<meta name="google-site-trucking" content="${truckingId}">`
        );
    }, []);

    return (

        <AppShell variant="header">
            <AppContent className="overflow-x-hidden">
                {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </AppContent>
        </AppShell>
    );
};
