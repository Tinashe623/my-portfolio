"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-dark-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/home" className="text-2xl font-bold font-heading gradient-text p-1 -m-1 inline-block">
              TM
            </Link>
            <p className="mt-4 text-dark-400 text-sm max-w-xs">
              Full-Stack Software Developer building scalable web applications with
              Next.js, Prisma, and PostgreSQL.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["About", "Services", "Portfolio", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-dark-400 hover:text-brand-400 transition-colors text-sm block py-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-dark-200 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>Harare, Zimbabwe</li>
              <li>
                <a
                  href="mailto:tinashemundieta36@gmail.com"
                  className="hover:text-brand-400 transition-colors"
                >
                  tinashemundieta36@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+263779941427"
                  className="hover:text-brand-400 transition-colors"
                >
                  +263 779 941 427
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-dark-500 text-sm">
            © {currentYear} Tinashe Mundieta. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a
              href="https://github.com/Tinashe623"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-dark-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/tinashe-mundieta-041715302/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-dark-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://wa.me/263779941427"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-500 hover:text-dark-300 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
