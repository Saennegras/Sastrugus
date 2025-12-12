'use client';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <section className="w-full py-20 md:py-28 px-4 bg-gradient-to-br from-night-950 via-night-900 to-brand-900 rounded-br-[4rem]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-night-100 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p
                className="text-lg md:text-xl text-brand-200/80 max-w-2xl"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            )}
          </div>
          {children && (
            <div className="flex-shrink-0">
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
