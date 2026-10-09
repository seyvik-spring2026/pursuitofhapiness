import Link from 'next/link';
import { PROJECTS } from '@/lib/projects';
import PohFilm from '@/components/PohFilm';
import styles from './poh-home.module.css';

const selectedWork = [
  {
    slug: 'founder-storytelling',
    title: 'The person behind the company.',
    description: 'An original series about founders, the road they’re taking, and what gets them out of bed every morning.',
    category: '01 / Founder stories',
  },
  {
    slug: 'rho-events',
    title: 'You had to be there. Almost.',
    description: 'Event storytelling with Rho. The people, conversations, and energy of startup rooms across San Francisco, Boston, and New York.',
    category: '02 / Events & community',
  },
  {
    slug: 'cash-flows',
    title: 'Make the complex click.',
    description: 'Cash Flows: a series breaking down the financial infrastructure that powers the internet. Big ideas, told in a way that makes sense.',
    category: '03 / Ideas explained',
  },
];

export default function Home() {
  const hero = PROJECTS['founder-storytelling'];
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="poh-title">
        <div className={styles.mastheadMeta}>
          <span>Independent filmmaking & storytelling</span>
          <span>By Seyvik Magon</span>
        </div>
        <h1 id="poh-title" className={styles.wordmark}>POH Media</h1>
        <div className={styles.heroRule} />
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.sunDot} /> Pursuit of Happiness</p>
            <h2>Films for people<br />{' '}building <em>something.</em></h2>
            <p className={styles.heroDescription}>I tell the stories behind ambitious people and ideas. Films that build trust, make the complex click, and make you feel something.</p>
            <div className={styles.heroActions}>
              <a href="#work" className={styles.primaryAction}>Explore the films <span aria-hidden="true">↘</span></a>
              <a href="mailto:seyvikmagon@pohmedia.co" className={styles.textAction}>Let&apos;s talk <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure className={styles.heroFilm}>
            <PohFilm src={hero.previewVideo!} poster={hero.previewPoster!} title={hero.title} projectHref="/projects/founder-storytelling" priority />
            <figcaption><span>Krish Khemlani / Desi Eats</span><span>Founder Storytelling Series</span></figcaption>
          </figure>
          <div className={styles.heroAside} aria-hidden="true">Real people.<br />Real stories.</div>
        </div>
        <div className={styles.heroBottom}><span>A feeling. A story. A reason to care.</span><a href="#work">Scroll to watch <span aria-hidden="true">↓</span></a></div>
      </section>

      <section id="work" className={styles.work} aria-labelledby="work-heading">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>A few stories I&apos;ve told</p>
          <h2 id="work-heading">Selected <em>work.</em></h2>
          <span className={styles.workYears}>Founder stories / Events / Ideas</span>
        </div>
        {selectedWork.map((item, index) => {
          const project = PROJECTS[item.slug];
          return (
            <article key={item.slug} className={`${styles.workRow} ${index % 2 === 1 ? styles.workRowReverse : ''}`}>
              <div className={styles.workFilm}>
                <PohFilm src={project.previewVideo!} poster={project.previewPoster!} title={project.title} projectHref={`/projects/${item.slug}`} />
              </div>
              <div className={styles.workCopy}>
                <p className={styles.eyebrow}>{item.category}</p>
                <h3>{item.title}</h3>
                <p className={styles.workDescription}>{item.description}</p>
                <Link href={`/projects/${item.slug}`} className={styles.projectLink} aria-label={`View ${project.title} project`}><span>{project.title}</span><span aria-hidden="true">↗</span></Link>
                <p className={styles.location}>{project.postmark}</p>
              </div>
            </article>
          );
        })}
        <div className={styles.allWork}><span>There&apos;s more where that came from.</span><Link href="/projects" className={styles.textAction}>All projects <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section id="approach" className={styles.approach} aria-labelledby="approach-heading">
        <p className={styles.eyebrow}>The approach</p>
        <h2 id="approach-heading">Your ambition.<br />A story worth <em>feeling.</em></h2>
        <div className={styles.approachDetails}>
          <p>The work you&apos;ve put in deserves content that can encapsulate it. I find the human story, capture it, and shape it into a film people want to watch.</p>
          <div className={styles.offerList}><p><span>01</span> Founder & brand storytelling</p><p><span>02</span> Events & community</p><p><span>03</span> Content that makes ideas click</p></div>
        </div>
      </section>

      <section className={styles.personal} aria-labelledby="personal-heading">
        <div className={styles.personalStill}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/project-posters/personal-day-in-life.jpg" alt="Seyvik in a frame from his Day in the Life film" loading="lazy" />
          <span>Day in the Life / A personal film</span>
        </div>
        <div className={styles.personalCopy}>
          <p className={styles.eyebrow}>The person behind the camera</p>
          <h2 id="personal-heading">Hi, I&apos;m <em>Seyvik.</em></h2>
          <p>I&apos;m a storyteller living in San Francisco. For the past two summers though I worked in finance, most recently as a private credit analyst on Wall Street.</p>
          <p>When I was very young, I used to make movies about everything. I&apos;ve started doing it again.</p>
          <Link href="/about" className={styles.textAction}>More about me <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.contact} aria-labelledby="contact-heading">
        <p className={styles.eyebrow}><span className={styles.sunDot} /> Start a conversation</p>
        <h2 id="contact-heading">What are you<br /><em>building?</em></h2>
        <div className={styles.contactBottom}><p>A founder story. An event. An idea that deserves to be understood.<br />I&apos;d love to hear about it.</p><a href="mailto:seyvikmagon@pohmedia.co" className={styles.contactLink}>Let&apos;s work together <span aria-hidden="true">↗</span></a></div>
        <a href="mailto:seyvikmagon@pohmedia.co" className={styles.email}>seyvikmagon@pohmedia.co</a>
      </section>
    </main>
  );
}
