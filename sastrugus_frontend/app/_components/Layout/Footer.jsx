import Link from "next/link";

const Footer = () => {
    const navItems = [
        {
            display: "Műhely",
            slug: "/workshop",
        },
        {
            display: "Magunkról",
            slug: "/aboutus"
        }
    ];

    const policies = [
        {
            display: "Impresszum",
            slug: "/imprint",
        },
        {
            display: "ÁSZF",
            slug: "/toc",
        },
        {
            display: "Adatvédelem",
            slug: "/data-protection",
        },
    ];

    return (
        <footer className="bg-night-950 text-white py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Top section: Logo + Navigation */}
                <nav className="flex flex-col md:flex-row justify-between items-center md:items-center gap-8 mb-10 md:pr-16">
                    <Link href="/" className="block">
                        <img
                            className="w-40 md:w-52 brightness-0 invert"
                            src="/assets/logo.svg"
                            alt="Sastrugus"
                        />
                    </Link>
                    <ul className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {navItems.map((item) => (
                            <li key={item.slug}>
                                <Link
                                    href={item.slug}
                                    className="text-white/80 hover:text-white font-semibold text-lg transition-colors duration-200"
                                >
                                    {item.display}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="border-t border-white/10 mb-8" />

                {/* Bottom section: Policies + Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {policies.map((policy) => (
                            <li key={policy.slug}>
                                <Link
                                    href={policy.slug}
                                    className="text-white/50 hover:text-white/80 text-sm transition-colors duration-200"
                                >
                                    {policy.display}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <p className="text-white/50 text-sm">
                        © {new Date().getFullYear()} Sastrugus - Minden jog fenntartva
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;