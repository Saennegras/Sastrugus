"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
    const path = usePathname();
    const { user, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        {
            display: "Műhely",
            slug: "workshop",
        },
        {
            display: "Magunkról",
            slug: "aboutus",
        },
    ];

    if (user) {
        navItems.push({
            display: "Profilom",
            slug: "dashboard",
        });
    }

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-canvas-50/90 backdrop-blur-md border-b border-gray-200/50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
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

                {/* DESKTOP NAVIGATION */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {navItems.map((item) => {
                            const isActive = path === `/${item.slug}`;
                            return (
                                <li key={item.slug}>
                                    <Link
                                        href={`/${item.slug}`}
                                        className={`
                                            px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                                            ${isActive
                                                ? "bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                                                : "text-gray-600 hover:bg-gray-200/50 hover:text-brand-600"
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

                {/* DESKTOP LOGIN/LOGOUT BUTTON */}
                <div className="hidden md:block">
                    {user ? (
                        <button
                            onClick={logout}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm px-6 py-2.5 rounded-full transition-colors"
                        >
                            Kijelentkezés
                        </button>
                    ) : (
                        <Link href="/login">
                            <button className="btn-brand text-sm px-6 py-2.5 rounded-full">
                                Bejelentkezés
                            </button>
                        </Link>
                    )}
                </div>

                {/* MOBILE HAMBURGER BUTTON */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menü"
                >
                    {mobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-canvas-50 border-t border-gray-200/50">
                    <nav className="max-w-7xl mx-auto px-4 py-4">
                        <ul className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = path === `/${item.slug}`;
                                return (
                                    <li key={item.slug}>
                                        <Link
                                            href={`/${item.slug}`}
                                            onClick={handleMobileMenuClose}
                                            className={`
                                                block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200
                                                ${isActive
                                                    ? "bg-brand-600 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                                }
                                            `}
                                        >
                                            {item.display}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="border-t border-gray-200 mt-2 pt-4">
                                {user ? (
                                    <button
                                        onClick={() => {
                                            handleMobileMenuClose();
                                            logout();
                                        }}
                                        className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        Kijelentkezés
                                    </button>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={handleMobileMenuClose}
                                        className="block px-4 py-3 rounded-xl text-base font-semibold bg-brand-600 text-white text-center hover:bg-brand-700 transition-colors"
                                    >
                                        Bejelentkezés
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;