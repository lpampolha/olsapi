const express = require('express')
const router = express.Router()
const config = require('config')
const User = require('../models/user')
const Auth = require('../middlewares/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const MSGS = require('../../messages')
const { check, validationResult } = require('express-validator')

// @route    POST /auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/',[
    check('email', MSGS.VALID_EMAIL).isEmail(),
    check('password', MSGS.REQUIRED_PASSWORD).exists()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const jwtSecret = process.env.jwtSecret || config.get('jwtSecret')
    const { email, password } = req.body
    try{
        let user = await User.findOne({ email }).select('id password email name')
        if (!user) {
            return res.status(404).json({ errors: [{ msg: MSGS.USER404 }] })
        }else{
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: MSGS.PASSWORD_INVALID }] });
            }else{
                const payload = {
                    user: {
                      id: user.id,
                      name: user.name
                    }
                }
                jwt.sign( payload, jwtSecret, { expiresIn: '5 days' },
                    (err, token) => {
                      if (err) throw err;
                      payload.token = token
                      res.json(payload);
                    }
                  );
            }
        }

    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }

})

module.exports = router