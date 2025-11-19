import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Recommended from './components/Recommended'

function App() {
  const navigate = useNavigate()
  const [, setParams] = useSearchParams()

  const handleSearch = (q) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_20%_-10%,rgba(56,189,248,0.15),transparent),radial-gradient(900px_500px_at_90%_10%,rgba(59,130,246,0.10),transparent)]" />

      <Navbar onSearch={handleSearch} />
      <Hero onSearch={handleSearch} />
      <Recommended />

      <footer className="relative z-10 border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-white/60 text-sm flex items-center justify-between">
          <p>© 2025 Comparely — Find the best value</p>
          <a className="hover:text-white" href="/test">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
