const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Auth = require('../middlewares/auth')
const file = require('../middlewares/file')
const MSGS = require('../../messages')
const Categories = require('../models/categories')

// @route    GET /user
// @desc     LIST user
// @access   Private
router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find({})
        res.json(categories)
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
        const categories = await Categories.findOne({ _id: id })
        if (categories) {
            res.json(categories)
        } else {
            res.status(404).send({ "error": MSGS.USER404 })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR })
    }
})

router.post('/', [
    check('name', 'Categoria inválida!').not().isEmpty(),
],async (req, res, next) => {
    try {
        let  { name, icon, slug } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            let categories = new Categories({ name, icon, slug })
            await categories.save()
            if (categories.id) {
                res.json(categories);
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
    }
})

module.exports = router