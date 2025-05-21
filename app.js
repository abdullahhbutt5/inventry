const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Item = require('./models/Item');
const path = require('path');

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect('mongodb+srv://abdullahbutt5:fGiMKi9OnPugMKmr@abdullah.6wwxz.mongodb.net/inventory')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const items = await Item.find();
  res.render('index', { items });
});

app.post('/add', async (req, res) => {
  const { name, quantity, price } = req.body;
  await Item.create({ name, quantity, price });
  res.redirect('/');
});

app.post('/edit/:id', async (req, res) => {
  const { name, quantity, price } = req.body;
  await Item.findByIdAndUpdate(req.params.id, { name, quantity, price });
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
