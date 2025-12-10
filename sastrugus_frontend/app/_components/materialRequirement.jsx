const MaterialRequirement = ({materialRequirement}) => {

    return ( // add the classname depending whether it is reversed or not
        <div className="materialRequirement">
            <h2>Anyagigény</h2>
            <div className="materialList"
                dangerouslySetInnerHTML={{
                 __html: materialRequirement,
                }}
            ></div>
        </div>
    );
};

export default MaterialRequirement;