const express = require('express')
const router = express.Router()
const config = require('../../config/db')
const User = require('../models/user')
const Auth = require('../middlewares/auth')
const bcrypt = require('bcrypt')
const MSGS = require('../../messages')
const { check, validationResult } = require('express-validator')

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', async (req, res) => {
    try {
        const user = await User.find({})
        res.json(user)
    } catch (err) {
        console.error(err.messages)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    GET /user/:userId
// @desc     DETAIL user
// @access   Private
router.get('/:userId', Auth, async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await User.findOne({ _id: id })
        if (user) {
            res.json(user)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.messages)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    POST /user
// @desc     CREATE user
// @access   Private
router.post('/', Auth, [
    check('name').not().isEmpty(),
    check('email', 'Por favor, insira um e-mail válido').isEmail(),
    check('password', 'Por favor, insira uma senha de, pelo menos, 6 caracteres').isLength({ min: 6 })
], async (req, res, next) => {
    try {
        let { name, email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            let user = new User({ name, email, password })

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)

            await user.save()
            if (user.id) {
                res.json(user)
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    PATCH /user/:userId
// @desc     PARTIAL EDIT user
// @access   Public
router.patch('/:userId', Auth, async (request, res, next) => {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            res.status(400).send({ errors: errors.array() })
            return
        }
        const id = request.params.userId
        const salt = await bcrypt.genSalt(10)

        let bodyRequest = request.body

        if (bodyRequest.password) {
            bodyRequest.password = await bcrypt.hash(bodyRequest.password, salt)
        }
        const update = { $set: bodyRequest }
        const user = await User.findByIdAndUpdate(id, update, { new: true })
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    DELETE /user/:userId
// @desc     DELETE user
// @access   Public
router.delete('/:userId', Auth, async (req, res, next) => {
    try {
        const id = req.params.userId
        const user = await User.findOneAndDelete({ _id: id })
        if (user) {
            res.json(user)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

//router.post('/user/signin', Auth.signin)
//router.post('/user/signup', Auth.signup)
//router.get('/user/me', User.info)
//router.patch('/user/me', User.editAction)

module.exports = router