'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';

type ProjectKind = 'lb' | 'calendiq';

const services = [
  ['Website systems', 'Conversion-led websites that make a business look as good as it is.', '⌁'],
  ['App products', 'Focused web and mobile products that simplify the work that matters.', '◒'],
  ['Automation', 'Connected workflows that save time and let good teams move faster.', '≋'],
  ['Brand & graphic design', 'Visual identities and creative systems that stay recognisable.', '✣'],
];

const clients = [
  ['VL', 'Vikram Limbachiya', 'Co-founder, LB The Hair Studio', '“TechSol translated our vision into a digital experience that feels as premium as our space.”'],
  ['NL', 'Nipam Limbachiya', 'Founder, Calendiq', '“They made a complex product feel focused, simple and genuinely pleasant to use.”'],
  ['RM', 'Rohan Mehta', 'CEO, Urban Culture', '“Professional, responsive, and incredibly thoughtful from first sketch to launch.”'],
  ['AS', 'Ananya Shah', 'Marketing Head, Glow Spa', '“A rare team that combines sharp visual taste with real business understanding.”'],
];

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Browser({ src, alt }: { src: string; alt: string }) {
  return <div className="browser"><div className="browser-top"><i /><i /><i /><span>techsol.studio / selected-work</span></div><div className="browser-body"><Image src={src} alt={alt} width={1920} height={1080} /></div></div>;
}

function Phone({ src, alt }: { src: string; alt: string }) {
  return <div className="phone"><div className="phone-blur" style={{ backgroundImage: `url(${src})` }} /><span className="phone-notch" /><Image src={src} alt={alt} fill sizes="(max-width: 720px) 42vw, 180px" /></div>;
}

