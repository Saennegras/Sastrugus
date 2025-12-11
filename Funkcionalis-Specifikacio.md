# Funkcionális specifikáció - Sastrugus workshop rendszer

|Paraméter  |Érték  |
|--|--|
|**Projekt neve**|Sastrugus online workshop  |
|**Dátum**|2025/2026 tanév őszi félév  |
|**Készítette**|Szabó István Keve (ZR36BD), Kovács Dániel (ADEJ1R)  |
|**Ötletgazda**|Szabó István Keve  |
|**Projektgazda**|Kovács Dániel  |
|**Backend**|Kovács Dániel  |
|**Frontend**|Szabó István Keve, Kovács Dániel  |
|**Manuális tesztelők**|Szabó István Keve, Kovács Dániel  |
|**Scrum Master**|Kovács Dániel (Szabó István Keve) |


## Bevezetés

Ez a dokumentum a Sastrugus online workshop / blueprint kezelő rendszer funkcionális működését írja le. Célja, hogy pontosan meghatározza, a rendszer milyen funkciókat biztosít, hogyan viselkedik a felhasználói interakciók során, és milyen adatokat kezel.

## Rendszeráttekintés

A rendszer böngészőből elérhető, webes alkalmazás amely nyilvánosan használható. Egyaránt kínál funkcionalitást vendég látogatóknak, és regisztrált felhasználóknak. A vendég felhasználók csak nyilvános workshopokat tekinthetnek meg, míg a regisztrált felhasználók ezen felül feltölthetnek saját leírásokat, illetve megvásárolhatnak prémium wbrkshopokat is.

## Felhasználói felületek
### Bejelentkezési képernyő

**Mezők:**
 - Felhasználónév
 - jelszó

**Műveletek:**
- Bejelentkezés
	- Ha sikeres átriányítás a profil oldalra
	- Ha sikertelen, üzenet megjelenítése
- Hivatkozás a regisztrációs felületre
- Ha a felhasználó bejelentkezett, átirányítás a profil oldalra
- Kijelentkezés: Nincs önálló oldal vagy funkcionalitás, a megfelelő API hívásra automatikusan megtörténik

### Főmenü
**Műveletek:**

 - Navigálás az egyes oldalak között 
 - Folyamatosan látható be és
   kijelentkezés gomb, a felhasználó állapotától függően 
   Az aktuális
   oldal (vagy oldalkategória) kiemelten látható

### Főoldal

Áttekintő képernyő, megjeleníti a legújabb három darab workshopot, hivatkozással a kategória oldalra és a workshopra

**Műveletek:** 
 
- A megjelenített workshopok mellett, a **kategória névre** kattintva az adott kategória jelenik meg 
- A megjelenített workshopok mellett, a **Tovább** gombra kattintva a workshop jelenik meg 
- A Hero szekcióban található **navigációs gomb** (Feliratkozás) a regisztrációs oldalra navigál

### Profil oldal
Az oldalon a felhasználó megtekintheti a saját workshopjait, létrehozhat újakat és szerkesztheti a meglévőket. Törlésre addig van mód, amíg a workshop nem prémium vagy prémium és nincs egyetlen előfizetője sem.
**Műveletek:** 
- Új workshop létrehozása
- Workshop szerkesztése
- Workshop törlése

### Workshop szerkesztő oldal
Workshopok létrehozása és szerkesztése
**Mezők:** 

 - Cím 
 - Kategória 
 - Rövid leírás 
 - Anyagszükséglet 
 - Lépsek leírása 
 - Videó link

**Műveletek:**
- Mentés
- Kilépés mentés nélkül

## Funkcionális folyamatok

### Workshop létrehozása

 1. A felhasználó bejelentkezik 
 2. Szükség esetén a profil oldalra navigál
 3. Az oldalon megnyomja az új workshop beküldése gombot 
 4. Kitölti a mezőket Mentés gombra kattint 
 5. Szükség esetén javítja a hibákat és ismét a mentés gombra kattint 
 6. A rendszer a workshop mentést nyugtázza

