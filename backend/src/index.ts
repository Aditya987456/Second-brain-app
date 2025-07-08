//npm run build & npm run start


import express, { Request, Response } from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import { ConnectDB, ContentModel, linkModel, UserModel } from "./db"
import { any, z } from "zod"
import bcrypt from 'bcrypt'
import { error } from "console"
const saltrounds=5;
import dotenv from 'dotenv'
import { UserMiddleware } from "./middleware";
import { random } from "./utils";
dotenv.config()  // to access all the .env file secrets code or link.
import cors from "cors"

const app=express()
app.use(express.json())
app.use(cors())


ConnectDB();









app.use(express.json());



//----------------------------    signup     --------------------------
//@ts-ignore
app.post('/api/v1/signup', async (req: Request, res: Response) => {

    try {

        //#1: validate input entered by users.-> using Zod and Regex for password.
        const inputSchema=z.object({
            emailID:z.string().email(),
            username:z.string().min(3).max(50),

            password:z.string().min(8, "Password must be at least 8 characters long")
                    .regex(/[a-z]/, "Password must include at least one lowercase letter")
                    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
                    .regex(/\d/, "Password must include at least one number")
                    .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character")
        })

        //#2: checking input using zod's safe parse...
        const isInputCorrect=inputSchema.safeParse(req.body)
        if(!isInputCorrect.success){
            return res.status(411).json({
                message:'Invalid input formate.',
                error:isInputCorrect.error
            })
        }


        const { emailID, password, username }=req.body;

        //#3: checking user is unique or not here also before mongodb say that we catch in status code 11000.
        const ExistingUser=await UserModel.findOne( {emailID} )
        if(ExistingUser){
            return res.status(403).json({
                message:'User already exist, Try with another EmailId'
            })
        }


        //#4:  bcrypting the password.
        const hashedPassword=await bcrypt.hash(password, saltrounds)



        //#5: now valid things are getting stored in the db.        
        await UserModel.create({
            emailID,
            password:hashedPassword,
            username
        })


        res.status(200).json({
            message:'you have successfully signed up.'
        })
       
    

    } catch (error:any) {
        if(error.code==11000){
            return res.status(403).json({
                message:'user already exist'
            })
        }
        return res.status(500).json({
            message:'something went wrong, Error in signing up'
        })   
    }

});












//-----------------------------   signin   -------------------------------
//@ts-ignore
app.post('/api/v1/signin', async (req:Request, res:Response)=>{

   try {

     //#1: validate input entered by users.-> using Zod and Regex for password.
        const inputSchema=z.object({
            emailID:z.string().email(),
            // username:z.string().min(3).max(4),   //--no need in signing in

            password:z.string().min(8, "Password must be at least 8 characters long")
                    .regex(/[a-z]/, "Password must include at least one lowercase letter")
                    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
                    .regex(/\d/, "Password must include at least one number")
                    .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character")
        })

        //#2: checking input using zod's safe parse...
        const isInputCorrect=inputSchema.safeParse(req.body)
        if(!isInputCorrect.success){
            return res.status(411).json({
                message:'Invalid input formate.',
                error:isInputCorrect.error
            })
        }



         const {password, emailID }=req.body

        //#3:  find the matching emailID becz gmail is unique thing
        const findUserGmail=await UserModel.findOne({
            emailID:emailID
        })

        if(!findUserGmail){
            return res.status(403).json({
                message:'Incorrect ceredentials -> email'
            })
        }


        //#4:  if email is found then find out the password.
        const passwordCheck=await bcrypt.compare(password, findUserGmail.password)
        if(!passwordCheck){
            return res.status(403).json({
                message:'Incorrect ceredentials -> password'
            })
        }


        //#5:  now generate token by using uniques that is _id  bydefault by MongoDB.
        const Secret=process.env.JWT_SECRET
        //@ts-ignore
        const token=jwt.sign({id:findUserGmail._id}, Secret)

        //#6: send token after signin
        res.status(200).json({
            message:'Signed in successfully',
            Token:token
        })

 
   } catch (error) {
        res.status(500).json({
            message:'Error in signining in.',
            Error:error
        })
   }
})







//----------------------------------  add new content  ---------------------

app.post('/api/v1/content', UserMiddleware ,async (req:Request, res:Response )=>{
    try {
        
        const { title, link, type, tags }= req.body


        await ContentModel.create({
            link,
            type,
            title,
            //@ts-ignore
            userId:req.userId,
            tags: []
        })

         res.status(200).json({
            message:'successfully added content'
        })



    } catch (error) {
        res.status(500).json({
            message:'error in adding content.',
            Error:error
        })
        
    }


})






//-------------------------------------  retrieve content ------------------
app.get('/api/v1/content', UserMiddleware, async (req, res)=>{
//@ts-ignore
    const userId=req.userId
    const contents= await ContentModel.find({
        userId:userId
    }).populate("userId", "emailID username")   // select only or show only emailid and username.

    res.json({
        contents
    })

    
})






//---------------------------------  delete content  ----------------------------------------
app.delete('/api/v1/content', UserMiddleware, async (req, res)=>{
    const { contentId }=req.body
    await ContentModel.deleteOne({
        _id:contentId,
      
       
    })


    res.status(200).json({
        message:'successfully deleted content'
    })

})







//--------------------------------  share content  -------------------------------------

app.post('/api/v1/brain/share', UserMiddleware, async (req:Request, res:Response)=>{

    
    try {
        const share=req.body.share

        if(share){

        const alreadylink=await linkModel.findOne({
            //@ts-ignore
            userId:req.userId
        });


        if(alreadylink){
            res.json({ hash:alreadylink.hash })
            return;
        }


        const hashVal=random(20)
        await linkModel.create({
            //@ts-ignore
            userId:req.userId,
            hash:hashVal
        })

        res.json({ hash:hashVal })
        return;


        }else{

        await linkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        });

        res.json({
            message:'successfully removed the link'});
            return; 

        }

        
    } catch(error){
        console.error("Error in /brain/share:", error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;

        }


    })





        









//----------------------------------- shared contents... ---------------------------------

app.get('/api/v1/brain/:sharelink', async (req, res)=>{
    
    const hash = req.params.sharelink;

    const link = await linkModel.findOne({
        hash
    })


    if(!link){
        res.status(411).json({
            message:"sorry incorrect inputs."
        })
        return;
    }

    const content = await ContentModel.find({
       //@ts-ignore
        userId:link.userId
    })

    const user=await UserModel.findOne({
        //@ts-ignore
        userId:link.userId
    })


    res.json({
        username:user?.username,
        content:content
    })



})








app.listen(3000, ()=>{
    console.log(`server running on the port 3000`)
})

