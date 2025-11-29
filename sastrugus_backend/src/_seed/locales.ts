import type { Core } from '@strapi/strapi';

const LOCALES = [
  { code: 'en', name: 'English', isDefault: false },
  { code: 'hu', name: 'Magyar', isDefault: true },
];

export async function seedLocales(strapi: Core.Strapi) {
  console.log('  → Seeding locales...');
  
  const i18n = strapi.plugin('i18n');
  if (!i18n) {
    console.log('  ⚠ i18n plugin not installed, skipping locales');
    return;
  }

  const localeService = i18n.service('locales');

  for (const locale of LOCALES) {
    const existing = await localeService.findByCode(locale.code);
    
    if (existing) {
      console.log(`✓ Locale "${locale.code}" exists`);
      continue;
    }

    await localeService.create({
      code: locale.code,
      name: locale.name,
      isDefault: locale.isDefault,
    });
    
    console.log(`    + Created locale "${locale.code}"`);
  }
}
