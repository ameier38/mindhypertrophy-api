import express from 'express'
import cardRouter from './cards'
import tagRouter from './tags'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' })
})

router.use('/cards', cardRouter)
router.use('/tags', tagRouter)

export default router
