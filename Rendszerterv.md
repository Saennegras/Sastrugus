Sastrugus - Rendszerterv
1. Projekt Áttekintés

Sastrugus egy online workshop platform, ahol a felhasználók regisztrálhatnak és különböző projektek (pl. bútorok, elektronikai eszközök) építéséhez kapnak útmutatást, template-eket és lépésről-lépésre leírásokat.
Főbb jellemzők:

    Felhasználó regisztráció és profilkezelés

    Projekt katalógus különböző kategóriákban

    Lépésről-lépésre építési útmutatók

    Anyaglista és eszközök dokumentációja

    Közösségi funkciók (kommentek, értékelések)

2. Architektúra
2.1. Frontend

    NextJS - modern, szerver oldali komponens-alapú (by default) keretrendszer
    Responsive design - mobil és asztali eszközök optimalizálása

2.2. Backend

    Strapi
    REST API - strukturált adatkommunikáció
    JWT token alapú hitelesítés

2.3. Adatbázis

    PostgreSQL vagy MongoDB - a projekt struktúrájától függően
    File Storage - képek, PDF-ek (AWS S3 vagy hasonló)

2.4. Hosting

    Cloud platform (AWS, Google Cloud, DigitalOcean)
    CI/CD pipeline - automatikus deploy

3. Adatmodell
Fő entitások:

User (Felhasználó)
```javascript
{
  id: UUID,
  email: String,
  username: String,
  password: String (hashed),
  profile_picture: String (URL),
  joined_date: Date,
  skill_level: Enum(beginner, intermediate, advanced)
}
```
Project (Projekt)
```javascript
{
  id: UUID,
  title: String,
  description: String,
  category: Enum(furniture, electronics, crafts, etc.),
  difficulty: Enum(easy, medium, hard),
  estimated_time: Number, // órákban
  materials: Array, // anyaglista
  tools: Array, // szükséges eszközök
  featured_image: String (URL),
  created_by: User ID,
  created_date: Date,
  steps: Array of Step objects
}
```
Step (Lépés)
```javascript
{
  step_number: Number,
  title: String,
  description: String,
  images: Array of URLs,
  tips: Array of Strings,
  warnings: Array of Strings
}
```
4. Funkcionális követelmények
4.1. Felhasználókezelés

    Regisztráció és bejelentkezés

    Profil szerkesztése

    Jelszó visszaállítás

    Kedvencek kezelése

4.2. Projekt böngészés

    Kategóriák szerinti szűrés

    Keresés kulcsszavak alapján

    Nehézségi szint szerinti szűrés

    Legnépszerűbb projektek megjelenítése

4.3. Projekt megtekintés

    Részletes projektoldal

    Lépésről-lépésre navigáció

    Anyaglista és eszközlista

    Kommentek és értékelések

    Nyomtatható változat

4.4. Admin felület

    Projekt moderálás

    Felhasználókezelés

    Statisztikák

5. Nem funkcionális követelmények
5.1. Teljesítmény

    Oldalbetöltési idő < 3 másodperc

    99% uptime garantálása

    Skálázhatóság - akár 10,000 egyidejű felhasználó

5.2. Biztonság

    Jelszavak titkosítva tárolása (bcrypt)

    SQL injection védelem

    XSS védelem

    HTTPS kényszerítése

5.3. Felhasználói élmény

    Reszponzív design

    Intuitív navigáció

    Gyors keresés és szűrés

    Offline elérhetőség alapvető funkciókhoz

6. Fejlesztési terv
6.1. Fázisok
1. Fázis: Alap MVP (3 hónap)

    Felhasználó regisztráció/bejelentkezés

    Alap projekt struktúra

    5-10 minta projekt

    Alap design és navigáció

2. Fázis: Közösségi funkciók (2 hónap)

    Kommentek és értékelések

    Kedvencek

    Profiloldalak

3. Fázis: Haladó funkciók (2 hónap)

    Projekt beküldés felhasználóktól

    Offline mód

    Haladás követése

6.2. Technológiai stack választás
Frontend:

    NextJS - típusbiztonság és nagy közösség

    SASS - gyors styling

    React Router - navigáció

Backend:

    Strapi - JavaScript teljes stack

    PostgreSQL - relációs adatbázis

    JWT - hitelesítés

Egyéb eszközök:

    Git/GitHub - verziókezelés

    Docker - konténerizáció

    Jest/Cypress - tesztelés

7. Kockázatelemzés
Magas prioritású kockázatok:

    Biztonsági rések - rendszeres audit és dependency frissítés

    Teljesítmény problémák - monitoring és optimalizálás

    Adatvesztés - rendszeres backup stratégia

Közepes prioritású kockázatok:

    Felhasználóelfogadás - UX tesztelés és iteratív fejlesztés

    Tartalom minősége - moderálási rendszer

8. Költségvetés és erőforrások
Fejlesztői csapat:

    2 Full-stack fejlesztő

    1 UX/UI designer

    1 Projektmenedzser (részidőben)

Infrastruktúra költségek (havi):

    Hosting: $50-100

    Adatbázis: $20-50

    File storage: $10-30

    CDN: $15-40

9. Következő lépések

    Részletes wireframe-ek készítése

    Design system kialakítása

    Adatbázis séma tervezés

    MVP funkcionalitás priorizálása

    Fejlesztői környezet beállítása

Ez a rendszerterv egy stabil alapot biztosít a Sastrugus weboldal fejlesztéséhez, amely rugalmasságot biztosít a jövőbeli bővítésekhez, miközben megőrzi az egyszerűséget és felhasználóbarátságot.