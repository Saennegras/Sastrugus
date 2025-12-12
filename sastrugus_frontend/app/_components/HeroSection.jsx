"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeroSection = ({ 
  imgSrc, 
  headline, 
  theme = "turquoise", 
  categories = [], 
  onCategoryClick 
}) => {
  const path = usePathname();

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pb-20">
      <div className="absolute inset-0 -z-10 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        
        <img 
            src={imgSrc || "/assets/hero.png"} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-bottom"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 mt-10">
        
        {headline ? (
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-md">
                {headline}
            </h1>
        ) : (
            <h1 className="text-5xl font-bold text-white/50">Blueprint Workshop</h1>
        )}

        {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.documentId}
                        onClick={() => onCategoryClick(cat.documentId)}
                        className="
                            bg-white/10 backdrop-blur-md border border-white/20 text-white
                            hover:bg-white/20 hover:scale-105
                            px-6 py-2 rounded-full font-medium transition-all duration-300
                        "
                    >
                        {cat.categoryName}
                    </button>
                ))}
            </div>
        )}

        {path !== "/workshop" && (
            <div className="pt-4">
                <Link 
                    href="/login" 
                    className="btn-brand text-lg px-10 py-4 shadow-2xl shadow-brand-900/50 border border-white/10"
                >
                    Feliratkozás
                </Link>
            </div>
        )}
      </div>

      <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white dark:bg-canvas-dark p-4 rounded-full shadow-xl">
            <img 
                src="/assets/star.svg" 
                alt="Star Logo" 
                className="w-12 h-12 md:w-16 md:h-16 animate-spin-slow" 
            />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;