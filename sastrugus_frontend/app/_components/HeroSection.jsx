import Link from "next/link";

const HeroSection = ({ imgSrc,  headline, theme = "turquoise" }) => {
    return (
        <section className="hero">
            <div className="hero__background">
                <img src={imgSrc || "/assets/hero.png"} alt="" />
            </div>
            <div className={`hero__headline hero__headline--${theme}`}>
                {headline || <h3>Headline missing</h3>}
            </div>
            <button className={`btn btn--medium btn--${theme}`}>
                <Link href="/login">Sign Up</Link>
            </button>
            <img 
                className={`hero__logo hero__logo--${theme}`} 
                src="/assets/star.svg" alt="" 
            />
        </section>
    );
};

export default HeroSection;