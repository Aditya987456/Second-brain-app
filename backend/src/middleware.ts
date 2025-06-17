import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()
import jwt from "jsonwebtoken";
const Secret=process.env.JWT_SECRET

if (!Secret) {
    throw new Error("JWT_SECRET not defined in .env file");
}


export const UserMiddleware=(req:Request, res:Response, next:NextFunction)=>{

    const token=req.headers.authorization;

    if (!token) {
            res.status(403).json({
            message: 'Token not provided. Please login.'
        });
        return
    }


    try {
        const decodedId=jwt.verify(token, Secret)
        //@ts-ignore
        req.userId=decodedId.id
        next()
        
    } catch (err) {
            res.status(401).json({
            message:'invalid token or expired.',
            
        }) 
        return;
    }







}