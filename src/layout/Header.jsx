import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`bg-red-800 p-4 shadow-lg w-full fixed top-0 z-50 transition-transform duration-300 ${
        scrollingDown ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white wiggle-hover"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
            />
          </svg>
          <h1 className="text-white font-semibold">Brand</h1>
        </Link>

        {/* Center nav links (desktop only) */}
        <div className="hidden md:flex space-x-6">
          <a href="#home" className="text-white hover:text-blue-200">Home</a>
          <a href="#functionality" className="text-white hover:text-blue-200">Functionality</a>
        </div>

        {/* Right-side CTA (desktop only) */}
        <div className="hidden md:block">
          <Link to="login" className="text-white hover:text-blue-200">Get Started</Link>
        </div>

        {/* Hamburger menu (mobile only) */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 px-4 py-2 space-y-2 bg-red-700 rounded-b-lg shadow">
          <a href="#home" className="block text-white py-2 hover:text-blue-200">Home</a>
          <a href="#functionality" className="block text-white py-2 hover:text-blue-200">Functionality</a>
          <Link to="login" className="block text-white py-2 hover:text-blue-200">Get Started</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
