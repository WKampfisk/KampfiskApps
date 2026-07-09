import React, { useState, useMemo } from 'react'
import { Search, X, ExternalLink, Github, Star, ArrowRight } from 'lucide-react'
import { apps, categories } from './data/apps'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedApp, setSelectedApp] = useState(null)
  const [sortMode, setSortMode] = useState('featured') // featured | name | category

  // Filter + search + sort
  const filteredApps = useMemo(() => {
    let result = [...apps]

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase()
      result = result.filter(app =>
        app.name.toLowerCase().includes(q) ||
        app.tagline.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        (app.tags && app.tags.join(' ').toLowerCase().includes(q))
      )
    }

    // Category
    if (activeCategory !== 'All') {
      result = result.filter(app => app.category === activeCategory)
    }

    // Sort
    if (sortMode === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortMode === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category))
    }
    // featured keeps original order (curated)

    return result
  }, [searchTerm, activeCategory, sortMode])

  const openApp = (app) => {
    setSelectedApp(app)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedApp(null)
    document.body.style.overflow = 'unset'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && selectedApp) {
      closeModal()
    }
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedApp])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center">
              <span className="text-slate-950 font-bold text-xl tracking-tighter">K</span>
            </div>
            <div>
              <div className="font-semibold text-xl tracking-tight">KampfiskApps</div>
              <div className="text-[10px] text-slate-500 -mt-1">MARKETPLACE</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href="#apps" className="hover:text-white px-3 py-1.5 text-slate-400 hover:text-slate-200 transition">Browse</a>
            <a href="https://github.com/WKampfisk" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white px-3 py-1.5 text-slate-400 hover:text-slate-200 transition">
              <Github size={16} /> GitHub
            </a>
            <button 
              onClick={() => {
                const el = document.getElementById('apps')
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="bg-white text-slate-950 hover:bg-slate-100 transition px-4 py-1.5 rounded-xl text-sm font-medium flex items-center gap-2"
            >
              Explore apps <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-bg border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 pt-16 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-slate-400 text-xs font-medium tracking-[2px] px-4 py-1 rounded-full mb-6 border border-slate-800">
            PERSONAL COLLECTION
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-semibold tracking-tighter mb-4">
            Apps worth<br />using every day.
          </h1>
          <p className="text-xl text-slate-400 max-w-md mx-auto">
            A curated marketplace of tools, games, and utilities built by Kampfisk. 
            Nature, education, productivity, and exploration.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button 
              onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-slate-100 active:bg-slate-200 transition text-slate-950 font-semibold px-8 py-3 rounded-2xl flex items-center gap-2"
            >
              Browse the collection
            </button>
            <a 
              href="https://github.com/WKampfisk/KampfiskApps" 
              target="_blank" 
              rel="noreferrer"
              className="border border-slate-700 hover:bg-slate-900 transition px-6 py-3 rounded-2xl text-sm font-medium"
            >
              View on GitHub
            </a>
          </div>
          <div className="mt-6 text-xs text-slate-500">{apps.length} apps • Many more coming soon</div>
        </div>
      </div>

      {/* Apps Section */}
      <div id="apps" className="max-w-7xl mx-auto px-6 pt-10 pb-24">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">All Apps</h2>
            <p className="text-slate-400 mt-1 text-sm">Discover tools built for real needs</p>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search apps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-slate-600 pl-11 pr-4 py-2.5 rounded-2xl text-sm placeholder:text-slate-500 outline-none"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-3 text-slate-500 hover:text-slate-300">
                  <X size={18} />
                </button>
              )}
            </div>

            <select 
              value={sortMode} 
              onChange={(e) => setSortMode(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-sm rounded-2xl px-4 py-2.5 outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="name">A — Z</option>
              <option value="category">By category</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-pill px-4 py-1.5 text-sm border rounded-2xl border-slate-800 hover:border-slate-600 transition ${
                activeCategory === cat ? 'active border-slate-700' : 'text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-slate-500 mb-4">
          Showing {filteredApps.length} of {apps.length} apps
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div 
                key={app.id} 
                onClick={() => openApp(app)}
                className="app-card group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/70 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur">
                      {app.status}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs px-3 py-1 bg-white/90 text-slate-900 rounded-2xl font-medium tracking-tight">
                      {app.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="font-semibold text-xl tracking-tight mb-1 group-hover:text-white transition">
                    {app.name}
                  </div>
                  <div className="text-slate-400 text-sm leading-snug line-clamp-2 mb-4">
                    {app.tagline}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-sm">
                    <div className="font-medium text-emerald-400">{app.price}</div>
                    
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-300">
                      View details <ArrowRight size={15} className="group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-slate-400">No apps match your search.</p>
              <button onClick={() => { setSearchTerm(''); setActiveCategory('All') }} className="mt-4 text-sm underline">Clear filters</button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center border-t border-slate-800 pt-10">
          <p className="text-slate-400 text-sm">
            More apps are in active development. Want early access or to collaborate?
          </p>
          <a 
            href="https://github.com/WKampfisk" 
            target="_blank" 
            className="inline-flex items-center gap-2 mt-3 text-sm font-medium hover:underline"
          >
            Reach out on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* App Detail Modal */}
      {selectedApp && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" 
          onClick={closeModal}
        >
          <div 
            className="modal bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72">
              <img 
                src={selectedApp.image} 
                alt={selectedApp.name} 
                className="w-full h-full object-cover" 
              />
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 transition p-2 rounded-full backdrop-blur"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-24" />
            </div>

            <div className="p-8">
              <div className="flex flex-wrap items-start gap-x-4 gap-y-1">
                <h3 className="text-4xl font-semibold tracking-tighter">{selectedApp.name}</h3>
                <div className="mt-2">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-800">
                    {selectedApp.price}
                  </span>
                </div>
              </div>

              <p className="text-xl text-slate-300 mt-1">{selectedApp.tagline}</p>

              <div className="flex gap-2 mt-4">
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {selectedApp.category}
                </span>
                {selectedApp.tags?.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert mt-6 text-[15px] leading-relaxed text-slate-300">
                <p>{selectedApp.longDescription || selectedApp.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                {selectedApp.github && (
                  <a 
                    href={selectedApp.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-950 font-semibold py-3 px-6 rounded-2xl transition"
                  >
                    <Github size={18} /> View on GitHub
                  </a>
                )}

                {selectedApp.demo && (
                  <a 
                    href={selectedApp.demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-800 py-3 px-6 rounded-2xl transition"
                  >
                    Live Demo <ExternalLink size={17} />
                  </a>
                )}

                {!selectedApp.github && (
                  <button 
                    onClick={() => alert("This app is currently in a private Base44 workspace. Reach out for early access or a demo!")}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-slate-600 hover:bg-slate-800 py-3 px-6 rounded-2xl transition"
                  >
                    Request Access
                  </button>
                )}

                <button 
                  onClick={closeModal}
                  className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium border border-slate-700 hover:bg-slate-800 rounded-2xl transition"
                >
                  Close
                </button>
              </div>

              <div className="mt-6 text-xs text-slate-500">
                Status: {selectedApp.status} • Built by Kampfisk
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple Footer */}
      <footer className="border-t border-slate-800 py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Kampfisk • All apps built with curiosity and craft.
      </footer>
    </div>
  )
}

export default App
