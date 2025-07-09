import mongoose from "mongoose"
export const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL)
        console.log("mongoose connected")
    }
    catch(err){
       console.log({err})
    }
}
