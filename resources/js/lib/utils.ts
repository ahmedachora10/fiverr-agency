import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function setting(settings: any, key: string) {
    return settings[key] || '';
}

export function updateMetaTag(name: string, content: string, property = false) {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    if (!meta) {
        meta = document.createElement('meta');
        if (property) {
            meta.setAttribute('property', name);
        } else {
            meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
    }
    meta.content = content;
}

export function updateLangLink(name: string, href: string, lang?: string) {
    const selector = lang ? `link[hreflang="${lang}"]` : `link[rel="${name}"]`;
    let link = document.querySelector(selector) as HTMLLinkElement;
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', lang ? 'alternate' : name);
        if (lang) {
            link.setAttribute('hreflang', lang);
        }
        link.setAttribute('href', href);
        document.head.appendChild(link);
    }
}

