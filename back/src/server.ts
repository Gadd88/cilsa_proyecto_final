import express from 'express'
import cors from 'cors'
import router from './routes/routes'
import * as dotenv from 'dotenv'
import { ConnectDB } from './utils/connect-db'

dotenv.config()

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api', router)
//routes

const initServer = () => {
    try{
        ConnectDB()
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.error(err)
    }
}

//server
initServer()