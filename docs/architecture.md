# Architecture Document

This document explains the backend and frontend architecture, data flow, folder structure, and module responsibilities of the Sales Management System.



## 1. Backend Architecture

The backend is built using **Node.js + Express** and provides all REST APIs required for searching, filtering, sorting, and paginating 560,000+ sales records.

### **Key Backend Layers**

#### **routes/**
Contains all API route definitions.  
Main file:
- `saleRoutes.js` → Handles `/api/sales` routes.

#### **controllers/**
Receives HTTP requests, extracts query parameters, validates input, and forwards logic to service layer.

#### **services/**
Core business logic:
- Builds dynamic MongoDB filters (region, gender, age, date, tags, category, payment method).
- Handles search (name/phone using regex).
- Applies sorting and pagination.
- Performs summary aggregation.

#### **models/**
Contains the Mongoose schema `Sale.js` defining:
- Customer info  
- Product info  
- Billing & discount  
- Metadata (date, region, tags, salesperson, etc.)

#### **utils/**
Helper utilities:
- Query parsing  
- Regex builders  
- Pagination calculations  
- Error handling

### **Performance Features**
- Conditional Mongo filters  
- Indexed fields for fast search & sort  
- Lightweight projections  
- Pagination using `skip + limit`  
- Summary calculations with aggregation pipeline  



## 2. Frontend Architecture

The frontend is built with **React (Vite)** and follows a clean, component-based architecture designed to match the Figma UI.

### **Main Components**

#### **Filters.jsx**
Contains:
- Customer Region (multi-select)
- Gender (multi-select)
- Age Range (min–max)
- Product Category
- Tags
- Payment Method
- Date Range

All changes sync instantly to query parameters.

#### **SearchBar.jsx**
Debounced search:
- Name  
- Phone number  

Prevents excessive API calls.

#### **SalesTable.jsx**
Displays results:
- Sticky headers  
- Responsive table  
- Auto-updates on filters/search/pagination  

#### **Pagination.jsx**
Implements ellipsis pagination:
- Prev/Next  
- Jump to page  
- Dynamic shrinking for large page counts  

#### **Dashboard.jsx**
Integrates everything:
- Metrics cards  
- Filters  
- Search  
- Table  
- Pagination  

#### **api.js**
Handles all API requests to backend with safe parameter handling.



## 3. Data Flow

```
User interacts with UI (filters, search, sorting, pagination)
        ↓
Frontend constructs query parameters
        ↓
GET /api/sales?...query params...
        ↓
Backend controller processes request
        ↓
Service builds dynamic MongoDB query
        ↓
MongoDB returns:
- filtered data
- summary stats
- pagination info
        ↓
Frontend updates dashboard components
```

This ensures real-time reactive updates for all user actions.



## 4. Folder Structure

````bash
root/
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── seed/
│   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── styles/
│   │   └── App.jsx
│   └── public/
│
├── docs/
│   └── architecture.md
│
└── README.md
```


## 5. Module Responsibilities

### Backend Modules

#### routes/
Defines API endpoint structure.

#### controllers/
- Extracts & validates parameters  
- Prepares query inputs  
- Calls service layer  

#### services/
Handles all business logic:
- Filters  
- Search  
- Sorting  
- Pagination  
- Summary calculations  

Returns:
- `data`  
- `pagination`  
- `summary`  

#### models/
Defines MongoDB schema.

#### utils/
Common helper logic used across the backend.


### Frontend Modules

#### Filters.jsx
Tracks and updates user-selected filters.

#### SearchBar.jsx
Handles debounced live search.

#### SalesTable.jsx
Displays backend data with responsive layout.

#### Pagination.jsx
Shows dynamic pagination with ellipsis.

#### Dashboard.jsx
Combines filters, table, search, and metrics.

#### api.js
Centralized API service for all requests.


## Summary

This architecture ensures:
- High performance for large datasets  
- Clean separation of concerns  
- Scalable backend design  
- Responsive and optimized frontend  
- Smooth user experience matching Figma specifications
