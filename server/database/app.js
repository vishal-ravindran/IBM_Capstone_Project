/*jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const reviews_data = JSON.parse(fs.readFileSync("reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/", {'dbName': 'dealershipsDB'});

const Reviews = require('./review');
const Dealerships = require('./dealership');

try {
  Reviews.deleteMany({}).then(() => {
    Reviews.insertMany(reviews_data.reviews);
  });
  Dealerships.deleteMany({}).then(() => {
    Dealerships.insertMany(dealerships_data.dealerships); // Replaced array notation with dot notation
  });
  
} catch (error) {
  console.log(error);
  res.status(500).json({ error: 'Error fetching documents' });
}

// Express route to home
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
    try {
        const dealers = await Dealerships.find();
        res.json(dealers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching dealerships' });
    }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
    try {
        const dealers = await Dealerships.find({ state: req.params.state });
        res.json(dealers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching dealers' });
    }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
    try {
        const dealer = await Dealerships.find({ id: req.params.id });
        res.json(dealer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching dealer' });
    }
});

// Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort({ id: -1 });
  let new_id = documents[0].id + 1; // Replaced array notation with dot notation

  const review = new Reviews({
    id: new_id, // Replaced array notation with dot notation
    name: data.name, // Replaced array notation with dot notation
    dealership: data.dealership, // Replaced array notation with dot notation
    review: data.review, // Replaced array notation with dot notation
    purchase: data.purchase, // Replaced array notation with dot notation
    purchase_date: data.purchase_date, // Replaced array notation with dot notation
    car_make: data.car_make, // Replaced array notation with dot notation
    car_model: data.car_model, // Replaced array notation with dot notation
    car_year: data.car_year, // Replaced array notation with dot notation
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
