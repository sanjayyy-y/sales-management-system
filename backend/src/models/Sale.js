import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    // Customer
    customerId: String,
    customerName: String,
    phoneNumber: String,
    gender: String,
    age: Number,
    customerRegion: String,
    customerType: String,

    // Product
    productId: String,
    productName: String,
    brand: String,
    productCategory: String,
    tags: [String],

    // Sales 
    quantity: Number,
    pricePerUnit: Number,
    discountPercentage: Number,
    totalAmount: Number,
    finalAmount: Number,

    // Operational
    date: Date,
    paymentMethod: String,
    orderStatus: String,
    deliveryType: String,
    storeId: String,
    storeLocation: String,
    salespersonId: String,
    employeeName: String
  },
  {
    timestamps: true
  }
);
saleSchema.index({ customerName: 1 });
saleSchema.index({ phoneNumber: 1 });
saleSchema.index({ customerRegion: 1 });
saleSchema.index({ gender: 1 });
saleSchema.index({ productCategory: 1 });
saleSchema.index({ paymentMethod: 1 });
saleSchema.index({ date: -1 });

export const Sale = mongoose.model('Sale', saleSchema);