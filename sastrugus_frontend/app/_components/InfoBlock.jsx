import Link from "next/link";

const InfoBlock = ({ data }) => {
  const { headLine, description, slug, reversed = false, imagSrc, overline, badge } = data;

  return (
    <section className="py-16 md:py-24">
      
      <div className={`
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
        flex flex-col md:flex-row items-center 
        gap-12 lg:gap-24 
        ${reversed ? "md:flex-row-reverse" : ""}
      `}>

        {/* --- IMAGE HALF --- */}
        <div className="w-full md:w-1/2 relative group">
           <div className={`
             relative h-64 sm:h-80 md:h-[500px] w-full shadow-soft overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.01]
             rounded-2xl 
             ${reversed 
                ? "md:rounded-r-none md:rounded-l-[4rem]" 
                : "md:rounded-l-none md:rounded-r-[4rem]"
             }
           `}>
             <img
               src={imagSrc || "/assets/default.png"}
               alt={headLine}
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/5 dark:bg-white/5 transition-opacity group-hover:opacity-0" />
           </div>
        </div>

        {/* --- TEXT HALF --- */}
        <div className="w-full md:w-1/2">
          <div className={`max-w-lg ${reversed ? "mr-auto" : "ml-auto"}`}>
            
            <div className="flex items-center gap-2 mb-4">
              {overline && (
                <span className="inline-block py-1 px-3 rounded-full bg-canvas-100 text-canvas-800 text-xs font-semibold tracking-wide">
                  {overline}
                </span>
              )}
              {badge && (
                <span className="inline-block py-1 px-3 rounded-full bg-pastel-mint text-pastel-mintText text-xs font-semibold tracking-wide">
                  {badge}
                </span>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {headLine}
            </h2>

            <div className="prose prose-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {description}
            </div>
            
            {slug && (
                <Link 
                    href={slug} 
                    className="inline-flex items-center text-sm font-bold text-gray-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
                    >
                    Tovább
                    <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
            )}
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default InfoBlock;
