import { useEffect, useState } from 'react'
import { Star, BadgeCheck } from 'lucide-react'

export default function Recommended() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const load = async ()=>{
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/products/recommended`)
        const data = await res.json()
        if (data.ok) setItems(data.items)
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Recommended for you</h2>
      </div>

      {loading ? (
        <p className="text-white/70">Loading...</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((p)=> (
            <article key={p._id} className="group relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition overflow-hidden">
              {p.is_best_value && (
                <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400 text-emerald-900 text-xs font-semibold shadow">
                  <BadgeCheck className="h-4 w-4" /> Best value
                </div>
              )}
              <div className="aspect-video w-full bg-gradient-to-br from-slate-700/40 to-slate-800/40" style={{backgroundImage: p.image_url?`url(${p.image_url})`:undefined, backgroundSize:'cover', backgroundPosition:'center'}} />
              <div className="p-4">
                <h3 className="text-white font-medium line-clamp-1">{p.title}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-300">
                    <Star className="h-4 w-4 fill-amber-300" />
                    <span className="text-sm text-white/90">{Number(p.rating||0).toFixed(1)}</span>
                  </div>
                  <div className="text-cyan-300 font-semibold">${Number(p.price||0).toFixed(2)}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
