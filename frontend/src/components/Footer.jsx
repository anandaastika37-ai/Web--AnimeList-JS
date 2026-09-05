import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faInstagram,
  faTwitter,
  faYoutube,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import logoAnimeListNavy from "../assets/logoAnimeListNavy.png";

const footerLinks = {
  Jelajahi: [
    { label: "Anime Terbaru", href: "/new-anime" },
    { label: "Ranking", href: "/ranking" },
    { label: "Upcoming", href: "/upcoming-anime" },
    { label: "Genre", href: "/genre" },
  ],
  Komunitas: [
    { label: "Forum Diskusi", href: "/forum" },
    { label: "Ulasan", href: "/reviews" },
    { label: "Event", href: "/events" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Kontak", href: "/contact" },
    { label: "Karir", href: "/careers" },
  ],
  Legal: [
    { label: "Syarat & Ketentuan", href: "/terms" },
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "DMCA", href: "/dmca" },
  ],
};

const socials = [
  { icon: faDiscord, href: "https://discord.com", label: "Discord" },
  { icon: faInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: faTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: faYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: faGithub, href: "https://github.com", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-blue-950 to-indigo-950 text-sky-100 relative overflow-hidden">
      {/* Dekorasi titik-titik seperti section "Tentang" di HomePage */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 shrink-0 bg-white p-2 rounded-xl shadow-md">
                <img
                  src={logoAnimeListNavy}
                  alt="AnimeList logo"
                  className="w-full"
                />
              </div>
              <h4 className="font-bold text-xl font-montserrat text-white">
                AnimeList
              </h4>
            </div>
            <p className="text-sm text-sky-200/80 leading-relaxed max-w-xs">
              Platform komunitas anime terlengkap untuk menemukan,
              melacak, dan mendiskusikan serial favoritmu bersama
              jutaan penggemar di seluruh dunia.
            </p>
            <div className="flex items-center gap-2 text-sm text-sky-200/70">
              <FontAwesomeIcon icon={faEnvelope} className="text-indigo-400" />
              hello@animelist.com
            </div>
            <div className="flex items-center gap-2 text-sm text-sky-200/70">
              <FontAwesomeIcon icon={faLocationDot} className="text-indigo-400" />
              Jakarta, Indonesia
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-indigo-500 text-sky-100 hover:text-white border border-white/10 transition-all duration-300 hover:-translate-y-1"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h5 className="font-semibold text-white text-sm sm:text-base mb-1">
                {title}
              </h5>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-sky-200/70 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-sky-300/60">
          <p>© {year} AnimeList. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Dibuat dengan
            <FontAwesomeIcon icon={faHeart} className="text-pink-500 text-xs" />
            untuk para penggemar anime
          </p>
        </div>
      </div>
    </footer>
  );
}