import type { Core } from '@strapi/strapi';
import bcrypt from 'bcryptjs';

const ADMIN_USERS = [
  {
    email: 'superadmin@example.com',
    password: 'SuperAdmin123!',
    firstname: 'Super',
    lastname: 'Admin',
  },
];

export async function seedAdminUsers(strapi: Core.Strapi) {
  console.log('  → Seeding admin users...');

  // Get Super Admin role (built-in, code: strapi-super-admin)
  const superAdminRole = await strapi.db.query('admin::role').findOne({
    where: { code: 'strapi-super-admin' },
  });

  if (!superAdminRole) {
    console.log('    ⚠ Super Admin role not found');
    return;
  }

  for (const userData of ADMIN_USERS) {
    const existing = await strapi.db.query('admin::user').findOne({
      where: { email: userData.email },
    });

    if (existing) {
      console.log(`    ✓ Admin "${userData.email}" exists`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);;

    await strapi.db.query('admin::user').create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstname: userData.firstname,
        lastname: userData.lastname,
        isActive: true,
        blocked: false,
        roles: [superAdminRole.id],
      },
    });

    console.log(`    + Created admin "${userData.email}"`);
  }
}