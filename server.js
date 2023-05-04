
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Use CORS middleware to allow cross-origin requests
// Enable CORS for a specific origin
const corsOptions = {
  origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));

// Set up body parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));// recuperation donne envoyer dans le url
app.use(bodyParser.json());// recuperation donne envoyer dans le body format json(formulaire)

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/enchere', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import routes

const userRoutes = require('./routes/user.route');


app.use('/api/users', userRoutes);


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));