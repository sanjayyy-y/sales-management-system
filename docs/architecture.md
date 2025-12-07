## 1. Backend Architecture
The backend is built using **Node.js + Express** and exposes REST APIs to support searching, filtering, sorting, and pagination across 560,000+ records.  
Key components include:

**routes/**  
Defines the API endpoints (`/api/sales`).

**controllers/**  
Handles incoming requests, extracts query parameters, and delegates logic to services.

**services/**  
Constructs dynamic MongoDB queries for:
- Multi-select filters
- Range filters (age, date)
- Search conditions
- Sorting
- Pagination

**models/**  
Contains the Mongoose Sale schema storing all fields (customer, product, billing,metadata).

**utils/**  
Helper functions for pagination, regex search, and query building.

The backend ensures performance using selective projection, conditional query building, and efficient indexing.


## 2. Frontend Architecture
The frontend utilizes **React (Vite)** with a modular component-based design.

Main components:
 **Filters.jsx** – All multi-select dropdowns, age range, date inputs, payment method, tags.
**SearchBar.jsx** – Debounced search input for name/phone.
**SalesTable.jsx** – Renders paginated sales data.
**Pagination.jsx** – Ellipsis-style pagination with next/previous buttons.
**Dashboard.jsx** – Main page combining filters, metrics cards, and table.
**api.js** – Axios-based API utility for interacting with backend endpoints.

The frontend maintains state with React hooks and synchronizes UI state with backend query parameters.

## 3. Data Flow

[User interacts with UI (filters, search, sorting, pagination)]
↓
Frontend constructs query parameters
↓
GET /api/sales?filters...&search...&sort...&page...
↓
Backend controller receives request
↓
Service builds dynamic MongoDB query
↓
MongoDB returns:
matching data,
pagination metadata,
summary stats
↓
Frontend updates:
Table,
summary cards,
Pagination


This flow ensures the table always reflects the latest filters, search input, and sort order.


## 4. Folder Structure

root/
├── backend/
│ ├── controllers/
│ ├── services/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── seed/
│ └── index.js
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── styles/
│ │ └── App.jsx
│ └── public/
│
└── docs/
└── architecture.md


## 5. Module Responsibilities

### **Backend**
**routes/**  
Defines the endpoints for fetching sales.

**controllers/**  
Validates parameters, handles default values, and forwards requests to services.

**services/**  
 Builds the combined query for:
 - Customer Region  
  - Gender  
  - Age Range  
  - Product Category  
  - Tags  
  - Payment Method  
  - Date Range  
  - Search (name/phone)  
  - Sorting  
  - Pagination  
  Returns the result + summary + pagination metadata.

**models/**  
Stores the Mongoose schema and manages database interaction.

**utils/**  
Contains helper functions for constructing regex queries, safe number parsing, and pagination math.


### **Frontend**
**Filters.jsx** → UI for all filters; updates query parameters.  
**SearchBar.jsx** → Debounced search logic.  
**SalesTable.jsx** → Displays results returned by backend.  
**Pagination.jsx** → Renders page numbers with ellipsis.  
**Dashboard.jsx** → Integrates filters, table, stats, and search into one view.  
**api.js** → Centralized API client using Axios.


This architecture ensures scalability, modularity, and maintainability while delivering fast performance even with large datasets.