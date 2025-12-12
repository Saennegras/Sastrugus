'use client';

const SectionHeader = ({ title, children }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h2 className="text-2xl font-bold text-canvas-900">{title}</h2>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
};

export default SectionHeader;
