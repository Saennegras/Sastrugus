const Title = ({title, reversed = false}) => {

    const reversedClass = reversed ? " order-first lg:order-none" : "";
    return ( // add the classname depending whether it is reversed or not
        <div className="mt-20">
            <h1 className="title"
                dangerouslySetInnerHTML={{
                 __html: title,
                }}
            ></h1>
        </div>
    );
};

export default Title;