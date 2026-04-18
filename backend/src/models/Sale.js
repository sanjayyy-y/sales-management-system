import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    transactionId: Number,
    date: Date,
    customer: {
      id: String,
      name: String,
      phone: String,
      gender: String,
      age: Number,
      region: String,
      type: String
    },
    product: {
      id: String,
      name: String,
      brand: String,
      category: String,
      tags: [String]
    },
    sale: {
      quantity: Number,
      pricePerUnit: Number,
      discountPercent: Number,
      totalAmount: Number,
      finalAmount: Number,
      paymentMethod: String,
      orderStatus: String,
      deliveryType: String
    },
    store: {
      id: String,
      location: String
    },
    employee: {
      id: String,
      name: String
    }
  },
  {
    timestamps: true
  }
);

saleSchema.index({ 'customer.name': 1 });
saleSchema.index({ 'customer.phone': 1 });
saleSchema.index({ 'customer.region': 1 });
saleSchema.index({ 'customer.gender': 1 });
saleSchema.index({ 'product.category': 1 });
saleSchema.index({ 'sale.paymentMethod': 1 });
saleSchema.index({ date: -1 });

export const Sale = mongoose.model('Sale', saleSchema);