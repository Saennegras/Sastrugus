Sastrugus - Rendszerterv
1. Projekt Áttekintés

Sastrugus - Online workshop platform 1 hónapos határidővel
Technológiai Stack:

    Frontend: Next.js 13 + SASS

    Backend/Headless CMS: Strapi

    Design: Figma

    Project Management: AGI Kanban

    Időkeret: 1 hónap

2. Architektúra - Next.js + Strapi Specifikus
2.1. Frontend Architektúra (Next.js 13)
javascript

// Mappa struktúra
src/
├── app/                 # App Router (Next.js 13)
│   ├── (auth)/         route groups
│   ├── api/            API routes
│   ├── workshops/
│   └── layout.js
├── components/         Reusable components
├── sass/            SASS modules
└── lib/               Utilities, config

2.2. Backend Architektúra (Strapi)
javascript

// Strapi Content-Types
src/api/
├── workshop/
├── user/
├── payment/
├── expert-session/
└── subscription/

2.3. Adatbázis

    Strapi default: SQLite (fejlesztés) / PostgreSQL (production)

    Strapi Admin: Built-in CMS felület

3. 1 Hónapos Fejlesztési Terv (Sprint Breakdown)
Heti Sprint-ek (4 Sprint)
Sprint 1: Alapok és Setup (1. hét)
markdown

**Cél**: Alap projekt struktúra, design system
- [ ] Next.js projekt inicializálás
- [ ] Strapi CMS setup
- [ ] Figma design system készítés
- [ ] AGI Kanban board setup
- [ ] Alap routing és layout
- [ ] Design token-ek (SASS variables)

Sprint 2: Fő Funkcionalitás (2. hét)
markdown

**Cél**: Workshop böngészés, felhasználó kezelés
- [ ] Workshop listing komponens
- [ ] Keresés és szűrés
- [ ] Felhasználó regisztráció/bejelentkezés
- [ ] Strapi Content-Types definiálás
- [ ] API integráció
- [ ] Reszponzív design

Sprint 3: Fizetési Rendszer (3. hét)
markdown

**Cél**: Prémium workshopok és fizetés
- [ ] Stripe integráció
- [ ] Prémium workshop komponensek
- [ ] Kosár és checkout folyamat
- [ ] Fizetési státusz kezelés
- [ ] Vásárlási előzmények

Sprint 4: Szakértői Rendszer és Finomhangolás (4. hét)
markdown

**Cél**: Szakértői segítség, tesztelés, deploy
- [ ] Szakértői profilok
- [ ] Időpontfoglalás
- [ ] Tesztelés és bugfixing
- [ ] Production build és deploy
- [ ] Dokumentáció

4. AGI Kanban Board Struktúra
Board Szekciók:
```yaml

Backlog:
  - Minden feladat először ide kerül
  - Prioritás szerint rendezve

Sprint Planning:
  - Aktuális sprint feladatai
  - Story point becslések

In Progress:
  - Jelenleg dolgozás alatt álló taskok
  - Fejlesztő hozzárendelve

Code Review:
  - Befejezett, review-ra váró taskok
  - PR linkek

Testing:
  - Tesztelésre váró funkciók
  - Teszt esetek dokumentálva

Done:
  - Teljesített feladatok
  - Sprint review-hoz kész
```
Task Template:

## Task Név
**Sprint**: Sprint X
**Prioritás**: High/Medium/Low
**Story Points**: X
**Felelős**: [Fejlesztő neve]
**Leírás**: 
[Reszletes leírás]

**Elfogadási Kritériumok**:
- [ ] Kritérium 1
- [ ] Kritérium 2

**Technikai Részletek**:
- Komponens: [komponens neve]
- API endpoint: [endpoint]
- Strapi Content-Type: [content-type]

5. Next.js Specifikus Implementáció
5.1. App Router Struktúra

```JavaScript
// app/layout.js
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

// app/workshops/page.js
export default async function WorkshopsPage() {
  const workshops = await getWorkshops();
  
  return (
    <div className="workshops-container">
      <WorkshopFilters />
      <WorkshopGrid workshops={workshops} />
    </div>
  )
}
```

