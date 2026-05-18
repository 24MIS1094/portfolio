import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/certificates', label: 'Certificates' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setHidden(false);
      return;
    }

    let previousY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingDown = currentY > previousY;

      if (currentY < 40) {
        setHidden(false);
      } else {
        setHidden(scrollingDown);
      }

      previousY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#010101]/85 backdrop-blur-sm transition-transform duration-300 ${
        isHome && hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-6 overflow-x-auto px-4 text-white">
        <NavLink to="/" className="shrink-0 text-base font-semibold tracking-wide">
          YN Portfolio
        </NavLink>

        <div className="flex shrink-0 flex-nowrap items-center gap-5 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? 'font-medium text-white'
                  : 'font-medium text-white/75 transition hover:text-white'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
