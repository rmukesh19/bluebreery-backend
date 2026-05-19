const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // Support a much wider array of common, modern image types
  const filetypes = /jpg|jpeg|png|webp|gif|svg|jfif|bmp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only standard images are allowed (jpg, jpeg, png, webp, gif, svg, jfif, bmp)!'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer-specific error occurred
      return res.status(400).json({ message: `Multer upload error: ${err.message}` });
    } else if (err) {
      // Any other file type validation or system error occurred
      return res.status(400).json({ message: err.message || err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please select a valid image file to upload.' });
    }

    res.send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

module.exports = router;
