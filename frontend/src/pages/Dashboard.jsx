import { useEffect, useState } from 'react';
import { fetchSales } from '../services/api';
import { SearchBar } from '../components/SearchBar';
import { KpiSummary } from '../components/KpiSummary';
import { FiltersBar } from '../components/FiltersBar';
import { SalesTable } from '../components/SalesTable';
import { Pagination } from '../components/Pagination';

export function Dashboard() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
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
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);

  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({});
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  const [loading, setLoading] = useState(false);

  const updateFilters = (partial) => {
    setFilters((prev) => ({
      ...prev,
      ...partial
    }));
    setPage(1);
  };

  const loadSales = async () => {
    try {
      setLoading(true);

      const params = {
        search,
        page,
        limit: 10,
        sortBy,
        customerRegion: filters.customerRegion,
        gender: filters.gender,
        ageMin: filters.ageMin || undefined,
        ageMax: filters.ageMax || undefined,
        productCategory: filters.productCategory,
        tags: filters.tags,
        paymentMethod: filters.paymentMethod,
        dateFrom: filters.dateFrom || undefined,
        dateTo: filters.dateTo || undefined
      };

      const result = await fetchSales(params);

      setSales(result.data || []);
      setSummary(result.summary || {});
      setPagination(result.pagination || {});
    } catch (err) {
      console.error(err);
      alert('Failed to load sales');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    loadSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy, page, JSON.stringify(filters)]);

  const currentPage = pagination.page || page;
  const totalPages = pagination.totalPages || 1;

  return (
    <div className="dashboard">
      
      <header className="top-bar">
        <h1>Sales Management System</h1>
        <SearchBar
          value={search}
          onChange={(value) => {
            setPage(1);
            setSearch(value);
          }}
        />
      </header>

     
      <section className="kpi-strip">
        <KpiSummary summary={summary} />
      </section>

   
      <section className="filters-section">
        <FiltersBar
          filters={filters}
          onChangeFilters={updateFilters}
          sortBy={sortBy}
          onChangeSortBy={(value) => {
            setPage(1);
            setSortBy(value);
          }}
        />
      </section>

     
      <section className="table-section">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <SalesTable rows={sales} />
        )}
      </section>

    
      <section className="pagination-section">
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={setPage}
        />
      </section>
    </div>
  );
}