import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { appConfig } from './config/config.js';

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(cors({
    origin: appConfig.clientURI,
    credentials: true,
}))



import authRoutes from './routes/auth.routes.js'
import interviewRoutes from './routes/interview.routes.js'



app.use('/api/auth' , authRoutes)
app.use('/api/interview' , interviewRoutes)





export default app
