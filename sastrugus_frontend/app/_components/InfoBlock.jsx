const InfoBlock = ({data}) => {
    const {headline, text, button, reversed, image} = data;
    return ( // add the classname depending whether it is reversed or not
        <div className={`info ${reversed ? "info--reversed" : ""}`}>
            <img src={image || "/assets/default.png"} alt={headline} className="info__image" />
            <div className="info__text">
                <h2 className="info__headline">{headline}</h2>
                {text}
                {button}
            </div>
        </div>
    );
};

export default InfoBlock;