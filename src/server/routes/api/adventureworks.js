const express = require('express');
const db = require('../../../../knexfile');

const router = express.Router();

// /api/v1/getAddresses
router.get('/getAddresses', (req, res) => {
  db.select()
  .from('person.address')
  .limit(10)
  .then((data) => {
    res.send(data);
  });
});

module.exports = router;
