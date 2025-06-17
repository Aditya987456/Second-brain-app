import mongoose, { Model, Schema } from "mongoose"
import dotenv from 'dotenv'


dotenv.config()


//--------------------    MongoDB connection ---------------------

const mongourl=process.env.DATABASE_URL;

if (!mongourl) {
  throw new Error('DATABASE_URL is not defined in the .env file');
}

export const ConnectDB=async ()=>{
    try {
        await mongoose.connect(mongourl)
        console.log('connected to database.')
    } catch (error) {
         console.error('Errorsss connecting to MongoDB! :', error);
    }
}




//---------------------  user schema   ---------------------
const UserSchema=new Schema({
    emailID:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    username:{type:String, unique:false}
})

export const UserModel=mongoose.model('user', UserSchema);





//----------------------  content schema -------------------------

const ContentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, ref:'user', required:true}
}
)

export const ContentModel=mongoose.model('content', ContentSchema)

