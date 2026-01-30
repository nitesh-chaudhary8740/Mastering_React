import React, { useState, useTransition, useEffect } from 'react';
import { VList } from 'virtua'; // Import the virtualizer

const ALL_STOCKS = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    symbol: `STK${i}`,
    name: `Company ${i} Corp`,
}));

const TaskDVirtualizationWithVirtua = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredStocks, setFilteredStocks] = useState(ALL_STOCKS);
    // eslint-disable-next-line no-unused-vars
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            const results = ALL_STOCKS.filter(s => 
                s.symbol.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredStocks(results);
        });
    }, [query]);

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white"
                placeholder="Search 5,000 stocks..."
                onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
                <div className="absolute w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden h-72">
                    {/* VList is the magic part */}
                    <VList style={{ height: '100%' }}>
                        {filteredStocks.map((stock) => (
                            <div 
                                key={stock.id}
                                onClick={() => onSelect(stock)}
                                className="p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 text-slate-300"
                            >
                                <span className="font-bold text-blue-400">{stock.symbol}</span> - {stock.name}
                            </div>
                        ))}
                    </VList>
                </div>
            )}
        </div>
    );
};
export default TaskDVirtualizationWithVirtua