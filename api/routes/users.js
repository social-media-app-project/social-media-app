const express = require('express');

const router = express.Router();

/* GET users listing. */

/**
 * TEST PROTECTED ROUTE
 */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

module.exports = router;
