const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users (optional - be careful in production)
    // await User.deleteMany({});

    // Create Super Admin
    const superAdmin = await User.findOne({ email: 'superadmin@homehaven.com' });
    if (!superAdmin) {
      const superAdminUser = new User({
        name: 'Super Administrator',
        email: 'superadmin@homehaven.com',
        phone: '+254700000001',
        password: 'SuperAdmin123!', // Change this in production!
        role: 'super_admin'
      });
      await superAdminUser.save();
      console.log('Super Admin created successfully');
    } else {
      console.log('Super Admin already exists');
    }

    // Create Admin
    const admin = await User.findOne({ email: 'admin@homehaven.com' });
    if (!admin) {
      const adminUser = new User({
        name: 'Administrator',
        email: 'admin@homehaven.com',
        phone: '+254700000002',
        password: 'SysAdmin123!', // Change this in production!
        role: 'admin'
      });
      await adminUser.save();
      console.log('Admin created successfully');
    } else {
      console.log('Admin already exists');
    }

    // Create Developer Users
    const devUsers = [
      {
        name: 'Lead Developer',
        email: 'dev@homehaven.com',
        phone: '+254700000003',
        password: 'SysDevs123!',
        role: 'super_admin'
      },
      {
        name: 'Frontend Developer',
        email: 'frontend@homehaven.com',
        phone: '+254700000004',
        password: 'Frontend123!',
        role: 'admin'
      },
      {
        name: 'Backend Developer',
        email: 'backend@homehaven.com',
        phone: '+254700000005',
        password: 'Backend123!',
        role: 'admin'
      }
    ];

    for (const devUser of devUsers) {
      const existingDev = await User.findOne({ email: devUser.email });
      if (!existingDev) {
        const newDev = new User(devUser);
        await newDev.save();
        console.log(`Developer ${devUser.name} created successfully`);
      } else {
        console.log(`Developer ${devUser.name} already exists`);
      }
    }

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedUsers();