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

export const seedAdmin = () => {
    User.getAdmin()
        .then(user => {
            if (!user) {
                debug('seeding admin user')
                User.create({
                    username: 'admin',
                    password: process.env.ADMIN_PASSWORD,
                    admin: true
                })
            }
            else {
                debug('admin user already exists')
            }
        })
}