function WorkProject({ type, onPreview }: { type: ProjectKind; onPreview: (src: string, alt: string) => void }) {
  const media = useRef<HTMLDivElement>(null);
  const isLb = type === 'lb';
  const title = isLb ? 'LB The Hair Studio' : 'Calendiq';
  const description = isLb
    ? 'A luxury salon website with editorial storytelling, appointment conversion, and a confident digital identity.'
    : 'A multi-tenant appointment platform bringing scheduling, customers, staff, and business growth into one calm system.';
  const url = isLb ? 'https://lbthehairstudio.in/' : 'https://calendiq.onrender.com/';
  const desktopSrc = isLb ? '/projects/lb-desktop.png' : '/projects/calendiq-desktop.png';
  useEffect(() => {
    const timer = window.setInterval(() => {
      const element = media.current; if (!element) return;
      const next = element.scrollLeft >= element.clientWidth - 10 ? 0 : element.clientWidth;
      element.scrollTo({ left: next, behavior: 'smooth' });
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);
  return <article className={`project project-${type}`}>
    <div className="project-meta"><span>{isLb ? '01' : '02'} /</span><span>{isLb ? 'Branding, website & growth system' : 'Product design & development'}</span></div>
    <div className="project-grid">
      <div className="project-title"><h3>{title}</h3><p>{isLb ? 'A digital home for a premium salon experience.' : 'Scheduling clarity for ambitious service businesses.'}</p><a href={url} target="_blank" rel="noreferrer">View project <b>→</b></a></div>
      <div className="project-media" ref={media} aria-label={`${title} project screens. Swipe horizontally to see mobile screens.`}>
        <div className="media-track">
          <div className="media-slide desktop-slide"><button className="media-open" type="button" onClick={() => onPreview(desktopSrc, `${title} desktop screenshot`)} aria-label={`Open ${title} desktop screenshot`}><Browser src={desktopSrc} alt={`${title} desktop screenshot`} /></button></div>
          <div className="media-slide phone-slide">{isLb ? <button className="media-open" type="button" onClick={() => onPreview('/projects/lb-mobile.jpg', 'LB The Hair Studio mobile screenshot')} aria-label="Open LB The Hair Studio mobile screenshot"><Phone src="/projects/lb-mobile.jpg" alt="LB The Hair Studio mobile screenshot" /></button> : <div className="phone-pair"><button className="media-open" type="button" onClick={() => onPreview('/projects/calendiq-mobile.jpg', 'Calendiq mobile dashboard')} aria-label="Open Calendiq mobile dashboard"><Phone src="/projects/calendiq-mobile.jpg" alt="Calendiq mobile dashboard" /></button><button className="media-open" type="button" onClick={() => onPreview('/projects/calendiq-signin.jpg', 'Calendiq mobile sign in')} aria-label="Open Calendiq mobile sign in"><Phone src="/projects/calendiq-signin.jpg" alt="Calendiq mobile sign in" /></button></div>}</div>
        </div>
        <div className="media-hint"><span>drag to explore</span><b>→</b></div>
      </div>
    </div>
  </article>;
}

function ContactIcon({ kind }: { kind: 'email' | 'whatsapp' }) {
  return kind === 'email'
    ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h18v11H3zM4 7l8 6 8-6" /></svg>
    : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.4a8.5 8.5 0 0 1-12.55 7.48l-4.35 1.55 1.43-4.37A8.5 8.5 0 1 1 20.5 11.4Z" /><path d="M8.9 7.8c.2-.4.4-.5.7-.5h.6c.2 0 .4.2.5.4l.8 1.9c.1.3.1.5-.1.7l-.6.7c.5 1 1.3 1.8 2.3 2.3l.7-.6c.2-.2.5-.2.7-.1l1.9.8c.3.1.4.3.4.5v.6c0 .3-.2.5-.5.7-.5.2-1.1.3-1.7.1-2.7-.8-5-3.1-5.8-5.8-.2-.6-.1-1.2.1-1.7Z" /></svg>;
}

function ClientRail() {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, x: 0, scroll: 0 });
  const down = (event: React.PointerEvent<HTMLDivElement>) => { if (!rail.current) return; drag.current = { active: true, x: event.clientX, scroll: rail.current.scrollLeft }; rail.current.setPointerCapture(event.pointerId); };
  const move = (event: React.PointerEvent<HTMLDivElement>) => { if (rail.current && drag.current.active) rail.current.scrollLeft = drag.current.scroll - (event.clientX - drag.current.x); };
  const stop = () => { drag.current.active = false; };
  const wheel = (event: React.WheelEvent<HTMLDivElement>) => { if (rail.current && Math.abs(event.deltaY) > Math.abs(event.deltaX)) { event.preventDefault(); rail.current.scrollLeft += event.deltaY; } };
  return <div className="client-rail" ref={rail} onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onWheel={wheel}>{clients.map(([initials, name, role, quote]) => <article className="client-quote" key={name}><div className="client-avatar">{initials}</div><p>{quote}</p><h3>{name}</h3><span>{role}</span></article>)}</div>;
}

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const sendInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); setStatus('sending');
    try {
      const result = await fetch('https://formsubmit.co/ajax/omahukal05@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), service: data.get('service'), message: data.get('message'), _subject: `New TechSol inquiry from ${data.get('name')}`, _template: 'table', _captcha: 'false' }) });
      if (!result.ok) throw new Error('Submit failed'); form.reset(); setStatus('sent');
    } catch { setStatus('error'); }
  };

  return <><div className="noise" />
    <header className="site-header"><a className="brand" href="#top">TECHSOL</a><nav><a href="#work">Work</a><a href="#services">Services</a><a href="#clients">About</a><a href="#contact">Contact</a></nav><a className="header-button" href="#contact">Start a project <span>→</span></a><a className="mobile-menu" href="#contact" aria-label="Contact TechSol">☰</a></header>
    {preview && <div className="image-modal" role="dialog" aria-modal="true" aria-label={preview.alt} onClick={() => setPreview(null)}><div className="image-modal-content" onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={() => setPreview(null)} aria-label="Close image preview">×</button><Image src={preview.src} alt={preview.alt} fill sizes="95vw" /></div></div>}
    <main id="top">
      <section className="hero shell"><Reveal className="hero-copy"><p className="overline">/ Digital studio</p><h1>Make your<br />business <em>hard</em> to ignore.</h1><p>We design digital products, growth systems and brands that command attention and drive real results.</p><a className="inline-link" href="#work">See our work <span>→</span></a></Reveal><Reveal className="hero-image"><div className="hero-image-wrap"><Image src="/hero-growth-team.png" alt="Tech team working together" fill priority sizes="(max-width: 720px) 88vw, 50vw" /></div><div className="hero-note"><span>India<br />creative team</span><i /></div></Reveal><div className="hero-strip"><span>Digital products · growth systems · brands</span><em>Built to earn attention.</em><b>→</b></div></section>
      <section id="work" className="work shell"><Reveal className="section-top"><p className="overline">/ Selected work</p><p>We turn practical business needs into sharp, useful digital experiences.</p></Reveal><WorkProject type="lb" onPreview={(src, alt) => setPreview({ src, alt })} /><WorkProject type="calendiq" onPreview={(src, alt) => setPreview({ src, alt })} /></section>
      <section id="services" className="services shell"><p className="overline">/ Services</p><div className="service-list">{services.map(([title, description, icon]) => <article key={title}><i>{icon}</i><div><h3>{title}</h3><p>{description}</p></div><b>→</b></article>)}</div><a className="services-link" href="#contact">Explore all services <span>→</span></a></section>
      <section id="clients" className="clients"><div className="shell clients-head"><div><p className="overline">/ Trusted by ambitious teams</p><h2>Good work gets<br /><em>remembered.</em></h2></div><p>Mouse scroll or drag sideways to hear from the people we partner with.</p></div><ClientRail /></section>
      <section id="contact" className="contact"><div className="shell"><div className="contact-main"><div><p className="overline">/ Have a business idea?</p><h2>Let&apos;s build something<br /><em>extraordinary.</em></h2></div><div className="contact-links"><a href="mailto:omahukal05@gmail.com" aria-label="Email TechSol"><ContactIcon kind="email" /> Email us</a><a href="https://wa.me/919265182934" target="_blank" rel="noreferrer" aria-label="Message TechSol on WhatsApp"><ContactIcon kind="whatsapp" /> Chat on WhatsApp</a></div><form onSubmit={sendInquiry}><input name="name" placeholder="Your name" required /><input name="email" type="email" placeholder="Your email" required /><select name="service" defaultValue="" required><option value="" disabled>What can we help with?</option><option>Website system</option><option>App product</option><option>Automation</option><option>Brand & graphic design</option><option>Other technology service</option></select><textarea name="message" placeholder="Tell us about your project" rows={3} required /><button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Start a project'} <span>→</span></button>{status === 'sent' && <small className="form-success">Thank you — your inquiry has been sent.</small>}{status === 'error' && <small className="form-error">Couldn&apos;t send that right now. Please use email or WhatsApp.</small>}</form></div><footer><span>© 2026 TechSol</span><span>Digital products for growing teams</span><a href="#top">Back to top ↑</a></footer></div></section>
    </main>
  </>;
}