### Workshop szerkesztése

 1. A felhasználó bejelentkezik
 2. Szükség esetén a profil oldalra navigál
 3. Kiválasztja a workshopot, a szerkesztés gombra kattint
 4. Módosítja a kívánt mezőket
 5. Mentés gombra kattint
 6. Szükség esetén javítja a hibákat és ismét a mentés gombra kattint 
 7. A rendszer a workshop mentést nyugtázza

### Prémium workshop megvásárlása

 1.  A bejelentkezett felhasználó a vásárlás gombra kattint a workshop oldalon
 2. A felhasználó átirányításra kerül a SimplePay felületére
 3. A felhasználó elvégzi a fizetést vagy visszalép
 4. A rendszer elemezi a fizetés állapotát
 5. Sikeres fizetés esetén megjeleníti a workshopot
 6. Sikertelen fizetés esetén hibaüzenet jelenik meg
 
 #### Backend logika:
 
 7. A fizetési kérelem beérkezésekor a backend lekérdezi a workshop állapotát
 8. Ha a backend nem prémium vagy a felhasználó nincs bejelentkezve, vagy bejelentkezett de már megvásárolta, hibaüzenetet küld vissza. Folyamat vége
 9. A backend felépíti a Simpleay csomagot, aláírja és elküldi a simplepay felé
 10. A kapott linket visszaküldi a frontrendnek, a frontend elvégzi a navigációt.
 11. A vásárlásból való visszatérés után elemzi a Simplepay választ
 12. A válasznak megfelelően, sikeres vásárlás után rögzíti a vásárlás tényét és megjeleníti a workshopot
 13. Vagy hibaüzenetet jelenít meg.  


## Adatmodell

### Workshop
| Mező neve| Mező típusa | Leírás| Követelmények / Megjegyzések |
| :--- | :--- | :--- | :--- |
| **`title`** | `string` | Cím | Kötelező, 20-200 karakter |
| **`description`** | `text` | Leírás | Kötelező |
| **`materialRequirement`** | `text` | Anyagszükséglet | Opcionális |
| **`steps`** | `text` | Lépések/Módszer | Kötelező |
| **`Decimal`** | `integer` | Egész szám | Opcionális |
| **`isPremium`** | `boolean` | Prémium | Kötelező |
| **`workshop_category`** | `relation` | Műhely kategória | Kapcsolat (sok az egyhez) |
| **`owner`** | `relation` | Tulajdonos | Kapcsolat (sok az egyhez) |

### Workshop kategória
| Mező neve | Mező típusa | Leírás | Követelmények / Megjegyzések |
| :--- | :--- | :--- | :--- |
| **`categoryName`** | `string` | Kategória neve | Opcionális. |
| **`categoryDescription`** | `text` | Kategória leírása | Opcionális. |
| **`workshops`** | `relation` | Műhelyek | Kapcsolat: egy a sokhoz (`oneToMany`) a `workshop` tartalomtípussal. |
| **`slug`** | `string` | SEO Cím / Egyedi URL rész | Kötelező és egyedi. |

 ### User schema (alapértelmezett strapi schema kibővítve)
| Mező neve| Mező típusa| Leírás| Követelmények / Megjegyzések |
| :--- | :--- | :--- | :--- |
| **`AboutMe`** | `RichText` | Bemutatkozás | - |
| **`blocked`** | `Boolean` | Blokkolt | Alapértelmezett: `false` |
| **`confirmationToken`** | `String` | Megerősítő token | Privát mező. |
| **`confirmed`** | `Boolean` | Megerősítve | Alapértelmezett: `false` |
| **`createdAt`** | `DateTime` | Létrehozás dátuma | - |
| **`createdBy`** | `Relation` | Létrehozó | Privát, Kapcsolat: `oneToOne` (admin::user) |
| **`email`** | `Email` | E-mail cím | Kötelező, Min. hossz: 6 |
| **`FirstName`** | `String` | Keresztnév | Min. hossz: 5, Max. hossz: 50 |
| **`locale`** | `String` | Nyelv / Hely | Privát mező. |
| **`localizations`** | `Relation` | Lokalizációk | Privát mező. |
| **`password`** | `Password` | Jelszó | Privát, Min. hossz: 6 |
| **`provider`** | `String` | Hitelesítés szolgáltató | - |
| **`publishedAt`** | `DateTime` | Publikálás dátuma | - |
| **`resetPasswordToken`**| `String` | Jelszó-visszaállító token | Privát mező. |
| **`role`** | `Relation` | Szerepkör | Kapcsolat: `manyToOne` (plugin::users-permissions.role) |
| **`TokensAvailable`** | `Integer` | Elérhető tokenek | Alapértelmezett: `0` |
| **`updatedAt`** | `DateTime` | Frissítés dátuma | - |
| **`updatedBy`** | `Relation` | Frissítette | Privát, Kapcsolat: `oneToOne` (admin::user) |
| **`username`** | `String` | Felhasználónév | Kötelező, Egyedi, Min. hossz: 3 |
| **`workshops`** | `Relation` | Műhelyek | Kapcsolat: `oneToMany` (api::workshop.workshop) |

