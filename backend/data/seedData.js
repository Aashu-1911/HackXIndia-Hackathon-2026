import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HealthIncident from '../models/HealthIncident.js';
import SanitationComplaint from '../models/SanitationComplaint.js';
import EnvironmentalData from '../models/EnvironmentalData.js';

// Load environment variables
dotenv.config();

/**
 * Seed Data Script
 * Populates the database with sample data for Pune city
 * Usage: node data/seedData.js
 */

// Sample Health Incidents for Pune
const healthIncidents = [
  {
    diseaseType: 'Dengue',
    area: 'Kothrud',
    location: { lat: 18.5074, lng: 73.8077 },
    severity: 'high',
    reportedDate: new Date('2026-01-15')
  },
  {
    diseaseType: 'Malaria',
    area: 'Hadapsar',
    location: { lat: 18.5089, lng: 73.9260 },
    severity: 'medium',
    reportedDate: new Date('2026-01-12')
  },
  {
    diseaseType: 'Covid',
    area: 'Shivajinagar',
    location: { lat: 18.5304, lng: 73.8442 },
    severity: 'low',
    reportedDate: new Date('2026-01-18')
  },
  {
    diseaseType: 'Cholera',
    area: 'Pimpri',
    location: { lat: 18.6298, lng: 73.7997 },
    severity: 'high',
    reportedDate: new Date('2026-01-10')
  },
  {
    diseaseType: 'Other',
    area: 'Wakad',
    location: { lat: 18.5979, lng: 73.7696 },
    severity: 'medium',
    reportedDate: new Date('2026-01-14')
  }
];

// Sample Sanitation Complaints for Pune
const sanitationComplaints = [
  {
    category: 'Garbage Overflow',
    area: 'Koregaon Park',
    location: { lat: 18.5362, lng: 73.8958 },
    status: 'open',
    reportedDate: new Date('2026-01-19')
  },
  {
    category: 'Drainage',
    area: 'Deccan Gymkhana',
    location: { lat: 18.5204, lng: 73.8567 },
    status: 'in-progress',
    reportedDate: new Date('2026-01-16')
  },
  {
    category: 'Water Logging',
    area: 'Baner',
    location: { lat: 18.5598, lng: 73.7812 },
    status: 'resolved',
    reportedDate: new Date('2026-01-08')
  },
  {
    category: 'Public Toilet',
    area: 'Swargate',
    location: { lat: 18.4994, lng: 73.8553 },
    status: 'open',
    reportedDate: new Date('2026-01-17')
  },
  {
    category: 'Garbage Overflow',
    area: 'Viman Nagar',
    location: { lat: 18.5679, lng: 73.9143 },
    status: 'in-progress',
    reportedDate: new Date('2026-01-13')
  }
];

// Sample Environmental Data for Pune
const environmentalData = [
  {
    type: 'air',
    area: 'Pune Station',
    location: { lat: 18.5314, lng: 73.8740 },
    pm25: 85.5,
    pm10: 120.3,
    recordedDate: new Date('2026-01-20')
  },
  {
    type: 'air',
    area: 'Katraj',
    location: { lat: 18.4488, lng: 73.8672 },
    pm25: 95.2,
    pm10: 135.7,
    recordedDate: new Date('2026-01-20')
  },
  {
    type: 'water',
    area: 'Mula River',
    location: { lat: 18.5229, lng: 73.8672 },
    waterQualityIndex: 62,
    recordedDate: new Date('2026-01-19')
  },
  {
    type: 'air',
    area: 'Aundh',
    location: { lat: 18.5590, lng: 73.8078 },
    pm25: 72.8,
    pm10: 110.5,
    recordedDate: new Date('2026-01-20')
  },
  {
    type: 'water',
    area: 'Mutha River',
    location: { lat: 18.5196, lng: 73.8553 },
    waterQualityIndex: 55,
    recordedDate: new Date('2026-01-18')
  }
];

/**
 * Connect to MongoDB and seed data
 */
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await HealthIncident.deleteMany({});
    await SanitationComplaint.deleteMany({});
    await EnvironmentalData.deleteMany({});
    console.log('✓ Existing data cleared');

    // Insert Health Incidents
    console.log('\n📊 Inserting Health Incidents...');
    const insertedHealthIncidents = await HealthIncident.insertMany(healthIncidents);
    console.log(`✓ Inserted ${insertedHealthIncidents.length} health incidents`);

    // Insert Sanitation Complaints
    console.log('\n🚰 Inserting Sanitation Complaints...');
    const insertedComplaints = await SanitationComplaint.insertMany(sanitationComplaints);
    console.log(`✓ Inserted ${insertedComplaints.length} sanitation complaints`);

    // Insert Environmental Data
    console.log('\n🌍 Inserting Environmental Data...');
    const insertedEnvData = await EnvironmentalData.insertMany(environmentalData);
    console.log(`✓ Inserted ${insertedEnvData.length} environmental data entries`);

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY');
    console.log('='.repeat(50));
    console.log(`\nTotal Records Inserted:`);
    console.log(`  - Health Incidents: ${insertedHealthIncidents.length}`);
    console.log(`  - Sanitation Complaints: ${insertedComplaints.length}`);
    console.log(`  - Environmental Data: ${insertedEnvData.length}`);
    console.log(`  - TOTAL: ${insertedHealthIncidents.length + insertedComplaints.length + insertedEnvData.length}`);
    console.log('\n📍 All data is for Pune city with realistic coordinates');
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
