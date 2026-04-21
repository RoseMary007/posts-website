import express from "express";
import cors from "cors";


const app=express(); 


app.use(express.json());
app.use(cors());
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.router.js";


app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

export default app;