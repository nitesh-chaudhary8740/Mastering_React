import React, { useState, useMemo, useCallback } from 'react';

// 1. A Child Component wrapped in React.memo
// This tells React: "Don't re-render me unless my PROPS actually change."
const generateData = () => {
  alert("executed")
  console.log("🛠 Generating 5,000 records...");
  return Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    amount: Math.floor(Math.random() * 1000),
    status: i % 3 === 0 ? 'Paid' : 'Pending',
  }));
};
//React.memo avoids the child components re-rendering even if the parent is rendering until any passes prop are
const StatsDisplay = React.memo(({ total, onReset }) => {
  console.log("💎 CHILD RENDER: StatsDisplay is rendering...");
  
  return (
    <div className="mt-6 p-4 bg-orange-100 rounded-lg border border-orange-200">
      <h3 className="font-bold text-orange-800">Child Component (Stats)</h3>
      <p className="text-2xl text-orange-600">Sum: ₹{total}</p>
      <button 
        onClick={onReset}
        className="mt-2 text-xs bg-orange-500 text-white px-2 py-1 rounded"
      >
        Reset Totals
      </button>
    </div>
  );
});

const PerformancePracticeB = () => {
    //it doesn't matter how many times this generateData method call as initial value of state the state now only will change from its setter function after first render/mounting
  const [transactions, setTransactions] = useState(() => generateData());
  const [clickCount, setClickCount] = useState(0);

  const totalPaidAmount = useMemo(() => {
    return transactions
      .filter(t => t.status === 'Paid')
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  // ❌ WITHOUT useCallback: 
  // This function is "re-created" every time clickCount changes.
  // Because the function is "new", StatsDisplay (the child) re-renders.
  
  // ✅ WITH useCallback:
  // The function "reference" stays the same.
  const handleReset = useCallback(() => {
    console.log("Resetting...");
    setTransactions([]);
  }, []); // Empty dependency means this function never changes

  return (
    <div className="p-10">
      <button onClick={() => setClickCount(c => c + 1)}>
        Clicks: {clickCount} (Triggers Parent Render)
      </button>

      {/* This child only stays still if handleReset is memoized! */}
      <StatsDisplay total={totalPaidAmount} onReset={handleReset} />
    </div>
  );
};
export default PerformancePracticeB