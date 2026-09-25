"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className={`mobile-menu-button ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="btn btn-primary mobile-quote-button"
            onClick={closeMenu}
          >
            Get Quote
          </Link>
        </nav>
      </div>
    </div>
  );
}