5.2. Strapi API Integráció

```Typescript
// lib/strapi.ts
const STRAPI_URL = process.env.STRAPI_URL;

export async function getWorkshops() {
  const res = await fetch(`${STRAPI_URL}/api/workshops?populate=*`);
  return res.json();
}

export async function createPayment(sessionData: any) {
  const res = await fetch(`${STRAPI_URL}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: sessionData }),
  });
  return res.json();
}
```

6. Strapi Content-Types Definíciók
6.1. Workshop Content-Type

```JavaScript
// src/api/workshop/content-types/workshop/schema.json
{
  "kind": "collectionType",
  "collectionName": "workshops",
  "info": {
    "singularName": "workshop",
    "pluralName": "workshops",
    "displayName": "Workshop"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "description": {
      "type": "text"
    },
    "price": {
      "type": "decimal"
    },
    "isPremium": {
      "type": "boolean",
      "default": false
    },
    "category": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::category.category"
    },
    "steps": {
      "type": "component",
      "repeatable": true,
      "component": "workshop.step"
    }
  }
}
```

7. Design System (Figma + SASS)
7.1. SASS Struktúra

```CSS
// styles/_variables.scss
$primary-color: #2c5530;
$secondary-color: #4a7c59;
$accent-color: #8fb996;
$text-dark: #2d2d2d;
$text-light: #6b7280;

// styles/_mixins.scss
@mixin button-base {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

@mixin ascii-border {
  border: 1px solid $text-dark;
  position: relative;
  
  &::before {
    content: "┌";
    position: absolute;
    top: -1px;
    left: -1px;
  }
}
```

7.2. Komponens Stílusok

```CSS
// sass/components/_workshop-card.scss
.workshop-card {
  @include ascii-border;
  background: white;
  padding: 20px;
  
  &.premium {
    border-color: $accent-color;
    
    &::before {
      color: $accent-color;
    }
  }
  
  .premium-badge {
    background: $accent-color;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
  }
}
```

8. Fizetési Rendszer (Stripe + Strapi)
8.1. Stripe Integráció

```Typescript
// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: Request) {
  const { workshopId, userId } = await request.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Workshop Purchase',
          },
          unit_amount: 2499, // $24.99
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cancel`,
    metadata: {
      workshopId,
      userId,
    },
  });

  return NextResponse.json({ sessionId: session.id });
}
```

9. Környezeti Változók és Konfiguráció
9.1. .env.local
```env

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Strapi
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-strapi-token

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=your-database-url

10. Minőségbiztosítás és Tesztelés
10.1. Teszt Stratégia
typescript

// __tests__/workshops.test.tsx
import { render, screen } from '@testing-library/react';
import WorkshopGrid from '../components/WorkshopGrid';

describe('WorkshopGrid', () => {
  it('displays workshop cards', () => {
    const workshops = [{ id: 1, title: 'Test Workshop', price: 0 }];
    render(<WorkshopGrid workshops={workshops} />);
    
    expect(screen.getByText('Test Workshop')).toBeInTheDocument();
  });
});
```

10.2. Code Quality

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```
11. Deployment és CI/CD
11.1. Production Deploy

    Frontend: Vercel (Next.js optimalizált)

    Backend: Railway/Heroku (Strapi)

    Database: PostgreSQL (production)

    File Storage: AWS S3 vagy Cloudinary

11.2. Build Script

```json
{
  "build": "next build && strapi build",
  "deploy": "npm run build && vercel --prod"
}
```

12. Kockázatkezelés (1 Hónapra)
Kritikus Kockázatok:

    Időhiány - MVP fókusz, feature cutting

    Strapi learning curve - dokumentáció, community support

    Integrációs problémák - mock API-k használata fejlesztés közben

Mitigáció:

    Napi standup meeting-ek

    Heti demo-k a haladásról

    Feature prioritizálás (MoSCoW módszer)
