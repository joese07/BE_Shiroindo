const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, res, cb) => {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage });

const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "no file uploaded",
    });
  }

  res.json({ filePath: `/uploads/${req.file.filename}` });
};

module.exports = { uploadImage, multerUpload: upload.single("image") };
