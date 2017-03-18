import jwt from 'jsonwebtoken'
import User from '../models/user.model'

const debug = require('debug')('api:controllers:user.controller')

export const list = (req, res, next) => {
    debug("list called")
    User.list()
        .then(users => {
            res.range({length: users.length})
            res.json(users)
        })
        .catch(e => next(e))
}

export const getById = (req, res, next) => {
    debug("getById called")
    User.getById(req.params.userId)
        .then(user => res.json(user))
        .catch(e => next(e))
}

export const login = (req, res) => {
    User.findOne({username: req.body.username})
        .exec()
        .then(user => {
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' })
            }
            else {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Incorrect password.' })
                }
                else {
                    let token = jwt.sign(user, process.env.APP_SECRET, {
                        expiresIn: 60*60*24 // expires in 24 hours
                    })
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    })
                }
            }
        })
}
