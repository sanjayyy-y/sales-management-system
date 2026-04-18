import { Sale } from '../models/Sale.js';
import { buildSaleQuery } from '../utils/buildSaleQuery.js';

const getSortOptions = (sortBy) => {
  switch (sortBy) {
    case 'quantityAsc':
      return { 'sale.quantity': 1 };
    case 'quantityDesc':
      return { 'sale.quantity': -1 };
    case 'name':
      return { 'customer.name': 1 };
    case 'date':
    default:
      return { date: -1 };
  }
};

export const getSalesService = async (params) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'date'
  } = params;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const pageSize = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * pageSize;

  const filter = buildSaleQuery(params);
  console.log('Computed Mongo filter:', filter);
  const sort = getSortOptions(sortBy);

  const [items, totalCount, kpiRaw] = await Promise.all([
    Sale.find(filter).sort(sort).skip(skip).limit(pageSize).lean(),
    Sale.countDocuments(filter),
    Sale.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalUnitsSold: { $sum: '$sale.quantity' },
          totalAmount: { $sum: '$sale.totalAmount' },
          totalDiscount: {
            $sum: {
              $subtract: ['$sale.totalAmount', '$sale.finalAmount']
            }
          }
        }
      }
    ])
  ]);
  console.log('totalCount for this filter:', totalCount);

  const summary = kpiRaw[0] || {
    totalUnitsSold: 0,
    totalAmount: 0,
    totalDiscount: 0
  };

  const dataFormatted = items.map(doc => ({
    _id: doc._id,
    date: doc.date,
    customerId: doc.customer?.id,
    customerName: doc.customer?.name,
    phoneNumber: doc.customer?.phone,
    gender: doc.customer?.gender,
    age: doc.customer?.age,
    customerRegion: doc.customer?.region,
    productId: doc.product?.id,
    productCategory: doc.product?.category,
    quantity: doc.sale?.quantity,
    totalAmount: doc.sale?.totalAmount,
    employeeName: doc.employee?.name
  }));

  return {
    data: dataFormatted,
    pagination: {
      page: pageNum,
      limit: pageSize,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / pageSize)
    },
    summary
  };
};