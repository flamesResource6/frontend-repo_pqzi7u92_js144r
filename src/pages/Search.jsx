import Navbar from '../components/Navbar'
import SearchResults from '../components/SearchResults'

export default function SearchPage(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_-10%,rgba(56,189,248,0.12),transparent),radial-gradient(800px_500px_at_90%_0%,rgba(59,130,246,0.10),transparent)]" />
      <Navbar />
      <SearchResults />
    </div>
  )
}
