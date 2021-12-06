'use strict';

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const multer = require('multer');

const {
  get_collection_list,
  get_collection,
  get_imageIn_collection,
  update_collection,
} = require('../controllers/collectionController');

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ dest: './uploads/', fileFilter });

router.route('/collection').get(get_collection_list);

router
  .route('/collection/:title')
  .get(get_collection)
  .put(upload.single('image'), body('image'), update_collection);

router.get('/collection/:title/:imageId', get_imageIn_collection);

module.exports = router;
