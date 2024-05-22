const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/event';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Define a schema and model for the records
const recordSchema = new mongoose.Schema({
    action: String,
    timestamp: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);

// Define API endpoints
app.post('/api/add-to-cart', async (req, res) => {
    const record = new Record({ action: 'Add to Cart' });
    await record.save();
    res.send({ message: 'Add to Cart action recorded' });
});

app.post('/api/buy-now', async (req, res) => {
    const record = new Record({ action: 'Buy Now' });
    await record.save();
    res.send({ message: 'Buy Now action recorded' });
});

app.post('/api/check-out', async (req, res) => {
    const record = new Record({ action: 'Check-out' });
    await record.save();
    res.send({ message: 'Check-out action recorded' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
