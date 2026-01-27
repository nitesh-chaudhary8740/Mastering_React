import React, { useState, useMemo } from 'react';

// Helper to generate 5,000 transaction records
const generateData = () => {
  alert("executed")
  console.log("🛠 Generating 5,000 records...");
  return Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    amount: Math.floor(Math.random() * 1000),
    status: i % 3 === 0 ? 'Paid' : 'Pending',
  }));
};
// const initialData = generateData(); //this work now generate data will call at once
const PerformancePractice = () => {
  // const [transactions, setTransactions] = useState(initialData);
// ✅ Note the arrow function: () => generateData()
  // React calls this ONLY once.
  const [transactions, setTransactions] = useState(() => generateData());//this also run at once
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  /**
   * TASK A: THE EXPENSIVE CALCULATION
   * We want to find the sum of all 'Paid' transactions.
   */
  const totalPaidAmount = useMemo(() => {
    // This console log helps us track when the calculation actually runs
    console.warn("💰 CALCULATING TOTAL: Running expensive filter/reduce...");
    
    return transactions
      .filter(t => t.status === 'Paid')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]); // 👈 Only re-run if transactions array changes

  return (
    <div className={`p-10 min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Performance Sandbox</h1>
      
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
        >
          Toggle Theme (Triggers Re-render)
        </button>

        <button 
          onClick={() => setClickCount(c => c + 1)}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow"
        >
          Click Count: {clickCount}
        </button>
      </div>

      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Transaction Summary</h2>
        <p className="text-sm text-gray-500 mb-4">Total Records: {transactions.length}</p>
        
        <div className="text-3xl font-mono font-bold text-emerald-600">
          ₹{totalPaidAmount.toLocaleString()}
        </div>
        <p className="text-xs text-gray-400 mt-2 italic">
          (Check the console to see when the calculation runs!)
        </p>
      </div>
    </div>
  );
};

export default PerformancePractice;