## Folyamatleírások

### Login

```mermaid
flowchart LR
    A["Felhasználói oldal rendelése"] --> B{"Felhasználó bejelentkezett?"}
    B -->|Igen| C["Átirányítás a dashboard oldalra"]
    B -->|Nem| D["Login form megjelenítése"]
    D --> E["Submit gomb megnyomása"]
    E --> F["Login indítása a backend proxy felé"]
    F --> G["Backend proxy meghívja a backendet"]
    G --> H{"Sikeres bejelentkezés?"}
    H -->|Igen| I["JWT és refresh token mentés"]
    H -->|Nem| J["Hibaüzenet továbbadása frontendnek"]
    I --> K["Frontend megkapja a bejelentkezési kísérlet eredményét"]
    J --> K
    K --> L{"Sikeres?"}
    L -->|Igen| M["Átirányítás a dashboardra"]
    L -->|Nem| N["Hibaüzenet megjelenítése"]
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class C,I,M successClass
    class J,N errorClass
    class D,E,F,G,K processClass

```

### Regisztráció	

```mermaid
flowchart LR
    A["Regisztráció oldal renderelése"] --> B{"Felhasználó bejelentkezett?"}
    B -->|Igen| C["Átirányítás a Dashboard oldalra"]
    B -->|Nem| D["Regisztrációs form megjelenítése"]
    D --> E["Submit gomb megnyomása"]
    E --> F["Regisztráció indítása backend proxyn keresztül"]
    F --> G["Backend validálja az adatokat"]
    G --> H["Backend választ küld"]
    H --> I{"Sikeres regisztráció?"}
    I -->|Igen| J["Átirányítás a dashboard oldalra"]
    I -->|Nem| K["Hibaüzenetek megjelenítése"]
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class C,J successClass
    class K errorClass
    class D,E,F,G,H processClass
```

### Logout	

```mermaid
flowchart LR
    A["Kijelentkezés indítása"] --> B["Kijelentkezés proxy végpont hívása"]
    B --> C["Proxy törli a JWT és a Refresh tokent"]
    C --> D["Átirányítás a login oldalra"]
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class D successClass
    class B,C processClass
```

### Védett oldalak és tokenek kezelése	

```mermaid
flowchart LR
    A["JWT token és Refresh token kinyerése Cookie-ből"] --> B{"JWT lejárt?"}
    B -->|Igen| C["RefreshAccessToken hívása"]
    B -->|Nem| D["Middleware folytatása"]
    C --> E{"Sikeres?"}
    E -->|Igen| F["JWT mentése és middleware folytatása az új tokennel"]
    E -->|Nem| G["Régi JWT és Refresh token törlése"]
    G --> H["Átirányítás a login oldalra"]
    F --> I{"Nincs belépve és védett oldal?"}
    D --> I
    I -->|Igen| J["Átirányítás login oldalra"]
    I -->|Nem| K{"Belépett és login/regisztráció oldal?"}
    K -->|Igen| L["Átirányítás Dashboard oldalra"]
    K -->|Nem| M["Folytatás, request továbbengedése"]
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class F,L,M successClass
    class G,H,J errorClass
    class A,C,D processClass

```


### Workshop létrehozása és módosítása	

