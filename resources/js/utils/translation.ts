/** 
 * Translation utility for handling locale-specific strings from Laravel backend
 * Works with the flat translation format: { title_en: "English", title_ar: "العربية" }
 */


export type SupportedLocale = 'en' | 'ar';

export interface TranslatableFields {
  [key: string]: string;
}

/**
 * Get the current locale from the page props or default to 'en'
 */
export function getCurrentLocale(): SupportedLocale {

  if (window.localStorage.getItem('language')) {
    return window.localStorage.getItem('language') as SupportedLocale;
  }

  // Try to get locale from page props (Inertia.js)
  if (typeof window !== 'undefined' && (window as any).page?.props?.locale) {
    return (window as any).page.props.locale as SupportedLocale;
  }

  // Fallback to browser language or default
  const browserLang = navigator.language.split('-')[0];
  return (browserLang === 'ar' ? 'ar' : 'en') as SupportedLocale;
}

/**
 * Extract translation for a specific field and locale
 * @param data Object containing locale-specific fields
 * @param field Base field name (e.g., 'title', 'description')
 * @param locale Target locale (defaults to current locale)
 * @returns Translated string or empty string if not found
 */
export function getTranslation(
  data: TranslatableFields,
  field: string,
  locale?: SupportedLocale
): string {
  const targetLocale = locale || getCurrentLocale();

  return data[field][targetLocale] || data[field] || '';
}

/**
 * Get all available translations for a field
 * @param data Object containing locale-specific fields
 * @param field Base field name
 * @returns Object with locale keys and their translations
 */
export function getAllTranslations(
  data: TranslatableFields,
  field: string
): Record<SupportedLocale, string> {
  return {
    en: data[field] || '',
    ar: data[field] || '',
  };
}

/**
 * Check if a field has translation for a specific locale
 * @param data Object containing locale-specific fields
 * @param field Base field name
 * @param locale Target locale
 * @returns Boolean indicating if translation exists
 */
export function hasTranslation(
  data: TranslatableFields,
  field: string,
  locale: SupportedLocale
): boolean {

  return Boolean(data[field] && data[field][locale] && data[field][locale].trim());
}

/**
 * Get the best available translation (current locale or fallback to English)
 * @param data Object containing locale-specific fields
 * @param field Base field name
 * @param locale Target locale (defaults to current locale)
 * @returns Best available translation
 */
export function getBestTranslation(
  data: TranslatableFields,
  field: string,
  locale?: SupportedLocale
): string {
  const targetLocale = locale || getCurrentLocale();

  console.log(field, data[field], data);

  if (typeof data[field] === 'string') {
    return data[field];
  }

  // Try target locale first
  if (hasTranslation(data, field, targetLocale)) {
    return getTranslation(data, field, targetLocale);
  }

  // Last resort: return any available translation
  // const allTranslations = getAllTranslations(data, field);
  return data[field]['end'] || data[field]['ar'] || '';
}

/**
 * Create form data object with locale-specific fields for submission
 * @param baseData Base form data
 * @param translatableFields Object with field names and their locale values
 * @returns Combined form data ready for submission
 */
export function createTranslatableFormData(
  baseData: Record<string, any>,
  translatableFields: Record<string, Record<SupportedLocale, string>>
): Record<string, any> {
  const formData = { ...baseData };

  Object.entries(translatableFields).forEach(([field, translations]) => {
    Object.entries(translations).forEach(([locale, value]) => {
      formData[`${field}_${locale}`] = value;
    });
  });

  return formData;
}

/**
 * Extract translatable fields from form data
 * @param data Form data with locale-specific fields
 * @param fields Array of base field names to extract
 * @returns Object with field names and their locale values
 */
export function extractTranslatableFields(
  data: TranslatableFields,
  fields: string[]
): Record<string, Record<SupportedLocale, string>> {
  const result: Record<string, Record<SupportedLocale, string>> = {};

  fields.forEach(field => {
    result[field] = getAllTranslations(data, field);
  });

  return result;
}

/**
 * Validate that required translatable fields have at least one translation
 * @param data Object containing locale-specific fields
 * @param requiredFields Array of required field names
 * @returns Array of missing field names
 */
export function validateTranslatableFields(
  data: TranslatableFields,
  requiredFields: string[]
): string[] {
  const missingFields: string[] = [];

  requiredFields.forEach(field => {
    const hasEnglish = hasTranslation(data, field, 'en');
    const hasArabic = hasTranslation(data, field, 'ar');

    if (!hasEnglish && !hasArabic) {
      missingFields.push(field);
    }
  });

  return missingFields;
}

/**
 * Format text for RTL display when Arabic locale is active
 * @param text Text to format
 * @param locale Target locale
 * @returns Formatted text with appropriate direction
 */
export function formatTextDirection(text: string, locale?: SupportedLocale): string {
  const targetLocale = locale || getCurrentLocale();

  if (targetLocale === 'ar') {
    // Add RTL mark for Arabic text
    return `\u202B${text}\u202C`;
  }

  return text;
}

/**
 * Get CSS direction class for locale
 * @param locale Target locale
 * @returns CSS class name for text direction
 */
export function getDirectionClass(locale?: SupportedLocale): string {
  const targetLocale = locale || getCurrentLocale();
  return targetLocale === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Hook-like function to get translation with automatic re-rendering support
 * @param data Object containing locale-specific fields
 * @param field Base field name
 * @param locale Target locale
 * @returns Translation function
 */
export function useTranslation(data: any) {
  const translationData = data as TranslatableFields;
  return {
    t: (field: string, locale?: SupportedLocale) => getTranslation(translationData, field, locale),
    tBest: (field: string, locale?: SupportedLocale) => getBestTranslation(translationData, field, locale),
    tAll: (field: string) => getAllTranslations(translationData, field),
    hasT: (field: string, locale: SupportedLocale) => hasTranslation(translationData, field, locale),
    currentLocale: getCurrentLocale(),
    isRTL: getCurrentLocale() === 'ar',
  };
}
