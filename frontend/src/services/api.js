const API_BASE_URL = 'http://localhost:5000/api';

export const fetchSales = async (params = {}) => {
  const url = new URL(`${API_BASE_URL}/sales`);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

   
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      url.searchParams.set(key, value.join(','));
    } else {
      url.searchParams.set(key, String(value));
    }
  });

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch sales');
  }
  return res.json();
};