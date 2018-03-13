const express = require('express');
const router = express.Router();

const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('/root ',__dirname);
  const file = path.join(__dirname,'..', '..','dist','views','login.html');
  res.sendFile(file);
});

router.get('/signup', function(req, res, next) {
  const file = path.join(__dirname,'..', '..','dist','views','signUp.html');
  res.sendFile(file);
});

router.get('/profile', function(req, res, next) {
  const file = path.join(__dirname,'..', '..','dist','views','profile.html');
  res.sendFile(file);
});

module.exports = router;
