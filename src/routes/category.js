const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Auth = require('../middlewares/auth')
const file = require('../middlewares/file')
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

router.post('/', [
    check('name', 'Categoria inválida!').not().isEmpty(),
],async (req, res, next) => {
    try {
        let  { name, icon, slug } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            let category = new Category({ name, icon, slug })
            await category.save()
            if (category.id) {
                res.json(category);
            }
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send({ "error": MSGS.GENERIC_ERROR  })
    }
})

// router.post('/', file, async (req, res, next) => {
//     try {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() })
//         } else {
//             req.body = `category/${req.body}`
//             let category = new Category(req.body)
//             product.last_modified_by = req.user.id
//             await category.save()
//             if (category.id) {
//                 const BUCKET_PUBLIC_PATH = process.env.BUCKET_PUBLIC_PATH || config.get('BUCKET_PUBLIC_PATH')
//                 category.icon = `${BUCKET_PUBLIC_PATH}${category.icon}`
//                 res.json(category)
//             }
//         }
//     } catch (err) {
//         console.error(err.message)
//         res.status(500).send({ "error": MSGS.GENERIC_ERROR })
//     }
// })

module.exports = router