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
    username:{type:String, unique:false},
    isDemo: { type: Boolean, default: false },

  // TTL logic – only triggers if this field is set
  expireAt: {
    type: Date,
    default: null,
    expires: 0 // MongoDB auto-deletes only when expireAt is a real date
  }
})

export const UserModel=mongoose.model('user', UserSchema);





//----------------------  content schema -------------------------

const ContentSchema=new Schema({
    title:String,
    link:String,
    type:String,
    // tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId, required:true},  //here no much need of the ref
    content: String,
    embedding: { type: [Number], default: undefined },
    status: {
    type: String,
    enum: ["pending", "retrying", "ready", "failed"],
    default: "pending"
    },
    retryCount: {
    type: Number,
    default: 0
    }
    //createdAt: { type: Date, default: Date.now },        //will add this in v2


})

export const ContentModel=mongoose.model('content', ContentSchema)







//------------------------  link table- schema. -------------------------

const LinkSchema=new Schema({ 
    userId: {type: mongoose.Types.ObjectId, ref:'user', required: true, unique:true},  //it refers user table..in populating
    hash:String

})
export const linkModel = mongoose.model('link', LinkSchema)

