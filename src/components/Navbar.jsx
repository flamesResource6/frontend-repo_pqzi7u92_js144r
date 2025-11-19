import { Link } from 'react-router-dom'
import { User, Search, Sparkles } from 'lucide-react'

export default function Navbar({ onSearch }) {
  return (
    <header className="relative z-20 w-full">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shadow-inner">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Comparely</span>
        </Link>

        <div className="hidden md:flex items-center gap-3 w-[520px]">
          <div className="flex-1 relative">
            <form onSubmit={(e)=>{e.preventDefault(); const q=e.currentTarget.query.value; onSearch && onSearch(q)}}>
              <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-2 backdrop-blur-lg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                <Search className="h-5 w-5 text-cyan-200" />
                <input name="query" placeholder="Search products, brands..." className="w-full bg-transparent outline-none text-white placeholder:text-white/60" />
                <button className="text-sm text-cyan-200/80 hover:text-white transition">Search</button>
              </div>
            </form>
          </div>
          <Link to="/" className="text-sm text-white/70 hover:text-white">Home</Link>
          <Link to="/search" className="text-sm text-white/70 hover:text-white">Explore</Link>
          <button className="ml-2 h-10 w-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
