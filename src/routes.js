const express = require('express')
const router = express.Router()

const Auth = require('./middlewares/Auth')

const AuthValidator = require('./validators/AuthValidator')
const UserValidator = require('./validators/UserValidator') 

const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdsController = require('./controllers/AdsController')

router.get('/states', UserController.getStates)

router.post('/user/signin', AuthValidator.signin, AuthController.signin)
router.post('/user/signup', AuthValidator.signup, AuthController.signup)

router.get('/user/me', Auth.private, UserController.info)
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction)

router.get('/categories', AdsController.getCategories)

router.post('/ad/add', AdsController.addAction)
router.get('/ad/list', AdsController.getList)
router.get('/ad/item/:id', AdsController.getItem)
router.post('/ad/:id', AdsController.editAction)

module.exports = router