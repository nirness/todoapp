const mongoose = require('mongoose')

module.exports = async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Database Connected".yellow.bold.underline);
  } catch (error) {
    console.error(error)
    process.exit()
  }
};
