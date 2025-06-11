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

