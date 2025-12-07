import { getSalesService } from '../services/saleService.js';

export const getSales = async (req, res, next) => {
  try {
    const result = await getSalesService(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};