```mermaid
flowchart LR
    A["Workshop szerkesztő oldal megjelenítése"] --> B["Felhasználó kitölti / módosítja az adatokat"]
    B --> C["Felhasználó mentés gombra kattint"]
    C --> D["Backend művelet"]
    D --> E{"Sikeres?"}
    E -->|Igen| F["Vissza a dashboardra üzenettel"]
    E -->|Nem| G["Hibaüzenet megjelenítése"]
    G --> B
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class F successClass
    class G errorClass
    class A,B,C,D processClass
```

### Prémium workshop megvásárlása

```mermaid
flowchart LR
    A["Felhasználó a vásárlás gombra kattint"] --> B{"Felhasználó bejelentkezett?"}
    B -->|Nem| C["Hibaüzenet visszaküldése"]
    B -->|Igen| D{"Felhasználó megvásárolta már a workshopot?"}
    D -->|Igen| E["Hibaüzenet visszaküldése"]
    D -->|Nem| F["Ár és megnevezés lekérése"]
    F --> G["SimplePay API hívás a csomaggal"]
    G --> H{"SimplePay csomag sikeres?"}
    H -->|Nem| I["Hibaüzenet megjelenítése"]
    H -->|Igen| J["Fizetési URL visszaküldése frontendre"]
    J --> K["Felhasználó műveleteket végez a SimplePay felületén"]
    K --> L["SimplePay callback visszajön"]
    L --> M{"Sikeres?"}
    M -->|Nem| N["Hibaüzenet megjelenítése"]
    M -->|Igen| O["Vásárlás tényének mentése"]
    O --> P["Átirányítás a megvásárolt workshopra"]
    
    classDef successClass fill:#90EE90,stroke:#2d6b2d,stroke-width:2px,color:#000
    classDef errorClass fill:#FFB6C6,stroke:#8b0000,stroke-width:2px,color:#000
    classDef processClass fill:#87CEEB,stroke:#4682b4,stroke-width:2px,color:#000
    
    class J,O,P successClass
    class C,E,I,N errorClass
    class F,G,K,L processClass

```

## Rendszerkövetelmények

Modern JavaScript képes böngésző
Desktop vagy mobil eszköz a megjelenítéshez, Workshop létrehozáshoz javasolt a desktop
Backend: Strapi + TypeScript
Frontend: NextJS + JavaScript
Deploy architektúra: Docker microservice-k (Frontend + Backend + DB (Postgres)), szükség esetén Nginx loadBalancer

## Elfogadási kritériumok
- Backend futtatható, workshop, workshop category működik (API level)
- Backend user Auth, Login, Token refresh működik (API level)
- Workshop és kategória schemak api-n keresztül lekérdezhetőek (core strapi funkcionalitás)
- Prémium workshop esetén nem jogosult felhasználó a lépéseket, videót, és az anyaglistát nem kapja meg a lekérdezésben (API nem küldi vissza, nem elég ha az UI elrejti)
- Nem prémium workshop nem vásárolható meg
- Vendég felhasználó és csak regisztrált nem küldhet be új workshopot
- Frontend minden felbontáson jól jelenik meg
- Kategória lista megjelenít minden kategóriát
- Workshop lista csak a kategóriába tartozó blueprinteket jeleníti meg.
- Pérmium workshop esetén ha a felhasználó nincs bejelentkezve, a tényleges tartalom helyén bejelentkezési hivatkozás jelenik meg.
- Prémium workshop esetén ha a bejelentkezett felhasználó nem vásárolta még meg, vásárlás link jelenik meg.
- Saját workshopot nem lehet megvenni

## Jövőbeni tervek
- Értékelések a workshopokhoz
- Workshopok moderálása
- Jutalék fizetés a workshop feltöltőknek a vásárlások után. (elszámolás, automata számlázás és kifizetés)
- Egyedi adatbázisok létrehozása vállalatoknak (white label)
- Egyedi adatbázisokon dolgozói hozzáférés például munkaterületen dolgozó munkatársnak, a munkafolyamatok pontos nyomorkövetésére. (Regisztráció nélkül, központi akár SSO megoldással)
- Egyedi adatbázisokon tudásfelmérés készítése

