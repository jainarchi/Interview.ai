import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


import authRoutes from './routes/auth.routes.js'

app.use('/api/auth' , authRoutes)



export default app
