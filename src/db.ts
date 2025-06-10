import mongoose, { Model, Schema } from "mongoose"






//--------------------    MongoDB connection ---------------------

export const ConnectDB=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://admin:844126123Mm@cluster0.viafw.mongodb.net/Second-brAIn')
        console.log('connected to database.')
    } catch (error) {
         console.error('Errorsss connecting to MongoDB! :', error);
    }
}




//---------------------  user schema   ---------------------
const UserSchema=new Schema({
    username:{type:String, unique:true},
    password:String
})

export const UserModel=mongoose.model('user', UserSchema);

