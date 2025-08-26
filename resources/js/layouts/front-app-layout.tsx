import { type BreadcrumbItem } from '@/types';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { ReactNode } from 'react';

interface FrontAppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: FrontAppLayoutProps) => {

    return (
        <AppShell variant="header">
            <AppContent className="overflow-x-hidden" {...props}>
                {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </AppContent>
        </AppShell>
    );
};
