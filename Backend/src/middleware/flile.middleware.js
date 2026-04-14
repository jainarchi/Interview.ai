import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 }
})



const uploadMiddleware = (req, res, next) => {

  upload.single("resume")(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File too large, maximum size is 3MB"
        });
      }
      return res.status(500).json({ message: err.message });
    }


    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required"
      })
    }

    const isPdf =
      req.file.mimetype === "application/pdf" &&
      req.file.originalname.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      return res.status(400).json({
        message: "Only PDF files are allowed"
      });
    }

    next();
  });
};

export { uploadMiddleware }