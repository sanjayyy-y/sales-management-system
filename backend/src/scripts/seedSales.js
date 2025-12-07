import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

import { connectDB } from '../utils/db.js';
import { Sale } from '../models/Sale.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, '../../data/sales.csv');

const BATCH_SIZE = 5000;

const parseNumber = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(String(v).replace(/,/g, ''));
  return Number.isNaN(n) ? null : n;
};

const parseTags = (value) => {
  if (!value) return [];
  return String(value)
    .split(/[;,]/)
    .map((t) => t.trim())
    .filter(Boolean);
};

const main = async () => {
  await connectDB();

  console.log('Clearing existing sales collection..');
  await Sale.deleteMany({});

  let batch = [];
  let totalCount = 0;

  console.log('Reading CSV from', csvFilePath);

  await new Promise((resolve, reject) => {
    const stream = fs.createReadStream(csvFilePath).pipe(csv());

    stream
      .on('data', async (row) => {
        
        const sale = {
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row['Gender'],
          age: parseNumber(row['Age']),
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],

          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row['Brand'],
          productCategory: row['Product Category'],
          tags: parseTags(row['Tags']),

          quantity: parseNumber(row['Quantity']),
          pricePerUnit: parseNumber(row['Price per Unit']),
          discountPercentage: parseNumber(row['Discount Percentage']),
          totalAmount: parseNumber(row['Total Amount']),
          finalAmount: parseNumber(row['Final Amount']),

          date: row['Date'] ? new Date(row['Date']) : null,
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name']
        };

        batch.push(sale);

        if (batch.length >= BATCH_SIZE) {
          
          stream.pause();

          Sale.insertMany(batch, { ordered: false })
            .then(() => {
              totalCount += batch.length;
              console.log(`Inserted batch, total so far: ${totalCount}`);
              batch = [];
              stream.resume();
            })
            .catch((err) => {
              console.error('Batch insert error:', err);
              stream.resume();
            });
        }
      })
      .on('end', async () => {
        try {
          if (batch.length) {
            await Sale.insertMany(batch, { ordered: false });
            totalCount += batch.length;
            console.log(`Inserted final batch, total: ${totalCount}`);
          }
          console.log(' Seed completed successfully!');
          resolve();
        } catch (err) {
          reject(err);
        }
      })
      .on('error', (err) => {
        console.error('CSV parse error:', err);
        reject(err);
      });
  });

  process.exit(0);
};

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});