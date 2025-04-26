import mongoose from "mongoose";



const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectionInstance.connection.host}`)

    }catch (error){
        console.log("MongoDB connection error",error);
        process.exit(1)

    }
}

export default connectDB