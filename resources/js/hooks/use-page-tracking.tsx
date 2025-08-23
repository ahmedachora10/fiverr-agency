import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

declare global {
    interface Window {
        gtag: (command: string, ...args: any[]) => void;
    }
}

export function usePageTracking() {
    const { url } = usePage();
    // const gaMeasurementId = [import.meta.env.VITE_GA_MEASUREMENT_ID, import.meta.env.VITE_GA_MEASUREMENT_ID_2];

    useEffect(() => {
        // Track page view when URL changes

        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID_2, {
                page_path: url,
            });
        }
    }, [url]);

    // Function to track custom events
    const trackEvent = (action: string, category: string, label?: string, value?: number) => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    };

    // Function to track affiliate link clicks
    const trackAffiliateClick = (service: string, position?: number) => {
        trackEvent('click', 'affiliate_link', service, position);
    };

    const trackAffiliateFooterClick = (service: string, position?: number) => {
        trackEvent('click', 'affiliate_link_footer', service, position);
    };

    // Function to track language changes
    const trackLanguageChange = (language: string) => {
        trackEvent('language_change', 'user_interaction', language);
    };

    // Function to track service card views
    const trackServiceView = (service: string) => {
        trackEvent('view_item', 'service', service);
    };

    return {
        trackEvent,
        trackAffiliateClick,
        trackAffiliateFooterClick,
        trackLanguageChange,
        trackServiceView,
    };
}
