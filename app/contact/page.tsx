import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact — POH Media',
  description: 'Talk to Seyvik Magon about films, founder stories, and what you are building.',
};

export default function ContactPage() {
  return (
    <main className="poh-contact">
      <section className="poh-contact-inner" aria-labelledby="contact-title">
        <p className="poh-eyebrow">POH Media / Contact</p>
        <h1 id="contact-title">You&apos;re building<br />something.<br /><em>Let&apos;s tell its story.</em></h1>
        <div className="poh-contact-bottom">
          <div>
            <p className="poh-contact-intro">A founder story, a film, or an ongoing creative partnership. Tell me what you&apos;re working on and what you want people to feel.</p>
            <p className="poh-contact-byline">Seyvik Magon <span>Filmmaker, POH Media</span></p>
          </div>
          <div className="poh-contact-details">
            <a className="poh-contact-email" href="mailto:seyvikmagon@pohmedia.co">seyvikmagon@pohmedia.co <span aria-hidden="true">↗</span></a>
            <div className="poh-contact-socials">
              <a href="https://instagram.com/seyvikmagon" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <a href="https://linkedin.com/in/seyvikmagon" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href="https://tiktok.com/@seyvikmagon07" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
            </div>
            <Link className="poh-contact-work" href="/#work">Explore the films <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
