import { useEffect, useMemo, useState } from 'react'
import { Star, Filter, BadgeCheck } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function SearchResults() {
  const [params, setParams] = useSearchParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState(params.get('sort') || 'relevance')
  const [minRating, setMinRating] = useState(params.get('min_rating') || '')
  const [priceRange, setPriceRange] = useState([params.get('min_price') || '', params.get('max_price') || ''])

  const q = params.get('q') || ''

  const fetchResults = async () => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const query = new URLSearchParams()
      if (q) query.set('q', q)
      if (sort) query.set('sort', sort)
      if (minRating) query.set('min_rating', minRating)
      if (priceRange[0]) query.set('min_price', priceRange[0])
      if (priceRange[1]) query.set('max_price', priceRange[1])
      const res = await fetch(`${base}/api/products/search?${query.toString()}`)
      const data = await res.json()
      if (data.ok) setItems(data.items)
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchResults() }, [q, sort])

  const applyFilters = () => {
    const next = new URLSearchParams(params)
    if (minRating) next.set('min_rating', minRating); else next.delete('min_rating')
    if (priceRange[0]) next.set('min_price', priceRange[0]); else next.delete('min_price')
    if (priceRange[1]) next.set('max_price', priceRange[1]); else next.delete('max_price')
    setParams(next, { replace: true })
    fetchResults()
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-white text-2xl font-semibold">Results for “{q || 'All'}”</h2>
        <div className="flex items-center gap-3">
          <label className="text-white/70 text-sm">Sort</label>
          <select value={sort} onChange={(e)=>setSort(e.target.value)} className="bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2">
            <option value="relevance">Relevance</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" /> <span className="font-semibold">Filters</span>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-white/70 mb-1">Min rating</label>
                <input type="number" step="0.1" min="0" max="5" value={minRating} onChange={(e)=>setMinRating(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Price range</label>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" value={priceRange[0]} onChange={(e)=>setPriceRange([e.target.value, priceRange[1]])} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2" />
                  <input type="number" placeholder="Max" value={priceRange[1]} onChange={(e)=>setPriceRange([priceRange[0], e.target.value])} className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2" />
                </div>
              </div>
              <button onClick={applyFilters} className="w-full px-3 py-2 rounded-lg bg-cyan-400/80 hover:bg-cyan-400 text-slate-900 font-semibold">Apply</button>
            </div>
          </div>
        </aside>

        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white/70">Loading...</p>
          ) : (
            items.map((p)=> (
              <article key={p._id} className="group relative rounded-2xl bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition overflow-hidden">
                {p.is_best_value && (
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-400 text-emerald-900 text-xs font-semibold shadow">
                    <BadgeCheck className="h-4 w-4" /> Best value
                  </div>
                )}
                <div className="aspect-video w-full bg-gradient-to-br from-slate-700/40 to-slate-800/40" style={{backgroundImage: p.image_url?`url(${p.image_url})`:undefined, backgroundSize:'cover', backgroundPosition:'center'}} />
                <div className="p-4">
                  <h3 className="text-white font-medium line-clamp-1">{p.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-2">{p.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-300">
                      <Star className="h-4 w-4 fill-amber-300" />
                      <span className="text-sm text-white/90">{Number(p.rating||0).toFixed(1)}</span>
                    </div>
                    <div className="text-cyan-300 font-semibold">${Number(p.price||0).toFixed(2)}</div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
