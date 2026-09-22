import { Star, MessageSquareQuote, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReviewsWidget() {
  const reviews = [
    {
      author: 'Dr. Elena Rostova',
      business: 'Aura Dental Studio',
      location: 'Austin, TX',
      category: 'Healthcare & Dental',
      text: 'Our previous agency quoted $7,500 and estimated 3 months for our clinic rebuild. Mo sent us a live demo on our phone 48 hours after our call. Our patient appointment bookings doubled in the first month.'
    },
    {
      author: 'David Sterling',
      business: 'Horizon Roofing & Exteriors',
      location: 'Atlanta, GA',
      category: 'Commercial Roofing',
      text: 'The $1,500 build fee paid for itself on our first commercial estimate. Having a modern, fast site where property managers can tap to call directly made an immediate difference.'
    },
    {
      author: 'Marcus Vance',
      business: 'Apex Auto Styling',
      location: 'Dallas, TX',
      category: 'Automotive & Wraps',
      text: 'Our average ticket jumped from small tint jobs to $4,500 full color wraps within 60 days of launching with Propello. Customers constantly compliment how clean and fast the site looks on their phone.'
    },
    {
      author: 'Julian Mercer',
      business: 'Mercer & Hayes Legal Group',
      location: 'Denver, CO',
      category: 'Law Firm & Legal',
      text: 'Professional, sharp, and completely painless. Mo handles all updates whenever we bring on new associates. We pay $97 a month and never have to touch server settings or WordPress plugins.'
    },
    {
      author: 'Camilla Valdes',
      business: 'Osteria Rustica',
      location: 'Miami, FL',
      category: 'Restaurant & Hospitality',
      text: 'Our reservation numbers increased noticeably right away. The mobile menu loads instantly and diners love the simplicity. Propello gave us an agency-level web presence without agency pricing.'
    },
    {
      author: 'Colton Miller',
      business: 'Ironwood Site Development',
      location: 'Nashville, TN',
      category: 'Construction & Civil',
      text: 'General contractors always told us our old site made us look like a one-man crew. Three weeks after launching our new Propello site, we were awarded a $380,000 subdivision subcontract.'
    }
  ];

  return (
    <section id="reviews" className="py-24 lg:py-32 border-b border-white/[0.08] relative overflow-hidden">
      
      {/* Background ambient lighting field */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[650px] h-[500px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.12)]">
              <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
              <span>TESTIMONIALS & PROOF</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-semibold text-white tracking-tight leading-tight">
              Trusted by business owners nationwide.
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed font-sans">
              Real results from company founders who chose clarity and speed over agency bureaucracy.
            </p>
          </div>

          {/* Verified Google Rating Badge */}
          <div className="glass-panel-deep border border-cyan-500/30 rounded-xl px-5 py-4 flex items-center gap-3.5 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <div className="flex text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-cyan-400" />
              ))}
            </div>
            <div>
              <span className="text-white font-display font-semibold text-sm block">5.0 Star Rating</span>
              <span className="text-zinc-400 font-mono text-[11px]">Verified Client Reviews</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid — Clean, uncluttered, lets customer words speak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-panel-interactive rounded-xl p-7 flex flex-col justify-between relative group"
            >
              {/* Top illuminated cyan highlight on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-cyan-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-cyan-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {rev.category}
                  </span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans group-hover:text-zinc-200 transition-colors">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <h4 className="text-white font-display font-medium text-sm">
                    {rev.author}
                  </h4>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    {rev.business}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-zinc-400">
                  {rev.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Natural Call CTA after Testimonials */}
        <div className="text-center">
          <a
            href="tel:+14099655019"
            target="_top"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-white/[0.12] hover:border-cyan-400/50 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-200 hover:text-white transition-all text-xs font-mono group cursor-pointer shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Speak with Founder Mo Radford: +1 (409) 965-5019</span>
          </a>
        </div>

      </div>
    </section>
  );
}
