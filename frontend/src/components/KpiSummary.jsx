export function KpiSummary({ summary }) {
  const {
    totalUnitsSold = 0,
    totalAmount = 0,
    totalDiscount = 0
  } = summary || {};

  const formatNumber = (n) => {
    if (n === null || n === undefined) return 0;
    return n.toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <p>Total Units Sold</p>
        <h2>{formatNumber(totalUnitsSold)}</h2>
      </div>
      <div className="kpi-card">
        <p>Total Amount</p>
        <h2>₹ {formatNumber(totalAmount)}</h2>
      </div>
      <div className="kpi-card">
        <p>Total Discount</p>
        <h2>₹ {formatNumber(totalDiscount)}</h2>
      </div>
    </div>
  );
}