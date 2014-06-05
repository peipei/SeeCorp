

// Database configs in db.js

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test:27018');

// Error handler
mongoose.connection.on('error', function (err) {
  console.log(err)
});

// Connection established
mongoose.connection.once('open', function () {
  console.log('Cooperation database connection established');
});

// Require models schema
require('./models/Coop');