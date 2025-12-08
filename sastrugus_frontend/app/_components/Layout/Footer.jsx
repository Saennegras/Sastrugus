import Link from "next/link";

const Footer = () => {
    const navItems = [
        {
            display: "workshop",
            slug: "/workshop",
        },
        {
            display: "about us",
            slug: "/aboutus"
        }
    ];

    const policies = [
        {
            display: "imprint",
            slug: "/imprint",
        },
        {
            display: "terms & conditions",
            slug: "/toc",
        },
        {
            display: "data protection",
            slug: "/data-protection",
        },
    ];
    
    return (
        <footer className="footer">
            <nav className="footer__nav">
                <img className="footer__logo" src="/assets/logo.svg" alt="" />
                <ul className="footer__links">
                    {navItems.map((item) => (
                        <li key={item.slug}>
                            <Link href={item.slug}><h5>{item.display}</h5></Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="footer__policies">
                <ul className="footer__policies-nav">
                    {policies.map((policy) => (
                        <li key={policy.slug}>
                            <p className="copy">{policy.display}</p>
                        </li>
                    ))}
                </ul>
                <p className="copy">© Sastrugus - all rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;