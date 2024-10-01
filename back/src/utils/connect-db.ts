import mongoose from "mongoose"

export const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('DB connected')
    }catch(err){
        console.error(err)
    }
}