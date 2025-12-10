import Link from "next/link";
    
const InfoBlock = ({data}) => {
    const {headLine, description, slug, reversed = false, imagSrc} = data;
    
    return ( // add the classname depending whether it is reversed or not
        <div className={`info ${reversed ? "info--reversed" : ""}`}>
            <img src={imagSrc || "/assets/default.png"} alt={headLine} className="info__image" />
            <div className="info__text">
                <h2 className="info__headline">{headLine}</h2>
                <div>{description}</div>
                <Link href={slug} className="btn btn--small">
                    Tovább
                </Link>
            </div>
        </div>
    );
};

export default InfoBlock;