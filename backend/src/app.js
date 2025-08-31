import express from "express";
import cookieParser  from "cookie-parser"
import cors  from "cors"

const app = express();

 

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true  , limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// route Import 
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.route.js"
import product from "./routes/product.route.js"
import { errorHandler } from "./middlewares/errorHandler.js";


 

app.use("/app/v1/user" , userRouter)
app.use("/app/v1/category", categoryRouter)
app.use("/app/v1/product", product)
// app.use("/app")

app.use(errorHandler); // ⬅️ Always last middleware

export default app