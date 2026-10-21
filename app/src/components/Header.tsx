import { useEffect, useState } from 'react';
import { SERVICES, SITE } from '../data/site';
import {
  Award,
  Car,
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  PhoneCall,
  X,
} from './icons';

type Props = {
  /** Slug of the current page, used to mark the active nav item. */
  current?: string;
};

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'Blogs', href: '/blogs/' },
  { label: 'Contact Us', href: '/contact/' },
];

export default function Header({ current = '' }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close the drawer whenever the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock scrolling while the full-screen mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? current === 'home' : current === href.replace(/\//g, '');

  return (
    <>
      <header id="main-header" className="pattern-background text-gray-200 font-medium shadow-lg">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Utility bar */}
          <div className="hidden md:flex justify-between items-center py-2 border-b border-white/10 text-xs">
            <div className="flex items-center space-x-6">
              <a
                href="#toyota-specialist-section"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <Car className="lucide lucide-car w-4 h-4 text-gray-300" />
                <span>Toyota Prius Specialist</span>
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                <Mail className="lucide lucide-mail w-4 h-4 text-gray-300" />
                <span>{SITE.email}</span>
              </a>
              <a href="#testimonials" className="flex items-center gap-2 hover:text-green-400 transition-colors">
                <Award className="lucide lucide-award w-4 h-4 text-gray-300" />
                <span>Top Rated</span>
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-gray-500 uppercase tracking-widest text-[10px]">Follow Us:</span>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="lucide lucide-facebook w-5 h-5" />
              </a>
              <a
                href={SITE.social.instagramHeader}
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="lucide lucide-instagram w-5 h-5" />
              </a>
              <a
                href={SITE.social.google}
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition-colors"
                aria-label="Google Business"
              >
                <MapPin className="lucide lucide-map-pin w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Main navigation */}
          <nav className="flex items-center justify-between py-3">
            <div className="flex flex-col">
              <a href="/" className="flex-shrink-0">
                <img src={SITE.logo} alt="Tip Top Hybrid Logo" className="w-auto header-logo-img" />
              </a>
              <div className="hidden md:block text-sm font-semibold text-gray-200 mt-1">
                <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2 hover:text-green-400">
                  <Phone className="lucide lucide-phone w-4 h-4 text-green-500" />
                  <span>+1 {SITE.phone}</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <ul id="desktop-nav" className="hidden lg:flex items-center space-x-8 text-base">
                <li>
                  <a
                    href="/"
                    className={`nav-item hover:text-green-400 transition-colors${
                      isActive('/') ? ' nav-link-active' : ''
                    }`}
                  >
                    Home
                  </a>
                </li>
                <li className="relative group">
                  <a href="#" className="flex items-center hover:text-green-400 transition-colors">
                    Services
                    <ChevronDown className="lucide lucide-chevron-down w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
                  </a>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-[#2b2b2b] rounded-lg shadow-xl p-4 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100">
                    <ul className="space-y-3 text-sm">
                      {SERVICES.map((s) => (
                        <li key={s.href}>
                          <a href={s.href} className="block hover:text-green-400 transition-colors">
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                {NAV_LINKS.slice(1).map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`nav-item hover:text-green-400 transition-colors${
                        isActive(l.href) ? ' nav-link-active' : ''
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href="/free-estimate/"
                className="hidden lg:flex items-center bg-green-500 text-white font-bold py-2.5 px-6 rounded-lg shadow-md hover:bg-green-600 transition-colors text-base"
              >
                <span>Free Estimate</span>
              </a>

              <div className="lg:hidden flex items-center gap-4">
                <a
                  href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center justify-center bg-green-500 text-white p-2 rounded-full shadow-lg"
                >
                  <Phone className="lucide lucide-phone w-5 h-5" />
                </a>
                <button
                  id="mobile-menu-button"
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(true)}
                  className="text-white"
                >
                  <Menu className="lucide lucide-menu w-8 h-8" />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen mobile drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu p-6${menuOpen ? '' : ' hidden'}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex justify-between items-center mb-8">
          <img src={SITE.logo} alt="Logo" className="h-10 w-auto" />
          <button id="close-mobile-menu-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X className="lucide lucide-x w-8 h-8 text-white" />
          </button>
        </div>
        <ul className="flex flex-col space-y-5 text-lg font-medium text-white">
          <li>
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`nav-item hover:text-green-400 block py-2${isActive('/') ? ' nav-link-active' : ''}`}
            >
              Home
            </a>
          </li>
          <li className="border-b border-white/10 pb-2">
            <button
              id="mobile-services-toggle"
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center justify-between w-full hover:text-green-400 py-2"
            >
              Services
              <ChevronDown
                id="services-chevron"
                className="lucide lucide-chevron-down w-5 h-5 transition-transform"
                style={{ transform: servicesOpen ? 'rotate(180deg)' : undefined }}
              />
            </button>
            <ul
              id="mobile-services-list"
              className={`flex flex-col space-y-4 mt-4 pl-4 text-base text-gray-400 border-l border-green-500/50${
                servicesOpen ? '' : ' hidden'
              }`}
            >
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} onClick={() => setMenuOpen(false)}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          {NAV_LINKS.slice(1).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`nav-item hover:text-green-400 block py-2${isActive(l.href) ? ' nav-link-active' : ''}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="border-t border-white/10 pt-4">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-green-400 py-2"
            >
              <Mail className="lucide lucide-mail w-6 h-6" />
              <span className="text-base">{SITE.email}</span>
            </a>
          </li>
          <li className="pt-4 flex items-center gap-6">
            <a
              href={SITE.social.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Facebook className="lucide lucide-facebook w-7 h-7" />
              <span className="text-[10px] uppercase">Facebook</span>
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <Instagram className="lucide lucide-instagram w-7 h-7" />
              <span className="text-[10px] uppercase">Instagram</span>
            </a>
            <a
              href={SITE.social.google}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
            >
              <MapPin className="lucide lucide-map-pin w-7 h-7" />
              <span className="text-[10px] uppercase">Google</span>
            </a>
          </li>
          <li className="pt-2">
            <a
              href="/free-estimate/"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-green-500 text-white font-bold py-4 rounded-lg shadow-xl"
            >
              Get Free Estimate
            </a>
          </li>
        </ul>
      </div>

      {/* Sticky mobile action bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] flex bg-black border-t border-white/10 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        <a
          href={`tel:${SITE.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center py-3 bg-[#111] hover:bg-green-600 transition-colors border-r border-white/5"
        >
          <PhoneCall className="lucide lucide-phone-call w-5 h-5 text-green-500 mb-1" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Call Now</span>
        </a>
        <a
          href="#gform_wrapper_1"
          className="flex-1 flex flex-col items-center justify-center py-3 bg-[#111] hover:bg-green-600 transition-colors"
        >
          <Mail className="lucide lucide-mail w-5 h-5 text-green-500 mb-1" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Contact</span>
        </a>
      </div>
    </>
  );
}
