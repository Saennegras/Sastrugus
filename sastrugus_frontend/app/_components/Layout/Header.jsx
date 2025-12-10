"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
    const path = usePathname();
    
    // 1. Removed pipes from display text
    const navItems = [
        {
            display: "Műhely",
            slug: "workshop",
        },
        {
            display: "Magunkról",
            slug: "aboutus",
        },
        // Add other items here...
    ];

    // const filteredNavItems = path === "/workshop" 
    //     ? navItems.filter(item => !["workshop","aboutus"].includes(item.slug)) 
    //     : navItems;

    const filteredNavItems = navItems; //TODO - WTF?/

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-canvas-50/90 dark:bg-canvas-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* LOGO */}
                <div className="flex-shrink-0">
                    <Link href="/" className="block group">
                        <img 
                            className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-110" 
                            src="/assets/logo.svg" 
                            alt="Logo" 
                        />
                    </Link>
                </div>

                {/* NAVIGATION */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2"> 
                        {filteredNavItems.map((item) => {
                            const isActive = path === `/${item.slug}`;
                            return (
                                <li key={item.slug}>
                                    <Link 
                                        href={`/${item.slug}`}
                                        className={`
                                            px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                                            ${isActive 
                                                ? "bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105" 
                                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-brand-600 dark:hover:text-white"
                                            }
                                        `}
                                    >
                                        {item.display}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* LOGIN BUTTON */}
                <div className="flex-shrink-0">
                    <Link href="/login">
                        <button className="btn-brand text-sm px-6 py-2.5 shadow-none hover:shadow-lg">
                            Bejelentkezés
                        </button>
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;