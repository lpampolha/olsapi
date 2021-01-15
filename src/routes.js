const express = require('express')
const router = express.Router()

const Auth = require('./middlewares/Auth')

const AuthValidator = require('./validators/AuthValidator') 

const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdsController = require('./controllers/AdsController')

router.get('/system', (req,res) => res.send(`Sistema OLS`))

router.get('/states', Auth.private, UserController.getStates)

router.post('/user/signin', AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

router.get('/user/me', UserController.info)
router.put('/user/me', UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', AdsController.addAction)
router.get('/ad/list', AdsController.getList)
router.get('/ad/item', AdsController.getItem)
router.post('/ad/:id', AdsController.editAction)

module.exports = router