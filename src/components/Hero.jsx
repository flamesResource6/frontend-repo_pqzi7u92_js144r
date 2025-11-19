import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[78vh] flex items-center">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20 text-cyan-200">
            Glassmorphic • Fintech • Modern
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Find the best value for your next purchase
        </motion.h1>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-4 max-w-2xl text-white/80">
          Compare prices, ratings, and features at a glance. Highlighting the sweet spot where quality meets price.
        </motion.p>

        <motion.form onSubmit={(e)=>{e.preventDefault(); const q=e.currentTarget.query.value; onSearch && onSearch(q)}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-8 w-full max-w-2xl">
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
            <svg className="h-5 w-5 text-cyan-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
            <input name="query" placeholder="Search products, e.g. wireless earbuds" className="w-full bg-transparent outline-none text-white placeholder:text-white/70" />
            <button className="px-4 py-2 rounded-lg bg-cyan-400/80 hover:bg-cyan-400 text-slate-900 font-semibold transition">Search</button>
          </div>
        </motion.form>
      </div>
    </section>
  )
}
