const MaterialRequirement = ({materialRequirement, reversed = false}) => {
    const containerBase = "w-full lg:w-auto mt-6 lg:mt-0";
    const reversedClass = reversed ? " order-first lg:order-none" : "";
    return ( // add the classname depending whether it is reversed or not
        <aside className={containerBase + reversedClass}>
            <div className="rounded-3xl border border-canvas-200 bg-white/60 dark:bg-night-900/90 shadow-soft p-6 md:p-7 flex flex-col gap-4">
            <div className="materialRequirement">
                <h2>Anyagigény</h2>
                <div className="prose prose-sm prose-neutral max-w-none text-canvas-900 dark:text-night-100 dark:prose-invert"
                    dangerouslySetInnerHTML={{
                     __html: materialRequirement,
                    }}
                ></div>
            </div>
        </div>
        </aside>
    );
};

export default MaterialRequirement;