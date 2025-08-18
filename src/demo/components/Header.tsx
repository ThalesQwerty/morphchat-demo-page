import React, { useState, useRef, useEffect } from "react";
import { useDemoContext } from "../context/DemoContext";
import { Icon } from "morphchat";
import styles from "./Header.module.scss";

export function Header() {
    const { openGithub } = useDemoContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>MorphChat Demo</div>
                
                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <a href="#home" className={styles.navLink}>Home</a>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#customization" className={styles.navLink}>Customize</a>
                    <a href="#functionality" className={styles.navLink}>Functionality</a>
                    <a href="#actions" className={styles.navLink}>Actions</a>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); openGithub(); }} className={styles.navLink}>GitHub</a>
                </div>

                {/* Mobile Dropdown */}
                <div className={styles.mobileDropdown} ref={dropdownRef}>
                    <button 
                        className={styles.dropdownButton}
                        onClick={toggleMenu}
                        aria-label="Toggle navigation menu"
                    >
                        <Icon 
                            name={isMenuOpen ? "X" : "List"} 
                            size={24} 
                            className={styles.dropdownIcon}
                        />
                    </button>

                    {isMenuOpen && (
                        <div className={styles.dropdownMenu}>
                            <a href="#home" className={styles.dropdownLink} onClick={closeMenu}>Home</a>
                            <a href="#features" className={styles.dropdownLink} onClick={closeMenu}>Features</a>
                            <a href="#customization" className={styles.dropdownLink} onClick={closeMenu}>Customize</a>
                            <a href="#functionality" className={styles.dropdownLink} onClick={closeMenu}>Functionality</a>
                            <a href="#actions" className={styles.dropdownLink} onClick={closeMenu}>Actions</a>
                            <a href="#about" className={styles.dropdownLink} onClick={closeMenu}>About</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); openGithub(); closeMenu(); }} className={styles.dropdownLink}>GitHub</a>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
