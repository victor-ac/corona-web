const express = require('express');
const router = express.Router();
const asyncHandler = require("express-async-handler");
const axios = require('axios');
const cache = require('../system/redis-cache');

/**
 * @api {get} /travel-ban
 * @apiName FetchTravelBan
 * @apiGroup TravelBan
 */
router.get('/', cache.route({
  expire: {
    '2xx': 300,
    'xxx': 1
  },
}), asyncHandler(async function (req, res, next) {
  try {
    const results = await axios.get('https://v2-api.sheety.co/3d29e508008ed3f47cc52f6aaf321f51/travelBan/summary');
    return res.json(results.data);
  }
  catch (error) {
    console.log('[/travel-ban] error', error);
    return res.json(error);
  }
}));

module.exports = router;
