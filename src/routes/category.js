const express = require('express')
const router = express.Router()
const MSGS = require('../../messages')
const Category = require('../models/category')

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', async (req, res) => {
    try {
        const category = await Category.find({})
        res.json(category)
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
        const category = await Category.findOne({ _id: id })
        if (category) {
            res.json(category)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

module.exports = router