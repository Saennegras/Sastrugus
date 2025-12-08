import Link from "next/link";

const Header = () => {
    const navItems = [
        {
            display: "workshop",
            slug: "workshop",
        },
        {
            display: "about us",
            slug: "aboutus",
        },
        //...
    ];

    return (
    <header className="header">
        <img className="header__logo" src="/assets/logo.svg" alt="" />
        <ul className="header__nav"> 
            {navItems.map((item) => (
                <li key={item.slug}> 
                    <Link href={`/${item.slug}`}><h5>{item.display}</h5></Link>
                </li> 
            ))}
        </ul>
        <Link href="/login">
            <button className="btn btn--black btn--small">LOGIN</button>
        </Link>
    </header>
    );
};

export default Header;