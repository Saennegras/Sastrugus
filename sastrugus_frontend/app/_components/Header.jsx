import Link from "next/link";

const Header = () => {
    const navItems = [
        {
            display: "",
            slug: ""
        },
        {
            display: "",
            slug: ""
        }
        //...
    ];

    return (
    <header className="header">
        <img className="header__logon" src="" alt=""/>
        <ul className="header__nav">
            {navItems.map((item) => (
                <li key={item.slug}> 
                    <Link href={`/${item.slug}`}><h5>{item.display}</h5></Link>
                </li> 
            ))}
        </ul>
        <Link href="/login">
            <button className="btn btn--black btn--small"></button>
        </Link>
    </header>
    );
};

export default Header;