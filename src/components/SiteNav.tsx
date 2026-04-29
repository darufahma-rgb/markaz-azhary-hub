import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

type NavItem = { href: string; label: string };

const links: NavItem[] = [
  { href: "/#tentang", label: "Tentang" },
  { href: "/#filosofi", label: "Filosofi" },
  { href: "/#pilar", label: "Pilar Misi" },
  { href: "/#identitas", label: "Identitas" },
  { href: "/mockup", label: "Mockup" },
  { href: "/#kontak", label: "Kontak" },
];

const DownloadIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    aria-hidden="true"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build a link that:
  //  - For "/mockup" or other routes: SPA-navigate via <Link>
  //  - For "/#section": same-page anchor scroll if on home, else navigate then scroll
  const handleHashClick = (href: string, e: React.MouseEvent) => {
    if (!href.startsWith("/#")) return;
    const hash = href.slice(2);
    if (pathname === "/") {
      // let the browser handle native anchor scroll; just close mobile menu
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    navigate("/", { state: { scrollTo: hash } });
  };

  // Compute the actual href shown in the DOM (hash-only when on home)
  const renderHref = (href: string) => {
    if (pathname === "/" && href.startsWith("/#")) return href.slice(1);
    return href;
  };

  const isHashLink = (href: string) => href.startsWith("/#");

  return (
    <header
      className={`fixed inset-x-0 z-50 px-3 md:px-6 transition-all duration-300 ${
        scrolled ? "top-3 md:top-4" : "top-4 md:top-6"
      }`}
    >
      <div
        className={`mx-auto max-w-5xl flex items-center justify-between gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-ivory/15 shadow-elegant"
            : "bg-background/55 backdrop-blur-md border-ivory/10"
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/Logo_Markaz_Rabithah_2_1777345186295.png"
            alt="Markaz Rabithah"
            className="w-7 h-7 md:w-8 md:h-8 object-contain"
          />
          <span className="font-display font-extrabold text-[0.8rem] md:text-sm tracking-tight text-ivory">
            Logo <span className="text-primary">Guideline</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) =>
            isHashLink(l.href) ? (
              <a
                key={l.href}
                href={renderHref(l.href)}
                onClick={(e) => handleHashClick(l.href, e)}
                className="nav-link text-[0.7rem] uppercase tracking-[0.2em] text-ivory/70 hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href}
                className={`nav-link text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                  pathname === l.href
                    ? "text-primary"
                    : "text-ivory/70 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            )
          )}
          <a
            href={pathname === "/" ? "#download" : "/#download"}
            onClick={(e) => handleHashClick("/#download", e)}
            className="shine inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.2em] px-4 py-2 bg-primary text-ivory hover:bg-primary/90 rounded-full transition-colors font-semibold"
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            Download Aset
          </a>
        </nav>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory p-1.5 relative w-7 h-7 flex items-center justify-center"
        >
          <span
            aria-hidden
            className={`absolute h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-snappy ${
              open ? "rotate-45 translate-y-0" : "-translate-y-[6px]"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-[2px] w-5 bg-current rounded-full transition-all duration-200 ease-out ${
              open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
            }`}
          />
          <span
            aria-hidden
            className={`absolute h-[2px] w-5 bg-current rounded-full transition-all duration-300 ease-snappy ${
              open ? "-rotate-45 translate-y-0" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu — animated open/close */}
      <div
        className={`md:hidden mt-2 mx-auto max-w-5xl overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-smooth ${
          open
            ? "max-h-[480px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className={`bg-background/95 backdrop-blur-xl border border-ivory/15 rounded-2xl shadow-elegant overflow-hidden transition-transform duration-500 ${
            open ? "scale-100" : "scale-[0.98]"
          }`}
        >
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l, i) => {
              const cls = `text-sm uppercase tracking-[0.2em] text-ivory/80 hover:text-primary transition-all duration-500 ease-out ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              } ${pathname === l.href ? "text-primary" : ""}`;
              const style = { transitionDelay: open ? `${80 + i * 55}ms` : "0ms" };
              return isHashLink(l.href) ? (
                <a
                  key={l.href}
                  href={renderHref(l.href)}
                  onClick={(e) => handleHashClick(l.href, e)}
                  className={cls}
                  style={style}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setOpen(false)}
                  className={cls}
                  style={style}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={pathname === "/" ? "#download" : "/#download"}
              onClick={(e) => handleHashClick("/#download", e)}
              className={`mt-1 inline-flex items-center justify-center gap-2 text-sm text-center uppercase tracking-[0.2em] px-4 py-3 bg-primary text-ivory rounded-full font-semibold transition-all duration-500 ease-out ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
              style={{
                transitionDelay: open ? `${80 + links.length * 55}ms` : "0ms",
              }}
            >
              <DownloadIcon className="w-4 h-4" />
              Download Aset
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteNav;
