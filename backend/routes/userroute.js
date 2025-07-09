import express from "express"
import { createuser, deleteuser, getallusers, getoneuser, updateuser } from "../controllers/usercontroller.js";
export const router=express.Router()
router.post("/createuser",createuser)
router.delete("/deleteuser/:id",deleteuser)
router.get("/getoneuser/:id",getoneuser)
router.get("/getallusers",getallusers)
router.put("/updateuser/:id",updateuser)