import { Post } from "../models/post.model.js";
//create a post
const createpost=async(req,res)=>{
    try{
        const {name,description,age}=req.body;
        if(!name || !description || !age){
            return res.status(400).json({message:"ALL FIELDS ARE REQUIRED"});
        }
        const newpost=await Post.create({name,description,age});
        return res.status(201).json(newpost);
    } catch (error) {
  console.log("🔥 FULL ERROR:", error);   // terminal
  res.status(500).json({
    message: "INTERNAL SERVER ERROR",
    error: error.message || error.toString()
  });
}
}

const getPosts=async(req,res)=>{
    try {
        const posts=await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.log("🔥 FULL ERROR:", error);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message || error.toString()
        });
    }
}

const updatePost=async(req,res)=>{
    try {
        if(Object.keys(req.body).length===0){
            return res.status(400).json({message:"no data provided"});
        }
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"post not found"});
        }
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,req.body,{new:true});

        return res.status(200).json({message:"post updated successfully",updatedPost});
    } catch (error) {
        console.log("🔥 FULL ERROR:", error);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message || error.toString()
        });
    }
}


const deletePost=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message:"post not found"});
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({message:"post deleted successfully"});
    } catch (error) {
        console.log("🔥 FULL ERROR:", error);
        res.status(500).json({
            message: "INTERNAL SERVER ERROR",
            error: error.message || error.toString()
        });
    }
}

export{createpost,getPosts,updatePost,deletePost};