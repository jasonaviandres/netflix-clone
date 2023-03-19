import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66 as const;

const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        //clean up function for useEffect

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((currentState) => !currentState);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((currentState) => !currentState);
    }, []);
    return (
        <nav className="w-full fixed z-40">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
                    showBackground ? "bg-zinc-900 bg-opacity-90" : ""
                }`}
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My list" />
                    <NavbarItem label="Browse by languages" />
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown
                        className={`text-white transition ${
                            showMobileMenu ? "rotate-180" : ""
                        }`}
                    />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                        onClick={toggleAccountMenu}
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="logo" />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${
                                showAccountMenu ? "rotate-180" : ""
                            }`}
                        />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
