"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeroSection = ({ imgSrc,  headline, theme = "turquoise", categories = [] }) => {
    const path = usePathname();
    return (
        <section className="hero">
            <div className="hero__background">
                <img src={imgSrc || "/assets/hero.png"} alt="" />
            </div>
            <div className={`hero__headline hero__headline--${theme}`}>
                {headline || <h3>Headline missing</h3>}
            </div>

            {path !== "/workshop" && (
                <button className={`btn btn--medium btn--${theme}`}>
                    <Link href="/login">Feliratkozás</Link>
                </button>
            )}

            {categories.length > 0 && (
                <div className="hero__categories">
                    {categories.map((cat) => (
                        <Link
                        key={cat.slug}
                        href={`/workshop/${cat.slug}`}
                        className={`hero__category-btn btn btn--small btn--${theme}`}>
                            {cat.display}
                        </Link>
                    ))}
                </div>
            )}

            <img 
                className={`hero__logo hero__logo--${theme}`} 
                src="/assets/star.svg" alt="" 
            />
        </section>
    );
};

export default HeroSection;