const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

const Quotes = require('./quotes');

// Get all quotes
app.get('/quotes', (req, res) => {
  const quotes = Quotes.getAll();
  res.json({ quotes });
});

// Get a specific quote by ID
app.get('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const quote = Quotes.get(id);
  if (quote) {
    res.json({ quote });
  } else {
    res.status(404).json({ message: 'Quote not found' });
  }
});

// Create a new quote
app.post('/quotes', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }

  const quote = Quotes.create(text);
  res.status(201).json({ quote });
});

// Update an existing quote
app.put('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  const quote = Quotes.update(id, text);
  if (quote) {
    res.json({ quote });
  } else {
    res.status(404).json({ message: 'Quote not found' });
  }
});

// Delete a quote by ID
app.delete('/quotes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Quotes.delete(id)) {
    res.json({ message: 'Quote deleted' });
  } else {
    res.status(404).json({ message: 'Quote not found' });
  }
});

app.listen(port, () => {
  console.log(`Quotes App API listening at http://localhost:${port}`);
});
