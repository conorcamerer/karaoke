const { Schema, model } = require('mongoose');

const songSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [false, 'Identifier (_id) field is required']
    },
    title: {
      type: String,
      required: [false, 'Title field (title) is required']
    },
    artist: {
      type: String,
      required: [false, 'Artist field (artist) is required']
    },
    date_uploaded: {
      type: Number,
      required: [false, 'Date uploaded (date_uploaded) field is required']
    },
    date_updated: {
      type: Number,
      required: [false, 'Date updated (date_updated) field is required']
    },
    bg_img: {
      type: String,
      required: [false, 'Background image (bg_img) field is required']
    },
    cover_art: {
      type: String,
      required: [false, 'Cover art (cover_art) field is required']
    },
    src: {
      type: String,
      required: [false, 'Audio source (src) field is required']
    },
    lyrics: {
      type: String,
      required: [false, 'Lyrics (lyrics) field is required']
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('songs', songSchema);
