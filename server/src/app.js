import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import compression from "compression";


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true

}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(compression());




//routes import

import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import productRouter from "./routes/product.routes.js"
import addressRoutes from "./routes/addresses.route.js";
import cartRoutes from "./routes/cart.routes.js"
import orderRoutes from "./routes/order.routes.js"



app.use("/api/v1/users",userRouter)
app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/users/addresses", addressRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order",orderRoutes)

export { app }