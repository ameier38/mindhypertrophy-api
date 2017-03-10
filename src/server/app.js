import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import routes from '../routes'

const app =  express()

// enable body parsing to get info from request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// enable logging
app.use(morgan('common'))

// configure CORS
var corsOptions = {
   exposedHeaders: ['Content-Range'] 
}

// enable CORS - Cross Origin Resource Sharing
app.use(cors(corsOptions))

// mount all routes on /api path
app.use('/api', routes)

export default app