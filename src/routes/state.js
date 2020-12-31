const express = require('express')
const router = express.Router()
const Auth = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')
const MSGS = require('../../messages')
const State = require('../models/state')

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', async (req, res) => {
    try {
        const state = await State.find({})
        res.json(state)
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    GET /user/:userId
// @desc     DETAIL user
// @access   Private

router.get('/:userId', async (req, res) => {
    try {
        const id = req.params.userId
        const state = await State.findOne({ _id: id })
        if (state) {
            res.json(state)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

// @route    POST /user
// @desc     CREATE user
// @access   Private
router.post('/', [
    check('name', 'Estado inválido!').not().isEmpty(),
],async (req, res, next) => {
    try {
        let  { name } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            let state = new State({ name})
            await state.save()
            if (state.id) {
                res.json(state);
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
    }
})

module.exports = router