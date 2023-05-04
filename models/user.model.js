const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  prenom: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  role: {
    type: String,
    enum: ['client', 'user', 'admin'],
    default: 'client'
  },
  telephone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  adresse: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



const User = mongoose.model('User', UserSchema);

module.exports = User;