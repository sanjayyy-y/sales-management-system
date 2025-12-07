export function SalesTable({ rows }) {
  if (!rows || rows.length === 0) {
    return <div className="no-results">No results found.</div>;
  }

  return (
    <div className="table-wrapper">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Product Category</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Customer Region</th>
            <th>Product ID</th>
            <th>Employee Name</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row._id}>
              <td>
                {row.date
                  ? new Date(row.date).toLocaleDateString('en-IN')
                  : '-'}
              </td>
              <td>{row.customerId}</td>
              <td>{row.customerName}</td>
              <td>{row.phoneNumber}</td>
              <td>{row.gender}</td>
              <td>{row.age}</td>
              <td>{row.productCategory}</td>
              <td>{row.quantity}</td>
              <td>{row.totalAmount}</td>
              <td>{row.customerRegion}</td>
              <td>{row.productId}</td>
              <td>{row.employeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}