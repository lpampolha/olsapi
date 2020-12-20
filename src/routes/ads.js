const express = require('express')
const router = express.Router()
const MSGS = require('../../messages')
const ADS = require('../models/ads')

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', async (req, res) => {
    try {
        const ads = await ADS.find({})
        res.json(ads)
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
        const ads = await ADS.findOne({ _id: id })
        if (ads) {
            res.json(ads)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

module.exports = router