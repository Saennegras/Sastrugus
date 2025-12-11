import type { Core } from '@strapi/strapi';

const ADMIN_OWNER_EMAIL = 'superadmin@example.com';

const WORKSHOP_CATEGORIES = [
  {
    categoryName: 'Kerti barkács',
    slug: 'kerti-barkacs',
    categoryDescription:
      'Olyan kültéri ötletek, amelyeket egy délután alatt össze lehet állítani, akár iskolai műhelyben is. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod, nisl at convallis suscipit, metus nisl fermentum odio, vitae luctus quam magna ut enim.',
  },
  {
    categoryName: 'Újrahasznosítás',
    slug: 'ujrahasznositas',
    categoryDescription:
      'Praktikus projektek, ahol régi tárgyak kapnak új életet és a diákok is megtanulják a fenntarthatóság alapjait. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis nisl ac nulla varius eleifend.',
  },
  {
    categoryName: 'Iskolai műhely',
    slug: 'iskolai-muhely',
    categoryDescription:
      'Egyszerű, de látványos feladatok, amelyekkel a tanórán is lehet dolgozni. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris condimentum orci nec mattis congue.',
  },
];

const WORKSHOPS = [
  {
    title: 'Kerti fűszerállvány építése kezdőknek',
    description:
      '<p>Egy stabil, két szintes fűszerállványt készítünk, amit az iskola udvarán vagy otthon is fel lehet állítani. Rövid idő alatt látványos eredményt ad, ezért jó első barkácsprojekt.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a est sit amet justo vulputate viverra. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    materialRequirement:
      '<p>A projekthez néhány impregnált deszka, pár facsavar és kültéri lazúr szükséges, valamint alap kéziszerszámok.</p><ul><li>Impregnált fenyődeszka</li><li>Facsavar, csiszolópapír</li><li>Kültéri lazúr és ecset</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel consequat magna, eget dapibus augue.</p>',
    steps:
      '<p>Kezdésként vágjuk méretre a polclapokat és a tartóléceket, majd csiszoljuk le az éleket, hogy biztonságos legyen a használat.</p><p>Ezután előfúrjuk és összecsavarozzuk a keretet, végül felcsavarozzuk a polcokat és lekezeljük lazúrral.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>',
    Decimal: 0,
    isPremium: false,
    categoryName: 'Kerti barkács',
    ownerEmail: 'editor@example.com',
  },
  {
    title: 'Esővízgyűjtő hordó egyszerű állvánnyal',
    description:
      '<p>Megmutatjuk, hogyan lehet stabil faállványt készíteni egy szabvány műanyag hordó alá, hogy könnyen lehessen kannába engedni az esővizet.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus risus quis lacus convallis, at tempus leo dictum.</p>',
    materialRequirement:
      '<p>Rétegelt lemezből vágott lábak, keresztlécek, csavarok és egy 120 literes hordó.</p><ul><li>4 db 40x60 mm stafni láb</li><li>8 db keresztléc és sarokvas</li><li>Csavarok, vízmérték, csiszolópapír</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    steps:
      '<p>Először kiszabjuk és csiszoljuk a lábakat, majd keresztben összecsavarozzuk, hogy az állvány stabil legyen.</p><p>Rögzítjük a hordót, csapot illesztünk rá, és próbaként megtöltjük vízzel.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac ante non risus rhoncus convallis.</p>',
    Decimal: 3300,
    isPremium: true,
    categoryName: 'Kerti barkács',
    ownerEmail: 'premium@example.com',
  },
  {
    title: 'Palettából készült cipőtartó pad diákműhelyhez',
    description:
      '<p>Egy használt EUR raklapból strapabíró cipőtartó padot építünk, amely jól mutat a bejáratnál és ülőfelületként is szolgál. A projekt megmutatja, hogyan lehet gyorsan értéket teremteni újrahasznosítással.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    materialRequirement:
      '<p>Szükség van egy jó állapotú raklapra, csiszolópapírra, csavarokra és egy kevés fehér lazúrra vagy festékre.</p><ul><li>1 db EUR raklap</li><li>Csiszolópapír több szemcseméretben</li><li>Csavarok, festék, ecset</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non faucibus est.</p>',
    steps:
      '<p>Először tisztítsuk meg a raklapot, majd vágjuk ketté úgy, hogy egy alacsonyabb ülőfelület és egy polcos rész maradjon.</p><p>Csiszoljuk simára a felületet, csavarozzuk össze a két darabot, végül vonjuk be festékkel és hagyjuk száradni.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed dolor blandit, pulvinar erat id, volutpat tortor.</p>',
    Decimal: 300,
    isPremium: true,
    categoryName: 'Újrahasznosítás',
    ownerEmail: 'premium@example.com',
  },
  {
    title: 'Farönk újrahasznosított kávézóasztal görgőkkel',
    description:
      '<p>Egy kidőlt fa törzséből kompakt kávézóasztalt készítünk, amit görgőkkel mozgatunk. Látványos példa arra, hogyan lesz hulladékból dizájn darab.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt, velit non hendrerit aliquam, massa libero lacinia nunc, sed gravida magna nibh eget quam.</p>',
    materialRequirement:
      '<p>Közepes méretű farönk, négy forgó görgő, facsavarok és áttetsző lakk.</p><ul><li>Szárított farönk 30-40 cm átmérővel</li><li>4 db teherbíró görgő fékkel</li><li>Lakk, csiszolópapír, csavarhúzó</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    steps:
      '<p>A rönköt síkba csiszoljuk felül és alul, majd kezeljük gomba- és rovarölővel.</p><p>Alul jelöljük a görgők helyét, előfúrunk, és rögzítjük őket. Végül átlátszó lakkal vonjuk be a teljes felületet.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at metus non velit pharetra feugiat.</p>',
    Decimal: 0,
    isPremium: false,
    categoryName: 'Újrahasznosítás',
    ownerEmail: 'editor@example.com',
  },
  {
    title: 'Mobil szerszámos kocsi az iskolai műhelybe',
    description:
      '<p>Egy keskeny, görgős szerszámos kocsit építünk, ami elfér a padok között, és a diákok könnyen mozgathatják.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar, felis non sollicitudin aliquet, tellus libero aliquam eros, sed cursus urna mi at mauris.</p>',
    materialRequirement:
      '<p>Rétegelt lemez, fióksínek, görgők és pár fogantyú.</p><ul><li>12 mm-es rétegelt lemez lapok</li><li>2 pár fióksín, 4 db görgő</li><li>Fa csavarok, ragasztó, fogantyúk</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    steps:
      '<p>Kiszabjuk az oldallapokat és a polcokat, majd csavarokkal és ragasztóval összeállítjuk a dobozformát.</p><p>Felszereljük a görgőket, a fióksíneket és a fogantyúkat, végül lakkozzuk a felületet.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id orci vitae odio hendrerit porta.</p>',
    Decimal: 300,
    isPremium: false,
    categoryName: 'Iskolai műhely',
    ownerEmail: 'editor@example.com',
  },
  {
    title: 'Összecsukható forrasztóállomás doboz',
    description:
      '<p>Készítünk egy hordozható, összecsukható dobozt, amelyben forrasztópáka, ón és apró alkatrészek is elférnek, így a diákok biztonságosan vihetik óráról órára.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel vestibulum augue, non ultrices arcu.</p>',
    materialRequirement:
      '<p>Vékony rétegelt lemez, zsanérok, mágneszár és hőálló bélés.</p><ul><li>6 mm-es rétegelt lemez darabok</li><li>2-3 zsanér, mágneszár</li><li>Hőálló lap, csavarok, ragasztó</li></ul><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    steps:
      '<p>Összeállítjuk a doboz keretét, belül hőálló lapot ragasztunk, majd zsanérokkal csukható fedelet szerelünk fel.</p><p>Végül elválasztókat helyezünk be az eszközöknek, és mágneszárral biztosítjuk a zárást.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a mi nec justo cursus volutpat.</p>',
    Decimal: 200,
    isPremium: true,
    categoryName: 'Iskolai műhely',
    ownerEmail: 'premium@example.com',
  },
];

