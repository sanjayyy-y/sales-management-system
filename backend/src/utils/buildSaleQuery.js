export const buildSaleQuery = (params) => {
  const {
    search,
    customerRegion,
    gender,
    ageMin,
    ageMax,
    productCategory,
    tags,
    paymentMethod,
    dateFrom,
    dateTo
  } = params;

  const query = {};

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i'); // case-insensitive
    query.$or = [{ 'customer.name': regex }, { 'customer.phone': regex }];
  }

  const parseMulti = (value) =>
    typeof value === 'string'
      ? value.split(',').map((v) => v.trim()).filter(Boolean)
      : [];

  const regions = parseMulti(customerRegion);
  if (regions.length) {
    query['customer.region'] = { $in: regions };
  }

  const genders = parseMulti(gender);
  if (genders.length) {
    query['customer.gender'] = { $in: genders };
  }

  const categories = parseMulti(productCategory);
  if (categories.length) {
    query['product.category'] = { $in: categories };
  }

  const tagList = parseMulti(tags);
  if (tagList.length) {
    query['product.tags'] = { $in: tagList };
  }

  const paymentMethods = parseMulti(paymentMethod);
  if (paymentMethods.length) {
    query['sale.paymentMethod'] = { $in: paymentMethods };
  }

    let minAge = null;
    let maxAge = null;

    if (ageMin !== undefined && ageMin !== '') {
        const n = Number(ageMin);
        if (!Number.isNaN(n)) minAge = n;
    }

    if (ageMax !== undefined && ageMax !== '') {
        const n = Number(ageMax);
        if (!Number.isNaN(n)) maxAge = n;
    }

    const hasMinAge = minAge !== null;
    const hasMaxAge = maxAge !== null;

    if (hasMinAge || hasMaxAge) {
        query['customer.age'] = {};
        if (hasMinAge) query['customer.age'].$gte = minAge;
        if (hasMaxAge) query['customer.age'].$lte = maxAge;
    }

  if (dateFrom || dateTo) {
    query.date = {};
    if (dateFrom) query.date.$gte = new Date(dateFrom);
    if (dateTo) query.date.$lte = new Date(dateTo);
  }

  return query;
};