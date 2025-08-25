const express = require('express')
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware")
const createPostController = require("../controllers/post.controller"); // ✅ Correct

const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() })

router.post('/',
  authMiddleware, 
  upload.single("image"),
  createPostController
)

router.get('/', authMiddleware, (req, res) => {
  // You can return a simple message
  return res.status(200).json({ message: `Authenticated as ${req.user.username}` });
});

module.exports = router;