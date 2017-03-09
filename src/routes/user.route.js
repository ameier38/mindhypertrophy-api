import express from 'express'
import range from 'express-range'
import { list, getById } from '../controllers/user.controller'

const router = express.Router()

router.use(range({accept: 'users'}))

router.route('/')
    /** GET /api/tags - Get list of users */
    .get(list)

router.route('/:userId')
    /** GET /api/users/[userId] - Get user by id */
    .get(getById)

export default router