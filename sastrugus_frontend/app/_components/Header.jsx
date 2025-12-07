import Link from "next/link";

const Header = () => {
    const navItems = [
        {
            display: "WORKSHOP",
            slug: "workshop"
        },
        {
            display: "ABOUT US",
            slug: "aboutus"
        }
        //...
    ];

    return (
    <header className="header">
        <img className="header__logon" src="/assets/logon.svg" alt=""/>
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