const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Multer file filter (optional, to only allow images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Single file upload
const uploadSingle = multer({
  storage,
  fileFilter,
});

// Multiple file upload
const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { files: 5 }, // max 5 images
}).array('images', 5);

module.exports = {
  uploadSingle,
  uploadMultiple,
};