export async function seedContent(strapi: Core.Strapi) {
  console.log('  → Seeding workshop content...');

  const adminUser = await strapi.db.query('admin::user').findOne({
    where: { email: ADMIN_OWNER_EMAIL },
  });

  if (!adminUser) {
    console.log(`    ⚠ Admin user "${ADMIN_OWNER_EMAIL}" not found, audit fields will stay empty`);
  }

  const categoryMap = new Map<string, number>();

  for (const category of WORKSHOP_CATEGORIES) {
    const existing = await strapi.db
      .query('api::workshop-category.workshop-category')
      .findOne({ where: { categoryName: category.categoryName } });

    const baseData = {
      categoryDescription: category.categoryDescription,
      locale: null,
      publishedAt: new Date(),
      createdBy: adminUser?.id,
      updatedBy: adminUser?.id,
    };

    if (existing) {
      await strapi.db.query('api::workshop-category.workshop-category').update({
        where: { id: existing.id },
        data: baseData,
      });
      categoryMap.set(category.categoryName, existing.id);
      console.log(`    ✓ Category "${category.categoryName}" ready`);
    } else {
      const created = await strapi.db
        .query('api::workshop-category.workshop-category')
        .create({
          data: {
            categoryName: category.categoryName,
            ...baseData,
          },
        });
      categoryMap.set(category.categoryName, created.id);
      console.log(`    + Created category "${category.categoryName}"`);
    }
  }

  const userCache = new Map<string, number>();
  const getUserId = async (email: string) => {
    if (userCache.has(email)) return userCache.get(email);

    const user = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email },
    });

    if (user) {
      userCache.set(email, user.id);
      return user.id;
    }

    console.log(`    ⚠ User "${email}" not found, workshop owner left empty`);
    return undefined;
  };

  for (const workshop of WORKSHOPS) {
    const categoryId = categoryMap.get(workshop.categoryName);
    if (!categoryId) {
      console.log(`    ⚠ Category "${workshop.categoryName}" missing, skipping workshop "${workshop.title}"`);
      continue;
    }

    const existing = await strapi.db.query('api::workshop.workshop').findOne({
      where: { title: workshop.title },
    });

    const ownerId = await getUserId(workshop.ownerEmail);

    const data = {
      title: workshop.title,
      description: workshop.description,
      materialRequirement: workshop.materialRequirement,
      steps: workshop.steps,
      Decimal: workshop.Decimal,
      isPremium: workshop.isPremium,
      workshop_category: categoryId,
      owner: ownerId,
      locale: null,
      publishedAt: new Date(),
      createdBy: adminUser?.id,
      updatedBy: adminUser?.id,
    };

    if (existing) {
      await strapi.db.query('api::workshop.workshop').update({
        where: { id: existing.id },
        data,
      });
      console.log(`    ✓ Workshop "${workshop.title}" updated`);
    } else {
      await strapi.db.query('api::workshop.workshop').create({ data });
      console.log(`    + Created workshop "${workshop.title}"`);
    }
  }
}
