import express from 'express'
import cardRouter from './card.route'
import tagRouter from './tag.route'
import errorHandler from 'api-error-handler'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to mindhypertrophy api!' })
})

router.use('/cards', cardRouter)
router.use('/tags', tagRouter)

router.use(errorHandler())

export default router
