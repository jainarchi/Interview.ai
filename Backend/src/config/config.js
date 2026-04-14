import dotenv from 'dotenv';
dotenv.config();



if(! process.env.MONGO_URI){
    throw new Error('MONGO_URI is not defined in environment variables');
}


if(! process.env.JWT_SECRET){
    throw new Error('JWT_SECRET is not defined in environment variables');
}

if(! process.env.REDIS_HOST || 
    ! process.env.REDIS_PORT || 
    ! process.env.REDIS_PASSWORD || 
    ! process.env.REDIS_KEY_PREFIX){

    throw new Error('One or more Redis environment variables are not defined');
}

if(! process.env.GEMINI_API_KEY){
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}




export const appConfig = {
    port: process.env.PORT || 3000,
    clientURI: process.env.CLIENT_URI || 'http://localhost:5173',
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
    redisPassword: process.env.REDIS_PASSWORD,
    redisKeyPrefix: process.env.REDIS_KEY_PREFIX,
    geminiApiKey: process.env.GEMINI_API_KEY
}