export function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  const maxButtons = 7;
  let start = Math.max(1, page - 3);
  let end = Math.min(totalPages, start + maxButtons - 1);

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1);
  }

  for (let p = start; p <= end; p += 1) {
    pages.push(p);
  }

  return (
    <div className="pagination">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onChange(1)}>1</button>
          {start > 2 && <span className="dots">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={p === page ? 'active' : ''}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="dots">...</span>}
          <button onClick={() => onChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
