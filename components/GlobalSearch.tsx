import React, { useState } from 'react';
import { Search, Loader2, Volume2, Globe, BrainCircuit, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  isDarkMode?: boolean;
}

export const GlobalSearch: React.FC<Props> = ({ onClose, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const themeClasses = isDarkMode
      ? 'bg-slate-900 text-slate-100 border-slate-700'
      : 'bg-white text-slate-900 border-slate-200';

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // 1. Wikipedia API Fetch
      // We'll try English first, but ideally we'd detect language
      const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
      if (wikiRes.ok) {
          const data = await wikiRes.json();
          setResults({
              title: data.title,
              summary: data.extract,
              image: data.thumbnail?.source,
              source: 'Wikipedia'
          });
      } else {
          // Fallback to Hindi Wikipedia if English fails or as a secondary check (for demonstration)
          const wikiHiRes = await fetch(`https://hi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
          if (wikiHiRes.ok) {
              const dataHi = await wikiHiRes.json();
              setResults({
                  title: dataHi.title,
                  summary: dataHi.extract,
                  image: dataHi.thumbnail?.source,
                  source: 'Wikipedia (Hindi)'
              });
          } else {
              setError("No quick results found. AI Tutor is coming soon to help with this!");
          }
      }
    } catch (err) {
      setError("Failed to fetch information. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
      if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          window.speechSynthesis.speak(utterance);
      }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className={`w-full max-w-lg rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] ${themeClasses}`}>

        {/* Header Search Bar */}
        <div className={`p-4 border-b flex items-center gap-3 sticky top-0 z-10 ${isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'}`}>
            <form onSubmit={handleSearch} className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search topics, questions, or doubts..."
                    className={`w-full pl-10 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                        isDarkMode ? 'bg-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 text-slate-900 placeholder-slate-500'
                    }`}
                    autoFocus
                />
            </form>
            <button onClick={onClose} className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-6">
            {!loading && !results && !error && (
                <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 space-y-4 py-10">
                    <Globe size={48} className="opacity-20" />
                    <div>
                        <p className="font-bold">Ask Anything!</p>
                        <p className="text-sm">Search knowledge base, notes, and Wikipedia.</p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="flex flex-col items-center justify-center text-center h-full py-20 space-y-4">
                    <Loader2 size={32} className="text-blue-500 animate-spin" />
                    <p className={`font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Searching the universe...</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800 text-sm text-center flex flex-col items-center gap-2">
                    <BrainCircuit size={24} className="text-amber-500" />
                    <p>{error}</p>
                </div>
            )}

            {results && (
                <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
                    {results.image && (
                        <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100 shadow-inner mb-4 border border-slate-200/50">
                            <img src={results.image} alt={results.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="flex justify-between items-start gap-4">
                        <h2 className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                            {results.title}
                        </h2>
                        <button
                            onClick={() => speak(results.summary)}
                            className="bg-blue-100 text-blue-600 p-2.5 rounded-full hover:bg-blue-200 transition-colors shrink-0"
                            title="Listen"
                        >
                            <Volume2 size={20} />
                        </button>
                    </div>

                    <span className="inline-flex text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        Source: {results.source}
                    </span>

                    <p className={`text-sm leading-relaxed mt-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {results.summary}
                    </p>

                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 flex gap-3 items-center">
                        <BrainCircuit size={24} className="text-blue-500 shrink-0" />
                        <div>
                            <p className={`text-xs font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Need AI explanation?</p>
                            <p className="text-[10px] text-slate-500">IIC AI detailed breakdown coming soon!</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
