'use strict';

const Song = require('../models/song_schema');

const getDataFromSongTitle = (req, res) => {
  Song.find({ title: {$regex: req.params.song_title, $options: "i"} })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const getDataFromSongId = (req, res) => {
  if (new RegExp(/^[a-fA-F0-9]{24}$/).test(req.params.song_id) === false) {
    res.status(400).send('Error 400');
    return;
  }
  Song.find({ _id: req.params.song_id })
    .then((data) => {
      if (data=='') {
        res.status(404).send('Error 404');
      } else if (data)
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getTotalSongs = (req, res) => {
  Song.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};


module.exports = {
  getDataFromSongTitle,
  getDataFromSongId,
  getTotalSongs
};
