export function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
     
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

    
      <input
        type="text"
        placeholder="Name, Phone no."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}