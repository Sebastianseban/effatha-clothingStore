import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import

import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import productRouter from "./routes/product.routes.js"



app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/product",productRouter)

export { app }