import PageHeader from '@/app/_components/PageHeader';
import Link from 'next/link';

export default function AboutUsPage() {
  const features = [
    {
      title: 'Blueprint megosztás',
      description: 'Oszd meg saját kézműves projektjeidet, lépésről lépésre leírásokkal és anyaglistákkal.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
      ),
    },
    {
      title: 'Kategóriák',
      description: 'Fedezd fel a különböző műhelykategóriákat, a fafaragástól a kötésig, a festéstől a kerámiáig.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: 'Prémium tartalmak',
      description: 'Értékesítsd prémium blueprintjeidet, és részesülj a bevételből. Vásárolj meg exkluzív tartalmakat.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      title: 'Videó támogatás',
      description: 'Egészítsd ki leírásaidat YouTube videókkal a még részletesebb bemutatásért.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
    },
  ];

  const team = [
    {
      name: 'Szabó István Keve',
      role: 'Ötletgazda, Frontend fejlesztő',
    },
    {
      name: 'Kovács Dániel',
      role: 'Projektgazda, Backend fejlesztő',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas-50">
      <PageHeader
        title="Rólunk"
        subtitle="Ismerd meg a Sastrugus történetét és küldetését"
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-canvas-900 mb-6">
              Küldetésünk
            </h2>
            <div className="prose prose-lg max-w-none text-canvas-900/80">
              <p>
                A <strong>Sastrugus</strong> egy online workshop és blueprint kezelő rendszer,
                amely lehetővé teszi a kézműves közösség számára, hogy megosszák tudásukat és
                tapasztalataikat egymással.
              </p>
              <p>
                Platformunk egyaránt kínál lehetőségeket vendég látogatóknak és regisztrált
                felhasználóknak. Vendégként böngészheted a nyilvános workshopokat, míg
                regisztrált felhasználóként feltölthetsz saját leírásokat, és hozzáférhetsz
                a prémium tartalmakhoz is.
              </p>
              <p>
                Célunk, hogy egy inspiráló közösséget hozzunk létre, ahol a kézművesek
                megoszthatják projektjeiket, tanulhatnak egymástól, és fejleszthetik
                készségeiket.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-canvas-900 mb-8 text-center">
            Funkcióink
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-soft p-6 flex gap-4"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-canvas-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-canvas-900/70">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl shadow-soft p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Hogyan működik?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Regisztrálj</h3>
                <p className="text-white/80">
                  Hozz létre egy ingyenes fiókot néhány kattintással
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Készíts blueprintet</h3>
                <p className="text-white/80">
                  Írd le a projekted lépéseit, anyagszükségletét és add hozzá videódat
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Oszd meg</h3>
                <p className="text-white/80">
                  Publikáld ingyenesen vagy prémiumként, és inspirálj másokat
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-canvas-900 mb-8 text-center">
            A csapat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-soft p-6 text-center"
              >
                <div className="w-20 h-20 bg-canvas-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-canvas-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-canvas-900">
                  {member.name}
                </h3>
                <p className="text-canvas-900/60">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-canvas-100 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-canvas-900 mb-4">
              Készen állsz?
            </h2>
            <p className="text-canvas-900/70 mb-8 max-w-xl mx-auto">
              Csatlakozz közösségünkhöz és oszd meg kézműves tudásodat a világgal!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-brand-700 transition-colors"
              >
                Regisztráció
              </Link>
              <Link
                href="/workshop"
                className="inline-flex items-center justify-center gap-2 bg-white text-canvas-900 font-semibold px-8 py-3 rounded-xl hover:bg-canvas-50 transition-colors border border-canvas-200"
              >
                Böngéssz a műhelyben
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
