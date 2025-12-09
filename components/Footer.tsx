import Link from "next/link";

/**
 * Footer Component
 * Footer with contact information, location, and copyright
 */

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 py-12 lg:py-16 pb-24 md:pb-24 lg:pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Labida LLC
            </h3>
            <p className="text-white/70 leading-relaxed">
              Mobile welding and heavy-equipment roadside service providing on-site repairs, fabrication, and emergency support for trucks, trailers, and other equipment. Delivering dependable metal fabrication and emergency fixes when and where you need them.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Contact
            </h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a
                  href="tel:+15853157599"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Phone: +1 (585) 315-7599
                </a>
              </li>
              <li>
                <a
                  href="mailto:labidallc@gmail.com"
                  className="hover:text-warning-yellow transition-colors duration-500 ease-in-out"
                >
                  Email: labidallc@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Location
            </h3>
            <p className="text-white/70 leading-relaxed">
              Rochester, NY by appointment only
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black uppercase tracking-tight mb-4 text-xl">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#home"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/#why-us"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Why Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-warning-yellow transition-colors duration-500 ease-in-out uppercase text-sm font-semibold"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © {currentYear} Labida LLC. All rights reserved. 
           
          </p> 
         
        </div>
      </div>
    </footer>
  );
}
