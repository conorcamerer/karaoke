const express = require('express');

const {
  getDataFromSongTitle,
  getDataFromSongId,
  getTotalSongs
} = require('../controllers/song_controller');

const router = express.Router();

router
  .get('/getDataFromSongTitle/:song_title', getDataFromSongTitle)
  .get('/getDataFromSongId/:song_id', getDataFromSongId)
  .get('/getTotalSongs', getTotalSongs);

module.exports = router;
