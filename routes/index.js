const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')

router.post('/imgur/upload', (req, res) => controllers.uploadToImgur(req, res))

module.exports = router