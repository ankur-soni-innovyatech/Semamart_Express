const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c0s1omw.mongodb.net/Cluster0`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));
