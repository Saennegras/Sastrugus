import type { Core } from '@strapi/strapi';

const ROLES = [
  {
    name: 'Public',
    description: 'Vendégek - csak ingyenes workshopok',
    type: 'public',
  },
  {
    name: 'Authenticated',
    description: 'Bejelentkezett felhasználók - csak ingyenes workshopok',
    type: 'authenticated',
  },
  {
    name: 'Editor',
    description: 'Szerkesztők - létrehozhatnak és szerkeszthetnek saját workshopokat',
    type: 'editor',
  },
  {
    name: 'Premium',
    description: 'Hozzáférés az összes workshophoz, beleértve a prémiumokat is',
    type: 'premium',
  },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
  public: [
    // Auth - login, register, password reset
    'plugin::users-permissions.auth.callback',
    'plugin::users-permissions.auth.register',
    'plugin::users-permissions.auth.forgotPassword',
    'plugin::users-permissions.auth.resetPassword',
    // Workshop - read free only (policy enforced)
    'api::workshop.workshop.find',
    'api::workshop.workshop.findOne',
    'api::workshop-category.workshop-category.find',
    'api::workshop-category.workshop-category.findOne',
    // Payment
    'api::payment.payment.callback',
  ],
  authenticated: [
    // Auth
    'plugin::users-permissions.auth.changePassword',
    'plugin::users-permissions.user.me',
    'plugin::users-permissions.user.update',
    // Workshop - read free only (policy enforced)
    'api::workshop.workshop.find',
    'api::workshop.workshop.findOne',
    'api::workshop-category.workshop-category.find',
    'api::workshop-category.workshop-category.findOne',
    'api::payment.payment.init',
    'api::payment.payment.callback',

  ],
  editor: [
    // Auth
    'plugin::users-permissions.auth.changePassword',
    'plugin::users-permissions.user.me',
    'plugin::users-permissions.user.update',
    // Workshop - CRUD with restrictions (policies enforced)
    'api::workshop.workshop.find',
    'api::workshop.workshop.findOne',
    'api::workshop.workshop.create',
    'api::workshop.workshop.update',
    'api::workshop-category.workshop-category.find',
    'api::workshop-category.workshop-category.findOne',
    'api::payment.payment.init',
    'api::payment.payment.callback',
  ],
  premium: [
    // Auth
    'plugin::users-permissions.auth.changePassword',
    'plugin::users-permissions.user.me',
    'plugin::users-permissions.user.update',
    // Workshop - read all (no price filter)
    'api::workshop.workshop.find',
    'api::workshop.workshop.findOne',
    'api::workshop-category.workshop-category.find',
    'api::workshop-category.workshop-category.findOne',
    'api::payment.payment.init',
    'api::payment.payment.callback',
  ],
};

export async function seedRoles(strapi: Core.Strapi) {
  console.log('  → Seeding roles...');

  for (const role of ROLES) {
    let roleRecord = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: role.type },
    });

    if (roleRecord) {
      await strapi.db.query('plugin::users-permissions.role').update({
        where: { id: roleRecord.id },
        data: { name: role.name, description: role.description },
      });
      console.log(`    ✓ Role "${role.type}" updated`);
    } else {
      roleRecord = await strapi.db.query('plugin::users-permissions.role').create({
        data: role,
      });
      console.log(`    + Created role "${role.type}"`);
    }

    await seedRolePermissions(strapi, roleRecord.id, ROLE_PERMISSIONS[role.type] || []);
  }
}

async function seedRolePermissions(strapi: Core.Strapi, roleId: number, actions: string[]) {
  await strapi.db.query('plugin::users-permissions.permission').deleteMany({
    where: { role: roleId },
  });

  for (const action of actions) {
    await strapi.db.query('plugin::users-permissions.permission').create({
      data: { action, role: roleId },
    });
  }
  console.log(`      Assigned ${actions.length} permissions`);
}

export async function getRoleByType(strapi: Core.Strapi, type: string) {
  return strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type },
  });
}