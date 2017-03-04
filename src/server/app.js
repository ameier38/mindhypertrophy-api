import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import routes from '../routes'

const app =  express()

// enable logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mount all routes on /api path
app.use('/api', routes)

export default app