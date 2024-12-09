import { getRequestConfig } from 'next-intl/server';
export default getRequestConfig(async (context) => {
  const locale = context.locale || 'en';
  try {
    const messages = (await import(`../locales/${locale}.json`)).default;
    return { messages };
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    const defaultMessages = (await import(`../locales/en.json`)).default;
    return { messages: defaultMessages };
  }
});
