const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await User.deleteMany({});
    
    const admin = new User({
      username: 'admin',
      password: 'admin123',
      email: 'admin@school.com',
      fullName: 'System Admin',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin created: admin/admin123');
    
    const staff = new User({
      username: 'staff',
      password: 'staff123',
      email: 'staff@school.com',
      fullName: 'John Staff',
      role: 'staff'
    });
    await staff.save();
    console.log('✅ Staff created: staff/staff123');
    
    const student = new User({
      username: 'student',
      password: 'student123',
      email: 'student@school.com',
      fullName: 'John Student',
      role: 'student'
    });
    await student.save();
    console.log('✅ Student created: student/student123');
    
    console.log('\n🎉 All demo users created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createUsers();
