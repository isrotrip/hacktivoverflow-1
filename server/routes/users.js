const express = require('express')
const router = express.Router()
const UserController = require("../controllers/userController")
const { authenticate } = require('../middlewares/verify')

router.get('/verify', authenticate, UserController.verify)
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.put('/watchTag', authenticate, UserController.watchTags)

module.exports = router
