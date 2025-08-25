const { registerController, loginController, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const express = require('express')

const router = express.Router();

// Check if user is authenticated
router.get('/check', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "User is authenticated",
    user: {
      id: req.user._id,
      username: req.user.username
    }
  })
})

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;