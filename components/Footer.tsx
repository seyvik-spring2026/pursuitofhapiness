import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="poh-footer">
      <div className="poh-footer-inner">
        <div className="poh-footer-identity">
          <Link href="/" className="poh-footer-brand">POH Media</Link>
          <p>Films by Seyvik Magon</p>
        </div>
        <nav className="poh-footer-links" aria-label="Footer navigation">
          <a href="https://instagram.com/seyvikmagon" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://linkedin.com/in/seyvikmagon" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://tiktok.com/@seyvikmagon07" target="_blank" rel="noopener noreferrer">TikTok <span aria-hidden="true">↗</span></a>
          <Link href="/resume">Resume</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <span className="poh-footer-year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
