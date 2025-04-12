"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          MyBrand
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/services" className={styles.link}>
            Services
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.mobileMenuButton}
        >
          {isOpen ? (
            <XMarkIcon className={styles.icon} />
          ) : (
            <Bars3Icon className={styles.icon} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink}>
            Home
          </Link>
          <Link href="/about" className={styles.mobileLink}>
            About
          </Link>
          <Link href="/services" className={styles.mobileLink}>
            Services
          </Link>
          <Link href="/contact" className={styles.mobileLink}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
