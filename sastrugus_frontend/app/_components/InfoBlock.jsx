const InfoBlock = ({data}) => {
    const {headline, text, button, reversed} = data;
    return ( // add the classname depending whether it is reversed or not
        <div className={`info ${reversed ? "info--reversed" : ""}}`}>
            <img src="/info-blocks/infobox01.png" alt="" className="info__image" />
            <div className="info__text">
                <h2 className="info__headline">{headline}</h2>
                {text}
                {button}
            </div>
        </div>
    );
};

export default InfoBlock;