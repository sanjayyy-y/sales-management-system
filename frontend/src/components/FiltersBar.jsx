const REGION_OPTIONS = ['', 'North', 'South', 'East', 'West', 'Central'];
const GENDER_OPTIONS = ['', 'Male', 'Female'];
const CATEGORY_OPTIONS = ['', 'Electronics', 'Clothing', 'Beauty'];
const PAYMENT_OPTIONS = [
  '',
  'Credit Card',
  'Debit Card',
  'UPI',
  'Net Banking',
  'Wallet',
  'Cash'
];
const TAG_OPTIONS = ['', 'New Arrival', 'Best Seller', 'Discount', 'Online Exclusive'];

const AGE_RANGES = [
  { value: '', label: 'All ages', min: '', max: '' },
  { value: '18-25', label: '18 – 25', min: 18, max: 25 },
  { value: '26-35', label: '26 – 35', min: 26, max: 35 },
  { value: '36-45', label: '36 – 45', min: 36, max: 45 },
  { value: '46-60', label: '46 – 60', min: 46, max: 60 },
  { value: '60+', label: '60+', min: 60, max: 120 }
];

const SORT_OPTIONS = [
  { value: 'date', label: 'Date (Newest First)' },
  { value: 'quantityAsc', label: 'Quantity (Low → High)' },
  { value: 'quantityDesc', label: 'Quantity (High → Low)' },
  { value: 'name', label: 'Customer Name (A–Z)' }
];

export function FiltersBar({
  filters,
  onChangeFilters,
  sortBy,
  onChangeSortBy
}) {
  const handleSelectChange = (key, value) => {
    onChangeFilters({ [key]: value });
  };

  const handleAgeRangeChange = (value) => {
    const range = AGE_RANGES.find((r) => r.value === value);

    if (!range) return;

    onChangeFilters({
      ageRange: value,
      ageMin: range.min === '' ? '' : String(range.min),
      ageMax: range.max === '' ? '' : String(range.max)
    });
  };

  const clearFilters = () => {
    onChangeFilters({
      customerRegion: '',
      gender: '',
      ageMin: '',
      ageMax: '',
      ageRange: '',
      productCategory: '',
      tags: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="filters-bar">
      <div className="filters-row">
       
        <div className="filter-item">
          <label>Customer Region</label>
          <select
            value={filters.customerRegion}
            onChange={(e) => handleSelectChange('customerRegion', e.target.value)}
          >
            {REGION_OPTIONS.map((r) => (
              <option key={r || 'all'} value={r}>
                {r || 'All regions'}
              </option>
            ))}
          </select>
        </div>

        
        <div className="filter-item">
          <label>Gender</label>
          <select
            value={filters.gender}
            onChange={(e) => handleSelectChange('gender', e.target.value)}
          >
            {GENDER_OPTIONS.map((g) => (
              <option key={g || 'all'} value={g}>
                {g || 'All genders'}
              </option>
            ))}
          </select>
        </div>

       
        <div className="filter-item">
          <label>Age Range</label>
          <select
            value={filters.ageRange}
            onChange={(e) => handleAgeRangeChange(e.target.value)}
          >
            {AGE_RANGES.map((age) => (
              <option key={age.value || 'all'} value={age.value}>
                {age.label}
              </option>
            ))}
          </select>
        </div>

       
        <div className="filter-item">
          <label>Product Category</label>
          <select
            value={filters.productCategory}
            onChange={(e) =>
              handleSelectChange('productCategory', e.target.value)
            }
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c || 'all'} value={c}>
                {c || 'All categories'}
              </option>
            ))}
          </select>
        </div>

       
        <div className="filter-item">
          <label>Tags</label>
          <select
            value={filters.tags}
            onChange={(e) => handleSelectChange('tags', e.target.value)}
          >
            {TAG_OPTIONS.map((t) => (
              <option key={t || 'all'} value={t}>
                {t || 'All tags'}
              </option>
            ))}
          </select>
        </div>

       
        <div className="filter-item">
          <label>Payment Method</label>
          <select
            value={filters.paymentMethod}
            onChange={(e) =>
              handleSelectChange('paymentMethod', e.target.value)
            }
          >
            {PAYMENT_OPTIONS.map((p) => (
              <option key={p || 'all'} value={p}>
                {p || 'All methods'}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Date Range</label>
          <div className="filter-inline">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                onChangeFilters({ dateFrom: e.target.value })
              }
            />
            <span>→</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                onChangeFilters({ dateTo: e.target.value })
              }
            />
          </div>
        </div>

       
        <div className="filter-item">
          <label>Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => onChangeSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

    
        <div className="filter-item">
          <label>&nbsp;</label>
          <button type="button" className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}