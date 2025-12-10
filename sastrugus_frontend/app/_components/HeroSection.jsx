"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeroSection = ({ imgSrc,  headline, theme = "turquoise", categories = [], onCategoryClick }) => {
    const path = usePathname();
    return (
        <section className="hero">
            <div className="hero__background">
                <img src={imgSrc || "/assets/hero.png"} alt="" />
            </div>
            <div className={`hero__headline hero__headline--${theme}`}>
                {headline || <h3>Headline missing</h3>}
            </div>

            {categories.length > 0 && (
                <div className="hero__categories">
                    {categories.map((cat) => (
                        <button
                            key={cat.documentId}
                            className={`hero__category-btn btn btn--small btn--${theme}`}
                            onClick={() => onCategoryClick(cat.documentId)}> 
                                {cat.categoryName }
                        </button>
                    ))}
                </div>
            )}

            {path !== "/workshop" && (
                <button className={`btn btn--medium btn--${theme}`}>
                    <Link href="/login">Feliratkozás</Link>
                </button>
            )}

            <img 
                className={`hero__logo hero__logo--${theme}`} 
                src="/assets/star.svg" alt="" 
            />
        </section>
    );
};

export default HeroSection;