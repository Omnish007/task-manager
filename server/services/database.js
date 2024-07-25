const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  writeConcern: {
    w: 'majority',
    wtimeout: 5000,
  }
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error while connecting to MongoDB", error));
  
  module.exports = mongoose;