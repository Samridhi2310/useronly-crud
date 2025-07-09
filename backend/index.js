import express from  "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectdb } from "./lib/db.js";
import { router } from "./routes/userroute.js";
dotenv.config();
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api",router)
app.get("/",(req,res)=>
res.send("server start")
)
connectdb();
app.listen(5000,()=>
   console.log("http://localhost:5000")
)