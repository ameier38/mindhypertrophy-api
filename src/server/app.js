import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import routes from '../routes'

const app =  express()

// enable logging
app.use(morgan('common'))

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount all routes on /api path
app.use('/api', routes)

export default app