import type { Core } from '@strapi/strapi';
import { seedLocales } from './locales';
import { seedRoles } from './roles';
import { seedUsers } from './users';
import { seedAdminUsers } from './admin-user';
//import { seedContent } from './content';

export async function seed(strapi: Core.Strapi) {
  console.log('🌱 Starting seed...');

  try {
    await seedLocales(strapi);
    await seedRoles(strapi);
    await seedUsers(strapi);
    await seedAdminUsers(strapi);  
    // await seedContent(strapi);
    
    console.log('✅ Seed completed!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  }
}
