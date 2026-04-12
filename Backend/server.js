import app from './src/app.js'
import connectDB from './src/config/db.js'
import { appConfig } from './src/config/config.js'










const startServer = async () => {
    try {
        await connectDB()    
        app.listen(appConfig.port, () => {
            console.log(`Server is running on port ${appConfig.port}`)
        })
    } catch (error) {
        console.log(error)
    }
}   


startServer()