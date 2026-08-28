const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
const evaluationRoutes = require('./routes/evaluationRoutes');
app.use('/api/evaluations', evaluationRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'DevRank V4 API' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devrank')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`DevRank Backend running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));