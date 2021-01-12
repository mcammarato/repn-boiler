const express = require('express');
const db = require('../../../../knexfile');

const router = express.Router();

// /api/v1/aw/getAddresses
router.get('/getAddresses', (req, res) => {
  db.select()
  .from('person.address')
  .limit(10)
  .then((data) => {
    res.send(data);
  });
});

// api/v1/aw/test
router.get('/test', (req, res) => {
  res.json({
    testProp: "test value"
  })
});

module.exports = router;
