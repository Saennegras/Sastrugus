const Description = ({description, reversed = false}) => {

    const reversedClass = reversed ? " order-first lg:order-none" : "";
    return ( // add the classname depending whether it is reversed or not
        <div className="mt-10 rounded-3xl border border-canvas-200 bg-white/60 dark:bg-night-900/90 shadow-soft p-6 md:p-7 flex flex-col gap-4">
            <div className="description"
                dangerouslySetInnerHTML={{
                 __html: description,
                }}
            ></div>
        </div>
    );
};

export default Description;