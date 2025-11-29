import type { Core } from '@strapi/strapi';
import bcrypt from 'bcryptjs';
import { getRoleByType } from './roles';

// 2 users
const USERS = [
  {
    username: 'editor',
    email: 'editor@example.com',
    password: 'Editor123!',
    confirmed: true,
    blocked: false,
    roleType: 'editor',
  },
  {
    username: 'premium',
    email: 'premium@example.com', 
    password: 'Premium123!',
    confirmed: true,
    blocked: false,
    roleType: 'premium',
  },
  {
    username: 'blocked',
    email: 'blocked@example.com', 
    password: 'Premium123!',
    confirmed: true,
    blocked: true,
    roleType: 'premium',
  },
  {
    username: 'notconfirmed',
    email: 'notconfirmed@example.com', 
    password: 'Premium123!',
    confirmed: false,
    blocked: false,
    roleType: 'premium',
  },  
];

export async function seedUsers(strapi: Core.Strapi) {
  console.log('  → Seeding users...');

  for (const userData of USERS) {
    const existing = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email: userData.email },
    });

    if (existing) {
      console.log(`    ✓ User "${userData.email}" exists`);
      continue;
    }

    // Get role
    const role = await getRoleByType(strapi, userData.roleType);
    if (!role) {
      console.log(`    ⚠ Role "${userData.roleType}" not found, skipping user`);
      continue;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);;

    await strapi.db.query('plugin::users-permissions.user').create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
        confirmed: userData.confirmed,
        blocked: userData.blocked,
        role: role.id,
        provider: 'local',
      },
    });

    console.log(`    + Created user "${userData.email}"`);
  }
}
