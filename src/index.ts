//npm run build & npm run start


import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { ConnectDB, UserModel } from "./db"

const app=express()
app.use(express.json())
ConnectDB();

//----------------------------    signup     --------------------------
app.post('/api/v1/signup', async (req, res)=>{

    const { username, password }=req.body;
    //validations... try and catch
    await UserModel.create({
        username,password
    })

    res.status(200).json({
        message:'you have successfully signed up.'
    })
})


app.post('/api/v1/signin', (req, res)=>{

})













app.listen(3000, ()=>{
    console.log(`server running on the port 3000`)
})

