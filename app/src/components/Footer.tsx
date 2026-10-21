import { SERVICES, SITE } from '../data/site';
import { Facebook, Instagram, Mail, MapPin } from './icons';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6 border-t-4 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-primary">Hybrid Services</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="hover:text-brand-primary transition duration-200">
                    {s.footer}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-brand-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/testimonials/" className="hover:text-brand-primary transition duration-200">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/contact/" className="hover:text-brand-primary transition duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/free-estimate/" className="hover:text-brand-primary transition duration-200">
                  Free Estimate
                </a>
              </li>
              <li>
                <a href="/blogs/" className="hover:text-brand-primary transition duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <img src={SITE.logo} alt="Tip Top Hybrid Logo" className="w-48 h-auto mb-4" />
            <p className="text-sm text-white">
              We specialize in expert hybrid vehicle repair and maintenance, providing reliable service for
              your specialized drivetrain and systems.
            </p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-brand-primary">Business Mail</h3>
            <div className="flex items-center space-x-2 mb-6">
              <Mail className="lucide lucide-mail w-5 h-5 text-brand-primary" />
              <a href={`mailto:${SITE.email}`} className="text-sm hover:text-brand-primary transition duration-200">
                {SITE.email}
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-4 text-brand-primary">Address</h3>
            <p className="text-sm text-white mb-6">{SITE.address}</p>

            <h3 className="text-lg font-semibold mb-4 text-brand-primary">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-brand-primary transition duration-200"
                aria-label="Facebook"
              >
                <Facebook className="lucide lucide-facebook w-6 h-6" />
              </a>
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-brand-primary transition duration-200"
                aria-label="Instagram"
              >
                <Instagram className="lucide lucide-instagram w-6 h-6" />
              </a>
              <a
                href={SITE.social.google}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-brand-primary transition duration-200"
                aria-label="Google Business"
              >
                <MapPin className="lucide lucide-map-pin w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-white">
          <p>© 2026 Tip Top Hybrid. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
