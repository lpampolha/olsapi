const jwt = require('jsonwebtoken')
const config = require('config')
const MSGS = require('../../messages')
const User = require('../models/user')

module.exports = function (req, res, next) {
    const jwtSecret = process.env.jwtSecret || config.get('jwtSecret')

    // Get token from header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: MSGS.WITHOUT_TOKEN });
    }

    try {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                return res.status(401).json({ msg: MSGS.INVALID_TOKEN });
            }
            req.user = decoded.user;
            next();
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: MSGS.GENERIC_ERROR });
    }
}

// module.exports = {
//     private: async (req,res, next) => {
//         if(!req.query.token && !req.body.token){
//             res.json({notallowed:true})
//             return
//         }

//         const token = ''
//         if (req.query.token){
//             token = req.query.token
//         }
//         if (req.body.token){
//             token=req.body.token
//         }
//         if (token == ''){
//             res.json({notallowed: true})
//             return
//         }

//         const user = User.findOne({ token })

//         if (!user){
//             res.json({notallowed: true})
//             return
//         }

//         next()
//     }
// }