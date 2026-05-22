import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaGithubSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiGoogleplay, SiAppstore } from "react-icons/si";
import { Separator } from "./ui/separator";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const year = currentDateTime.getFullYear();

  return (
    <footer className="mt-12 border-t border-white/70 bg-slate-950 px-4 py-12 text-white shadow-[0_-16px_60px_rgba(15,23,42,0.2)] dark:border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-3 md:p-8">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ring-1" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)' }}>
                ZH
              </div>
              <div>
                <h2 className="text-xl font-bold">ZaykaHub Restaurants</h2>
                <p className="text-sm text-white/65">Food ordering reimagined for a cleaner, faster experience.</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/70">
              Premium dining discovery, modern checkout, and smooth cart flows wrapped in a refined interface.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--color-accent-foreground)' }}>Quick Links</h3>
            <div className="mt-4 grid gap-3 text-sm text-white/75">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <Link to="/about" className="transition hover:text-white">About</Link>
              <Link to="/blogs" className="transition hover:text-white">Blogs</Link>
              <Link to="/contact" className="transition hover:text-white">Contact</Link>
              <Link to="/terms" className="transition hover:text-white">Terms & Conditions</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: 'var(--color-accent-foreground)' }}>Support</h3>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              <p>📍 Koderma, Jharkhand, India</p>
              <p>📞 +91 9973162148</p>
              <p>✉️ support@modihotels.com</p>
              <p>🕒 Open daily 9:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/65">
              📅 {currentDateTime.toLocaleDateString("en-GB")} | 🕒 {currentDateTime.toLocaleTimeString()}
            </p>
            <p className="mt-1 text-sm text-white/55">© {year} ZaykaHub Restaurants. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
              <SiGoogleplay className="mr-2 text-base" /> Google Play
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10">
              <SiAppstore className="mr-2 text-base" /> App Store
            </a>
            <a href="https://www.youtube.com/@RahulRaj-vx7ov" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full px-4 py-2 text-sm transition" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-foreground)' }}>
              <FaYoutube className="mr-2 text-base" /> YouTube
            </a>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-wrap items-center justify-center gap-5 text-white/65">
          <a href="https://www.facebook.com/rahulrajmodi.48" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaFacebookF /></a>
          <a href="https://www.instagram.com/rahulrajmodi.48" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/rahul-raj-11a946224/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaLinkedin /></a>
          <a href="https://x.com/RahulRaj__48" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaTwitter /></a>
          <a href="https://github.com/Rahul-2148" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaGithubSquare /></a>
          <a href="https://www.youtube.com/@RahulRaj-ed1ud" target="_blank" rel="noopener noreferrer" className="transition hover:text-white"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;