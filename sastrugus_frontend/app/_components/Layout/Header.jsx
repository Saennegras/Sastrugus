"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const path = usePathname();
    const navItems = [
        {
            display: "| műhely |",
            slug: "workshop",
        },
        {
            display: "| magunkról |",
            slug: "aboutus",
        },
        //...
    ];

    const filteredNavItems = path === "/workshop" 
    ? navItems.filter(item => !["workshop","aboutus"].includes(item.slug)) : navItems;

    return (
    <header className="header">
        <img className="header__logo" src="/assets/logo.svg" alt="" />
        <ul className="header__nav"> 
            {filteredNavItems.map((item) => (
                <li key={item.slug}> 
                    <Link href={`/${item.slug}`}><h5>{item.display}</h5></Link>
                </li> 
            ))}
        </ul>
        <Link href="/login">
            <button className="btn btn--black btn--small">Bejelentkezés</button>
        </Link>
    </header>
    );
};

export default Header;