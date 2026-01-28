import React, { useState, useTransition, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

// Simulating 5000 stocks
const ALL_STOCKS = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    symbol: `STK${i}`,
    name: `Company ${i} Corp`,
}));

const StockSearch = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    const [filteredStocks, setFilteredStocks] = useState([]);
    
    const debouncedQuery = useDebounce(query, 300);

    useEffect(() => {
        // High-performance filtering wrapped in a transition
        startTransition(() => {
            const results = ALL_STOCKS.filter(stock => 
                stock.symbol.toLowerCase().includes(debouncedQuery.toLowerCase())
            ).slice(0, 10); // Show only top 10 for performance
            setFilteredStocks(results);
        });
    }, [debouncedQuery]);

    return (
        <div className="mb-6 relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stocks (e.g. STK12)..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 outline-none focus:border-blue-500 transition-all"
            />
            
            {isPending && <p className="text-xs text-blue-400 mt-1">Filtering list...</p>}

            {debouncedQuery && !isPending && (
                <ul className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                    {filteredStocks.map(stock => (
                        <li 
                            key={stock.id}
                            onClick={() => onSelect(stock)}
                            className="p-3 hover:bg-slate-700 cursor-pointer text-slate-300 border-b border-slate-700 last:border-none"
                        >
                            <span className="font-bold text-blue-400">{stock.symbol}</span> - {stock.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StockSearch;