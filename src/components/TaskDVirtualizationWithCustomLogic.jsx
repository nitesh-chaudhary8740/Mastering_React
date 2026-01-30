import React, { useState, useTransition, useEffect, useMemo } from 'react';

const ALL_STOCKS = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    symbol: `STK${i}`,
    name: `Company ${i} Corp`,
}));

const TaskDVirtualizationWithCustomLogic = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredStocks, setFilteredStocks] = useState(ALL_STOCKS);
    const [scrollTop, setScrollTop] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [isPending, startTransition] = useTransition();

    // Virtualization Config
    const rowHeight = 50; 
    const windowHeight = 288; // Equivalent to h-72 (72 * 4px)
    const overscan = 3; // Buffer items to prevent flickering

    useEffect(() => {
        startTransition(() => {
            if(query===''){ 
            const results = ALL_STOCKS.map(s=>s)
            setFilteredStocks(results);
            setScrollTop(0); 

            }
            else{
                const results = ALL_STOCKS.filter(s => 
                s.symbol.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredStocks(results);
            setScrollTop(0); // Reset scroll to top on new search 
            }
      
        });
    }, [query]);

    // --- Virtualization Calculation ---
    const { startIndex, endIndex, translateY } = useMemo(() => {
        const start = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
        const end = Math.min(
            filteredStocks.length,
            Math.floor((scrollTop + windowHeight) / rowHeight) + overscan
        );
        return { 
            startIndex: start, 
            endIndex: end, 
            translateY: start * rowHeight 
        };
    }, [scrollTop, filteredStocks.length]);
    
    const visibleItems = filteredStocks.slice(startIndex, endIndex);
    const totalContentHeight = filteredStocks.length * rowHeight;

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Search 5,000 stocks (Custom Virtualizer)..."
                onChange={(e) => setQuery(e.target.value)}
            />

            {(query||query==="") &&  (
                <div 
                    className="absolute w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-auto"
                    style={{ height: windowHeight }}
                    onScroll={(e) => {setScrollTop(e.currentTarget.scrollTop)
                        console.log(e.currentTarget.scrollTop)
                    }}
                >
                    {/* 1. STRETCHER: Makes the scrollbar represent the full list size */}
                    <div style={{ height: totalContentHeight, width: '100%', pointerEvents: 'none' }} />

                    {/* 2. VIEWPORT: Only moves the currently visible items into view */}
                    <div 
                        className="absolute top-0 left-0 w-full"
                        style={{ transform: `translateY(${translateY}px)` }}
                    >
                        {visibleItems.map((stock) => (
                            <div 
                                key={stock.id}
                                onClick={() => onSelect?.(stock)}
                                className="hover:bg-slate-700 cursor-pointer border-b border-slate-700/50 text-slate-300 flex items-center px-4"
                                style={{ height: rowHeight }}
                            >
                                <span className="font-bold text-blue-400 mr-2">{stock.symbol}</span>
                                <span className="truncate">- {stock.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDVirtualizationWithCustomLogic;