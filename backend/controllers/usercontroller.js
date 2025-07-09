import User from "../models/userschema.js";

export const createuser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      return res
        .status(200)
        .json({ message: "user created successfully", user: user });
    }
    return res.status(400).json({ message: "user not created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteuser = await User.findByIdAndDelete(id);
    if (!deleteuser) {
      return res.status(400).json({ message: "user not find" });
    }

    return res.status(201).json({message:"user deleted successfully"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
};

export const getoneuser=async(req,res)=>{
    try{
        const {id}=req.params
        const user=await User.findById(id)
        if(user)
        {
            return res.status(200).json({message:"user",user:user})
        }
        return res.status(400).json({message:"user not found"})
    }
    catch(err){
        return res.status(500).json({message:"server error"})
    }
}


export const getallusers=async(req,res)=>{
    try{
        const user= await User.find()
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
         return res.status(200).json({message:"users" ,user:user})
    }catch(err)
    {
       return res.status(500).json({message:"server error"})  
    }
}


export const updateuser=async(req,res)=>{
    try{
        const {id}=req.params
        const{name,email,password}=req.body
        const updateuser=await User.findByIdAndUpdate(id,{name,email,password},{new:true})
        if(updateuser)
        {
          return res.status(200).json({message:"user updated successfully",user:updateuser})  
        }
        return res.status(400).json({message:"user not found"})
    }catch(err){
    console.log(err)
       return res.status(500).json({message:"server error"})   
    }
}