# Sales Management System

## 1. Overview
This project is a full-stack Sales Management Dashboard built using React and Node.js, designed to process and display over 560,000 sales records efficiently. It replicates the TruEstate assignment UI with a clean, responsive interface and supports fast searching, multi-level filtering, sorting, and pagination. The backend uses optimized MongoDB queries while the frontend provides a smooth, Figma-matched user experience.

## 2. Tech Stack
**Frontend:** React (Vite), Axios  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Deployment:** Render / Vercel  
**Other:** CSV ingestion, Debounced search, Query optimization

## 3. Search Implementation Summary
- Search supports customer **name** and **phone number** fields.  
- Implemented using **case-insensitive regex matching** in MongoDB.  
- Search is **debounced** on the frontend to reduce load.  
- Fully compatible with filters, sorting, and pagination.

## 4. Filter Implementation Summary
The system supports:
- Customer Region (multi-select)  
- Gender (multi-select)  
- Age Range (min–max input)  
- Product Category (multi-select)  
- Tags (multi-select)  
- Payment Method  
- Date Range (from–to)  

All filters combine dynamically in the backend to build efficient MongoDB queries. Filters work independently and together.

## 5. Sorting Implementation Summary
Sorting options include:
- Date (Newest → Oldest, Oldest → Newest)  
- Customer Name (A–Z, Z–A)  
- Total Amount (Low → High, High → Low)  
- Quantity (Low → High, High → Low)

Sorting is performed using MongoDB’s `.sort()` and integrates cleanly with filters + pagination.

## 6. Pagination Implementation Summary
- Backend uses **skip + limit** strategy.  
- Frontend displays pagination with **ellipsis (… )** for long page ranges.  
- Supports direct page jumps, next/previous, and dynamic total pages.  
- Works in combination with all filters, sorting, and search.

## 7. Setup Instructions

### Backend

cd backend
npm install
npm run dev


### Frontend
cd frontend
npm install
npm run dev