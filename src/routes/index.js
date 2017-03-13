import express from 'express'
import cardRouter from './card.route'
import tagRouter from './tag.route'
import userRouter from './user.route'
import errorHandler from 'api-error-handler'

const router = express.Router()

// show default api route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to mindhypertrophy api!' })
})

// add api routes
router.use('/cards', cardRouter)
router.use('/tags', tagRouter)
router.use('/users', userRouter)

// catch api errors
router.use(errorHandler())

export default router
