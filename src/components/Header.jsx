import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Portfolio", path: "/portfolio/weddings" },
  { label: "Blog", path: "/portfolio/weddings/blogs" },
  {
    label: "Others",
    path: "#",
    subLinks: [
      { label: "Artists", path: "/portfolio/artists" },
      { label: "Family", path: "/portfolio/family" },
      { label: "Birthdays", path: "/portfolio/birthdays" },
    ],
  },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Minimal top bar */}
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
        {/* Left: Site title with tagline */}
        <NavLink 
          to="/"
          className="block hover:opacity-80 transition-opacity"
        >
          <div className="text-2xl font-heading text-ink tracking-[0.08em] font-semibold">
            RUMI HAS A CAMERA
          </div>
          <div className="text-xs text-ink/60 mt-1 tracking-wide">
            <span className="uppercase">EMOTIVE WEDDING PHOTOGRAPHY</span>
            <span className="hidden sm:inline"> • </span>
            <br className="sm:hidden" />
            <span className="uppercase">BY <span className="text-ink">NADISH SOOD</span></span>
          </div>
        </NavLink>

        {/* Right: Clean navigation (desktop) */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <div key={link.label} className="relative group">
              {link.subLinks ? (
                <>
                  {/* Minimal dropdown parent */}
                  <button
                    className="text-sm tracking-wide text-gray-600 hover:text-clay transition-colors uppercase"
                    onClick={(e) => e.preventDefault()}
                  >
                    {link.label}
                  </button>
                  
                  {/* Clean dropdown menu */}
                  <div className="absolute top-full left-0 mt-4 py-2 min-w-32 bg-white border border-gray-100 shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {link.subLinks.map((subLink) => (
                      <NavLink
                        key={subLink.path}
                        to={subLink.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm tracking-wide uppercase transition-colors ${
                            isActive
                              ? "text-ink bg-gray-50"
                              : "text-gray-600 hover:text-clay hover:bg-gray-50"
                          }`
                        }
                      >
                        {subLink.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm tracking-wide uppercase transition-colors ${
                      isActive
                        ? "text-ink border-b border-gray-300"
                        : "text-gray-600 hover:text-clay"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
        </nav>

        {/* Simple mobile menu button */}
        <button
          className="block md:hidden text-gray-600 hover:text-clay transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current mb-1"></div>
          <div className="w-5 h-0.5 bg-current"></div>
        </button>
      </div>

      {/* Clean mobile navigation */}
      <nav
        className={`${
          menuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t border-gray-100`}
      >
        <div className="max-w-6xl mx-auto px-8 py-6">
          {navLinks.map((link) => (
            <div key={link.label} className="mb-4">
              {link.subLinks ? (
                <>
                  {/* Mobile dropdown parent */}
                  <button
                    onClick={() =>
                      setDropdownOpen(
                        dropdownOpen === link.label ? null : link.label
                      )
                    }
                    className="text-sm tracking-wide uppercase text-gray-600 hover:text-clay transition-colors block w-full text-left"
                  >
                    {link.label}
                  </button>

                  {/* Mobile dropdown items */}
                  <div
                    className={`${
                      dropdownOpen === link.label ? "block" : "hidden"
                    } mt-2 ml-4 space-y-2`}
                  >
                    {link.subLinks.map((subLink) => (
                      <NavLink
                        key={subLink.path}
                        to={subLink.path}
                        onClick={() => {
                          setMenuOpen(false);
                          setDropdownOpen(null);
                        }}
                        className={({ isActive }) =>
                          `block text-sm tracking-wide uppercase transition-colors ${
                            isActive
                              ? "text-ink"
                              : "text-gray-600 hover:text-clay"
                          }`
                        }
                      >
                        {subLink.label}
                      </NavLink>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm tracking-wide uppercase transition-colors ${
                      isActive
                        ? "text-ink"
                        : "text-gray-600 hover:text-clay"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
