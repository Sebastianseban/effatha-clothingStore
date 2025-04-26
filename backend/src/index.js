
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./config.env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MONGODB Connection failed!",error);
    
})







